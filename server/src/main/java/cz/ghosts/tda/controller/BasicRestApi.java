package cz.ghosts.tda.controller;

import cz.ghosts.tda.openAI.Connection;
import cz.ghosts.tda.openAI.RequestObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BasicRestApi {
    @PostMapping(path = {"/test/", "/test"})
    public ResponseEntity<Object> chatGPT(@RequestBody RequestObject text) {
        String response;
        Connection connection = new Connection();

        try {
            response = connection.chatGPT(text.getText());
            RequestObject requestObject = new RequestObject(response);
            return new ResponseEntity<>(requestObject, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Object>(new String("Eeee, jak? Tohle melo fungovat"), HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
