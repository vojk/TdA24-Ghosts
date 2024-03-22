package cz.ghosts.tda.openAI;

import org.springframework.web.bind.annotation.RequestBody;

public class RequestObject {
    private String text;

    public RequestObject() {

    }

    public RequestObject(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
