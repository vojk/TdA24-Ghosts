package cz.ghosts.tda.openAI;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

import org.json.JSONObject;

public class Connection {
  private String token = "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";

  public String chatGPT(String text) throws Exception {
    try {
      String url = "https://api.openai.com/v1/chat/completions";
      HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

      con.setRequestMethod("POST");
      con.setRequestProperty("Content-Type", "application/json");
      con.setRequestProperty("Authorization", "Bearer " + token);

      JSONObject data = new JSONObject();
      data.put("model", "text-davinci-003");
      data.put("prompt", text);
      data.put("max_tokens", 2000);
      data.put("temperature", 1.0);

      con.setDoOutput(true);
      con.getOutputStream().write(data.toString().getBytes());

      int responseCode = con.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        String output = new BufferedReader(new InputStreamReader(con.getInputStream()))
                .lines()
                .collect(Collectors.joining(System.lineSeparator()));

        JSONObject jsonResponse = new JSONObject(output);
        String chatResponse = jsonResponse.getJSONArray("choices").getJSONObject(0).getString("text");
        System.out.println(chatResponse);
        return chatResponse;
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
