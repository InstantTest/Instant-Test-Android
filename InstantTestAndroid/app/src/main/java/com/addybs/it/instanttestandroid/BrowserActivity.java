package com.addybs.it.instanttestandroid;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;


public class BrowserActivity extends ListActivity {
    private String path;
    private String readFile;
    android.os.Handler handler;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_browser);

        // Use the current directory as title
        //path = "/storage/sdcard0/InstantTest/";

        File lFile = new File(Environment.getExternalStorageDirectory() + "/InstantTest/Tests/");
        path = lFile.getAbsolutePath() + "/";

        //Log.d("Hello", path);


        if (getIntent().hasExtra("path")) {
            path = getIntent().getStringExtra("path");
        }
        setTitle(path);

        // Read all files sorted into the values-array
        List values = new ArrayList();
        File dir = new File(path);
        if (!dir.canRead()) {
            setTitle(getTitle() + " (inaccessible)");
        }
        String[] list = dir.list();
        if (list != null) {
            for (String file : list) {
                if (!file.startsWith(".")) {
                    values.add(file);
                }
            }
        }
        Collections.sort(values);

        // Put the data into the list
        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_2, android.R.id.text1, values);
        setListAdapter(adapter);
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        String filename = (String) getListAdapter().getItem(position);
        if (path.endsWith(File.separator)) {
            filename = path + filename;
        } else {
            filename = path + File.separator + filename;
        }

        //Toast.makeText(this, new File(filename).getName(), Toast.LENGTH_LONG).show();
        if (new File(filename).isDirectory()) {
            Intent intent = new Intent(this, BrowserActivity.class);
            intent.putExtra("path", filename);
            startActivity(intent);
        } else {
            readFile = filename;
            goTo();

            /*final ProgressDialog dialog = ProgressDialog.show(this, "Loading", "Loading the test");

            Thread th = new Thread() {
                public void run(){
                    runData();

                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            goTo();
                            dialog.dismiss();
                        }
                    });

                }
            };
            th.start();*/



            //intent.putExtra("path", Environment.getExternalStorageDirectory() + "/InstantTest/WebApp/index.html");

            //Toast.makeText(this, "You want to take this test " + filename, Toast.LENGTH_LONG).show();
        }
    }

    public void goTo(){
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("path", runData());
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_browser, menu);
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

    private String runData(){
        try {
            //Toast.makeText(this, readFile, Toast.LENGTH_LONG).show();
            InputStream in = new FileInputStream(new File(readFile));

            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder out = new StringBuilder();
            String line;

            while ((line = reader.readLine())!= null){
                out.append(line);
            }
            reader.close();


            String Data = out.toString();

            //Toast.makeText(this, "Reading file completed", Toast.LENGTH_SHORT).show();


            JSONObject xmlJSONObj = XML.toJSONObject(Data);
            String jsonPrettyPrintString = xmlJSONObj.toString(4);

            //Minify min = new Minify();
            //jsonPrettyPrintString = min.minify(jsonPrettyPrintString);

            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"number\"", "\"ATTRnumber\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"reason\"", "\"ATTRreason\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"format\"", "\"ATTRformat\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"weight\'", "\"ATTRweight\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"answer\"", "\"ATTRanswer\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"type\"", "\"ATTRtype\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"content\"", Matcher.quoteReplacement("\"$\""));
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"subject\"", "\"ATTRsubject\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"instruction\"", "\"ATTRinstruction\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"duration\"", "\"ATTRduration\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"draw\"", "\"ATTRdraw\"");
            jsonPrettyPrintString = jsonPrettyPrintString.replaceAll("\"kind\"", "\"ATTRkind\"");


            return jsonPrettyPrintString;
            //Toast.makeText(this, jsonPrettyPrintString, Toast.LENGTH_LONG).show();

            //writeToFile("var sample = " + jsonPrettyPrintString);
            //Toast.makeText(this, jsonPrettyPrintString, Toast.LENGTH_LONG).show();
            //Log.d("Write", "Write to file is passed");


        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this, "Error Reading1", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(this, "Error Reading2", Toast.LENGTH_SHORT).show();
        } catch (JSONException e) {
            e.printStackTrace();
            Toast.makeText(this, "Error Reading3", Toast.LENGTH_SHORT).show();
        }
        return "";
    }

/*    private void writeToFile(String data) {
        try {
            *//*File lFile = new File(Environment.getExternalStorageDirectory() + "/InstantTest/WebApp/lib/data.js");
            String path = lFile.getAbsolutePath();

            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(openFileOutput(path, Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();*//*




            File sdCard = Environment.getExternalStorageDirectory();
            File dir = new File (sdCard.getAbsolutePath() + "/InstantTest/WebApp/lib");

            //dir.mkdirs();
            File file = new File(dir, "data.js");
            FileOutputStream f = new FileOutputStream(file);
            f.write(data.getBytes());

        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
            Toast.makeText(this, "Error Writing3", Toast.LENGTH_SHORT).show();
        }
    }

    private String readFromFile() {

        String ret = "";

        try {
            InputStream inputStream = openFileInput(path);

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
                ret = stringBuilder.toString();
            }
        }
        catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }*/
}
