package cz.ghosts.tda.teachers.credentials;

import com.google.common.hash.Hashing;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CredentialsTDO {
    private String loginName;
    private String password;
    private String token = null;

    public CredentialsTDO() {
    }

    public CredentialsTDO(String loginName, String password) {
        this.loginName = loginName;
        Pattern pattern = Pattern.compile("/[0-9a-f]{64}/i");
        Matcher matcher = pattern.matcher(password);
        if (matcher.matches()) {
            this.password = password;
        } else {
            this.password = Hashing.sha256().hashString(password, java.nio.charset.StandardCharsets.UTF_8).toString();
        }
    }

    public CredentialsTDO(String loginName, String password, String token) {
        this.loginName = loginName;
        this.token = token;
        Pattern pattern = Pattern.compile("/[0-9a-f]{64}/i");
        Matcher matcher = pattern.matcher(password);
        if (matcher.matches()) {
            this.password = password;
        } else {
            this.password = Hashing.sha256().hashString(password, java.nio.charset.StandardCharsets.UTF_8).toString();
        }
    }

    public String getLoginName() {
        return loginName;
    }

    public String getToken() {
        return token;
    }

    public String getPassword() {
        return password;
    }
}
