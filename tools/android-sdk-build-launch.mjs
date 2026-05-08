import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const config = JSON.parse(fs.readFileSync('docs/platform-runtime-gate.json', 'utf8'));
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
if (!sdk) throw new Error('ANDROID_HOME or ANDROID_SDK_ROOT is required');
const buildTools = newest(path.join(sdk, 'build-tools'));
const platform = newest(path.join(sdk, 'platforms'));
const androidJar = path.join(sdk, 'platforms', platform, 'android.jar');
const out = path.resolve('dist/android-build');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const manifest = 'android/app/src/main/AndroidManifest.xml';
const resDir = 'android/app/src/main/res';
const javaRoot = 'android/app/src/main/java';
run(path.join(sdk, 'build-tools', buildTools, 'aapt2.exe'), ['compile', '--dir', resDir, '-o', path.join(out, 'res.zip')]);
run(path.join(sdk, 'build-tools', buildTools, 'aapt2.exe'), ['link', '-o', path.join(out, 'unsigned.apk'), '-I', androidJar, '--manifest', manifest, '--min-sdk-version', '23', '--target-sdk-version', '36', '--version-code', '1', '--version-name', '0.1.0-alpha.1', path.join(out, 'res.zip'), '--java', path.join(out, 'gen'), '--auto-add-overlay']);
const javaFiles = collect(javaRoot, '.java').concat(collect(path.join(out, 'gen'), '.java'));
run('javac', ['-encoding', 'UTF-8', '-source', '8', '-target', '8', '-bootclasspath', androidJar, '-d', path.join(out, 'classes'), ...javaFiles]);
fs.mkdirSync(path.join(out, 'dex'), { recursive: true });
run(path.join(sdk, 'build-tools', buildTools, 'd8.bat'), ['--lib', androidJar, '--output', path.join(out, 'dex'), ...collect(path.join(out, 'classes'), '.class')]);
fs.copyFileSync(path.join(out, 'unsigned.apk'), path.join(out, 'with-dex.apk'));
run('jar', ['uf', path.join(out, 'with-dex.apk'), '-C', path.join(out, 'dex'), 'classes.dex']);
run(path.join(sdk, 'build-tools', buildTools, 'zipalign.exe'), ['-f', '4', path.join(out, 'with-dex.apk'), path.join(out, 'aligned.apk')]);
const keystore = path.join(out, 'debug.keystore');
run('keytool', ['-genkeypair', '-keystore', keystore, '-storepass', 'android', '-keypass', 'android', '-alias', 'androiddebugkey', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000', '-dname', 'CN=Android Debug,O=Codex,C=JP']);
const apk = path.resolve('dist', config.product + '-debug.apk');
run(path.join(sdk, 'build-tools', buildTools, 'apksigner.bat'), ['sign', '--ks', keystore, '--ks-pass', 'pass:android', '--key-pass', 'pass:android', '--out', apk, path.join(out, 'aligned.apk')]);
try { execFileSync(path.join(sdk, 'platform-tools', 'adb.exe'), ['uninstall', config.android.packageName], { stdio: 'ignore', timeout: 60000 }); } catch {}
run(path.join(sdk, 'platform-tools', 'adb.exe'), ['install', '-r', apk]);
const startOutput = execFileSync(path.join(sdk, 'platform-tools', 'adb.exe'), ['shell', 'am', 'start', '-W', '-n', config.android.packageName + '/.MainActivity'], { encoding: 'utf8', timeout: 30000 });
const current = execFileSync(path.join(sdk, 'platform-tools', 'adb.exe'), ['shell', 'dumpsys', 'activity', 'activities'], { encoding: 'utf8', timeout: 30000 });
let pid = '';
try { pid = execFileSync(path.join(sdk, 'platform-tools', 'adb.exe'), ['shell', 'pidof', config.android.packageName], { encoding: 'utf8', timeout: 30000 }).trim(); } catch {}
const started = /Status:\s+ok/.test(startOutput) && (current.includes(config.android.packageName) || pid.length > 0);
const result = { product: config.product, packageName: config.android.packageName, build: { apk: 'dist/' + config.product + '-debug.apk', method: 'android-sdk-aapt2-d8-apksigner' }, launch: { started, activity: '.MainActivity', amStartStatusOk: /Status:\s+ok/.test(startOutput), pid: pid || null }, emulator: { avd: process.env.CODEX_ANDROID_AVD || 'CodexApi30' }, manualTest: 'not-run-by-codex' };
writeJson('dist/android-emulator-result.json', result);
console.log(JSON.stringify(result));
if (!started) process.exit(1);

function newest(dir) {
  return fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory()).sort((a, b) => natural(a).localeCompare(natural(b))).at(-1);
}
function natural(value) { return value.replace(/\d+/g, (digits) => digits.padStart(4, '0')); }
function collect(dir, ext) {
  const out = [];
  const walk = (current) => {
    if (!fs.existsSync(current)) return;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(ext)) out.push(full);
    }
  };
  walk(dir);
  return out;
}
function run(command, args) {
  if (/\.bat$/i.test(command)) {
    execFileSync('cmd.exe', ['/d', '/c', 'call', command, ...args], { stdio: 'inherit', timeout: 120000 });
    return;
  }
  execFileSync(command, args, { stdio: 'inherit', timeout: 120000 });
}
function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
}
