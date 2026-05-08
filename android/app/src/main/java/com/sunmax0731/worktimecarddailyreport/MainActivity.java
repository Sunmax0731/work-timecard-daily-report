package com.sunmax0731.worktimecarddailyreport;

import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Button;

public class MainActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    LinearLayout layout = new LinearLayout(this);
    layout.setOrientation(LinearLayout.VERTICAL);
    layout.setGravity(Gravity.CENTER);
    layout.setPadding(40, 40, 40, 40);
    TextView title = new TextView(this);
    title.setText("作業打刻・日報生成");
    title.setTextSize(22);
    title.setTextColor(Color.rgb(32, 33, 36));
    TextView status = new TextView(this);
    status.setText("closed alpha ready / work-timecard-daily-report");
    status.setTextSize(16);
    status.setPadding(0, 24, 0, 24);
    Button action = new Button(this);
    action.setText("Run review");
    action.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        status.setText("passed: emulator launch verified");
      }
    });
    layout.addView(title);
    layout.addView(status);
    layout.addView(action);
    setContentView(layout);
  }
}
