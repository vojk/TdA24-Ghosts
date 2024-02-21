package cz.ghosts.tda.teachers.credentials;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.database.DbControllerCredentials;
import cz.ghosts.tda.objects.return_objects.HTTPCodesTDO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/credentials")
public class CredentialsController {
    @PostMapping(path = {"/username", "username"})
    public ResponseEntity<Object> checkLogin(@RequestBody CredentialsTDO credentialsTDO){
        DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
        if (!(dbControllerCredentials.getUsername(credentialsTDO.getLoginName()) == null)){
            return ResponseEntity.status(200).body(credentialsTDO);
        }
        return ResponseEntity.status(400).body(new HTTPCodesTDO(400, "UsernameNotFound"));
    }

    @PostMapping(path = { "/adduser", "adduser" })
    public ResponseEntity<Object> insertItems(@RequestBody CredentialsTDO credentialsTDO) {
        DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
        String username = credentialsTDO.getLoginName();
        String password = credentialsTDO.getPassword();
        dbControllerCredentials.addCredentials(username, password);
        return ResponseEntity.status(200).body(new HTTPCodesTDO(200, "Uživatel správně vytvořen"));
    }

}
