package cz.ghosts.tda.objects.return_objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenObject {
    private String token;

    public TokenObject() {
    }
    public TokenObject(String token) {
        this.token = token;
    }

    @JsonProperty("token")
    public String getToken() {
        System.out.println("Secret: " + token);
        return token;
    }
}
