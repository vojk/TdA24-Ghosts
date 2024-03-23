package cz.ghosts.tda.openAI;

import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatFunction;
import com.theokanning.openai.service.*;
import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.objects.Activity;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SearchEngine {
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
            systemMessage.put("content", "You are a helpful assistant. You dont write anything else, than the result of the search.");
            messagesArray.put(systemMessage);

            JSONObject userMessage = new JSONObject();
            userMessage.put("role", "user");
            DbController dbController = new DbController();
            List<Activity> activityList = new ArrayList<>();
            activityList = dbController.getAllActivities();
            StringBuilder stringBuilder = new StringBuilder();
            for (Activity activity : activityList) {
                stringBuilder.append(" || ");
                stringBuilder.append(activity.getUuid());
                stringBuilder.append(" | ");
                stringBuilder.append(activity.getActivityName());
                stringBuilder.append(" | ");
                stringBuilder.append(activity.getDescription());
                stringBuilder.append(" | ");
                stringBuilder.append(activity.getObjectives());
                stringBuilder.append(" || ");

                System.out.println(stringBuilder);
            }
            userMessage.put("content", "Find all activity uuids, where the prompt " + text + "is located or the activity is relevant from the list " + stringBuilder);
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
