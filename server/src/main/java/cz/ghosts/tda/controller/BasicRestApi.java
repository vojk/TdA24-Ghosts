package cz.ghosts.tda.controller;

import cz.ghosts.tda.database.DBInterface;
import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.database.InsertDatabase;
import cz.ghosts.tda.objects.Activity;
import cz.ghosts.tda.objects.Login;
import cz.ghosts.tda.objects.subobjects.*;
import cz.ghosts.tda.openAI.Connection;
import cz.ghosts.tda.openAI.RequestObject;
import cz.ghosts.tda.openAI.SearchEngine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

    @PostMapping(path = {"/test2/", "/test2"})
    public ResponseEntity<Object> chatGPT2(@RequestBody Activity activity) {
        InsertDatabase insertDatabase = new InsertDatabase();
        DbController dbController = new DbController();
        try{
            insertDatabase.insertActivity(activity.getUuid(), activity.getActivityName(), activity.getDescription(), activity.getClassStructure(), activity.getLengthMin(), activity.getLengthMax());
            for (Agenda agenda : activity.getAgenda()) {
                insertDatabase.insertAgenda(agenda.getTitle(), agenda.getDuration(), agenda.getDescription(), activity.getUuid());
            }
            for (String objective : activity.getObjectives()) {
                insertDatabase.insertObjectives(objective, activity.getUuid());
            }
            for (String tools : activity.getTools()) {
                insertDatabase.insertTools(tools, activity.getUuid());
            }
            for (Gallery gallery : activity.getGallery()) {
                insertDatabase.insertGallery(gallery.getTitle(), activity.getUuid());
                for (Images images : gallery.getImages()) {
                    insertDatabase.insertImages(images.getLowRes(), images.getHighRes(), gallery.getId());
                }
            }
            for (Instructions instructions : activity.getHomePreparation()) {
                insertDatabase.insertHomePreparation(instructions.getTitle(), instructions.getWarn(), instructions.getNote(), activity.getUuid());
            }
            for (Instructions instructions : activity.getInstructions()) {
                insertDatabase.insertInstructions(instructions.getTitle(), instructions.getWarn(), instructions.getNote(), activity.getUuid());
            }
            for (Links links : activity.getLinks()) {
                insertDatabase.insertLinks(links.getUrl(), links.getTitle(), activity.getUuid());
            }
            for (String edLevel : activity.getEdLevel()) {
                insertDatabase.insertEdLevel(edLevel, activity.getUuid());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Object>(new String("Eeee, jak? Tohle melo fungovat"), HttpStatus.I_AM_A_TEAPOT);
        }
        return new ResponseEntity<Object>(activity, HttpStatus.OK);
    }

    @PostMapping(path = {"/login/", "/login"})
    public ResponseEntity<Object> checkLogin(@RequestBody Login login){

        String usernameInput = login.getUsername();
        String passwordInput = login.getPassword();
        String usernameCheck = "admin";
        String passwordCheck = "3e2809ae9089060d8644c09941b45c5c2e1774bf72ad49efc7e3b8abcb364957";
        String uuid = String.valueOf(UUID.randomUUID());
        if (usernameInput.equals(usernameCheck) && passwordCheck.equals(passwordInput)) {
            return new ResponseEntity<Object>(uuid,  HttpStatus.OK);
        }

        return new ResponseEntity<Object>(new String("Špatné údaje"), HttpStatus.FORBIDDEN);
    }

    @PostMapping(path = {"/test3/", "/test3"})
    public ResponseEntity<Object> search(@RequestBody RequestObject text) {
        String response;
        SearchEngine connection = new SearchEngine();
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
