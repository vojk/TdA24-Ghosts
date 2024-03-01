package cz.ghosts.tda.teachers.credentials;

import cz.ghosts.tda.database.DbControllerCredentials;
import cz.ghosts.tda.objects.return_objects.HTTPCodesTDO;
import cz.ghosts.tda.objects.return_objects.TokenObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/credentials")
public class CredentialsController {
  @PostMapping(path = { "/login", "/login/" })
  public ResponseEntity<Object> credentialsCheck(@RequestBody CredentialsTDO credentialsTDO) {
    DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
    String username = credentialsTDO.getLoginName();
    String password = credentialsTDO.getPassword();
    String uuid = dbControllerCredentials.checkCredentials(username, password);
    if (uuid != null) {
      if (credentialsTDO.getToken() != null) {
        if (dbControllerCredentials.checkSeassonToken(credentialsTDO.getToken())){
          return ResponseEntity.status(200).body(new TokenObject(credentialsTDO.getToken()));
        } else {
          return ResponseEntity.status(201).body(new TokenObject(dbControllerCredentials.getSeassonToken(uuid)));
        }
      }
      return ResponseEntity.status(200).body(new TokenObject(dbControllerCredentials.getSeassonToken(uuid)));
    }
    return ResponseEntity.status(401).body(new HTTPCodesTDO(401, "Uživatel nebo heslo není správné"));

  }

    @PostMapping(path = { "/logout", "/logout/" })
    public ResponseEntity<Object> logout(@RequestBody TokenObject tokenObject) {
        DbControllerCredentials dbControllerCredentials = new DbControllerCredentials();
        if (dbControllerCredentials.checkSeassonToken(tokenObject.getToken())) {
            dbControllerCredentials.logout(tokenObject.getToken());
            return ResponseEntity.status(200).body(new HTTPCodesTDO(200, "Odhlášení proběhlo úspěšně"));
        }
        return ResponseEntity.status(401).body(new HTTPCodesTDO(401, "Nelze odhlásit"));
    }
}
