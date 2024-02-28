package cz.ghosts.tda.teachers.credentials;

public class CredentialsTDO {
    private String loginName;
    private String password;

    public CredentialsTDO(){
    }

    public CredentialsTDO(String loginName, String password){
        this.loginName = loginName;
        this.password = password;
    }

    public String getLoginName() {
        return loginName;
    }

    public String getPassword() {
        return password;
    }
}
