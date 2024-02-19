package cz.ghosts.tda.teachers.credentials;

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
    @PostMapping(path = {"/", ""})
    public ResponseEntity<Object> checkLogin(@RequestBody CredentialsTDO credentialsTDO){
        DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
        if (!dbControllerCredentials.getUsername(credentialsTDO.getLoginName()).isEmpty()){
            return ResponseEntity.status(200).body(credentialsTDO);
        }
        return ResponseEntity.status(400).body(new HTTPCodesTDO(400, "UsernameNotFound"));
    }

}
