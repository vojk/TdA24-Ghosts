package cz.ghosts.tda.controllers;

import cz.ghosts.tda.objects.return_objects.TokenObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Example {
    @GetMapping("")
    public ResponseEntity<TokenObject> responseEntity() {
        TokenObject tokenObject = new TokenObject();
        tokenObject.setSecret("The cake is a lie");
        return ResponseEntity.ok(tokenObject);
    }

}
