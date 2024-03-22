package cz.ghosts.tda.openAI;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;

public class Connection {
  private String emaw = "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";

  public static String extractResponseText(JSONObject responseJson) {
    JSONObject message = responseJson.getJSONArray("choices").getJSONObject(0).getJSONObject("message");
    String responseText = message.getString("content");
    return responseText;
  }

  public String chatGPT(String text) {
    try {
      String url = "https://api.openai.com/v1/chat/completions";
      HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

      con.setRequestMethod("POST");
      con.setRequestProperty("Content-Type", "application/json");
      con.setRequestProperty("Authorization", "Bearer " + emaw);

      JSONObject data = new JSONObject();
      JSONObject requestData = new JSONObject();
      requestData.put("model", "gpt-3.5-turbo");

      JSONArray messagesArray = new JSONArray();

      JSONObject systemMessage = new JSONObject();
      systemMessage.put("role", "system");
      systemMessage.put("content", "You are a helpful assistant.");
      messagesArray.put(systemMessage);

      JSONObject userMessage = new JSONObject();
      userMessage.put("role", "user");
      userMessage.put("content", text);
      messagesArray.put(userMessage);

      requestData.put("messages", messagesArray);

      con.setDoOutput(true);
      con.getOutputStream().write(requestData.toString().getBytes());

      int responseCode = con.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        String output = new BufferedReader(new InputStreamReader(con.getInputStream()))
                .lines()
                .collect(Collectors.joining(System.lineSeparator()));

        JSONObject jsonResponse = new JSONObject(output);

        System.out.println(extractResponseText(jsonResponse));
        return extractResponseText(jsonResponse);
      } else {
        // Handle error response
        System.err.println("HTTP Request Failed with response code: " + responseCode);
        // Optionally, read and log error response body
        return null;
      }
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

}
