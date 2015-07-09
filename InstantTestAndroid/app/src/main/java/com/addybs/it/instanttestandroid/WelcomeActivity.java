package com.addybs.it.instanttestandroid;

import android.content.Intent;
import android.os.CountDownTimer;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;

import java.util.Timer;


public class WelcomeActivity extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        timer(3);
    }


    public void Start_Click(View view) {
        launch();
    }

    private void launch() {
        Intent i = new Intent(this, BrowserActivity.class);
        startActivity(i);
    }

    private void timer(int time){
        new CountDownTimer(time * 1000, 1000) {

            public void onTick(long millisUntilFinished) {


            }

            public void onFinish() {
                launch();
            }
        }.start();

    }

}
