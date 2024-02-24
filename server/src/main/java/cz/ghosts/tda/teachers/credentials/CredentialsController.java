package cz.ghosts.tda.teachers.credentials;

import com.google.common.hash.Hashing;
import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.database.DbControllerCredentials;
import cz.ghosts.tda.objects.return_objects.HTTPCodesTDO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;

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
        String hashedPassword = Hashing.sha256().hashString("Td" + password + "a", StandardCharsets.UTF_8).toString();

        if (dbControllerCredentials.addCredentials(username, hashedPassword).equals("200")) {
            return ResponseEntity.status(200).body(new HTTPCodesTDO(200, "Uživatel správně vytvořen"));
        }
        else {
            return ResponseEntity.status(400).body(new HTTPCodesTDO(400, "Uživatel již existuje"));
        }

    }

}
