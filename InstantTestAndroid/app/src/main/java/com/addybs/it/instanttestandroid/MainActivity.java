package com.addybs.it.instanttestandroid;
import android.app.Activity;
import android.os.Bundle;
import android.os.Environment;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.widget.Toast;
import java.io.File;



public class MainActivity extends Activity {
    private String json;
    /*private String data;*/
    private WebInterface webInt;
    //android.os.Handler handler;

    private WebView mWebView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = (WebView) findViewById(R.id.webView);
        webInt = new WebInterface(mWebView);


        mWebView.getSettings().setJavaScriptEnabled(true);

        //mWebView.setWebViewClient(new WebViewClient());
        File lFile = new File(Environment.getExternalStorageDirectory() + "/InstantTest/WebApp/index.html");


        /*if (savedInstanceState != null)
            (mWebView).restoreState(savedInstanceState);
        else
            mWebView.loadUrl("file:///" + lFile.getAbsolutePath());*/

        if (getIntent().hasExtra("path")) {
            json = getIntent().getStringExtra("path");
            webInt.setData(json);
            mWebView.addJavascriptInterface(webInt, "Instant_Test");
            mWebView.loadUrl("file:///" + lFile.getAbsolutePath());
            Toast.makeText(this, "Good luck!", Toast.LENGTH_LONG).show();
        }
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    //webInt = new WebInterface(appView);
    //handler = new android.os.Handler();

    //THIS CODE WAS PART OF THE ONCREATE VOID AND WAS USED TO RECEIVE AND READ THE XML FILE
    //IT ALSO CALLEDTHE RUNDATA VOID
        /*if (getIntent().hasExtra("path")) {
            path = getIntent().getStringExtra("path");
            mWebView.loadUrl(path);
        }*/

        /*if (getIntent().hasExtra("path")) {
            path = getIntent().getStringExtra("path");

            final ProgressDialog dialog = ProgressDialog.show(this, "Loading", "Loading the test");

                Thread th = new Thread() {
                    public void run(){
                        //data = runData();

                        handler.post(new Runnable() {
                            @Override
                            public void run() {
                                webInt.setData(data);
                                appView.addJavascriptInterface(webInt, "Instant_Test");
                                //appView.loadUrl("file:///android_asset/index.html");
                                dialog.dismiss();
                            }
                        });

                    }
                };
            th.start();
        }*/
        /*if (savedInstanceState != null)
            (mWebView).restoreState(savedInstanceState);
        else*/

}
