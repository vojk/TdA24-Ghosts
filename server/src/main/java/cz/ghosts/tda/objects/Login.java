package cz.ghosts.tda.objects;

public class Login {
    private String username;
    private String password;

    public Login(){}

    public Login(String username, String password){
        this.password = password;
        this.username = username;
    }
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
