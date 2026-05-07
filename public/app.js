const app = document.getElementById("app");
app.className = "status";
app.innerHTML = [
  ["QCDS", "S- / manual test pending"],
  ["Release", "v0.1.0-alpha.1 prerelease"],
  ["Docs ZIP", "dist/work-timecard-daily-report-docs.zip"],
  ["Manual", "docs/manual-test.md"]
].map(([label, value]) => `<div class="metric"><strong>${label}</strong><span>${value}</span></div>`).join("");
app.dataset.marker = "closed-alpha-preview";
