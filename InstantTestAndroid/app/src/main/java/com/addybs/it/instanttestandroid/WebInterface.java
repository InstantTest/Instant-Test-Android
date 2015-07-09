package com.addybs.it.instanttestandroid;

import android.webkit.JavascriptInterface;
import android.webkit.WebView;

/**
 * Created by admin on 6/11/2015.
 */
public class WebInterface {
    private WebView mAppView;
    private String data;

    public WebInterface(WebView view)
    {
        mAppView = view;
    }


    public void setData(String value) {
        this.data = value;
    }

    @JavascriptInterface
    public String getData() {
        return this.data;
    }

}
