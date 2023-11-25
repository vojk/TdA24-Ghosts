package cz.ghosts.tda.objects.return_objects;

public class TokenObject {
    private final String secret;

    public TokenObject(String secret) {
        this.secret = secret;
    }

    public String getSecret() {
        System.out.println("Secret: " + secret);
        return secret;
    }
}
