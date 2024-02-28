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
    @PostMapping(path = { "/checkuser", "checkuser" })
    public ResponseEntity<Object> credentialsCheck(@RequestBody CredentialsTDO credentialsTDO) {
        DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
        String username = credentialsTDO.getLoginName();
        String password = credentialsTDO.getPassword();
        if (dbControllerCredentials.checkCredentials(username, password)) {
            return ResponseEntity.status(200).body(new HTTPCodesTDO(200, "Správný login"));
        }
        return ResponseEntity.status(401).body(new HTTPCodesTDO(401, "Uživatel nebo heslo není správné"));

    }
}
