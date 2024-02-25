package cz.ghosts.tda.teachers.credentials;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.apache.commons.lang3.RandomStringUtils;

public class CredentialsGenerator {
    public String generator(String lastName, String firstName){
        String username = "";
        if (lastName.length() < 5 ) {
            for (int i = 0; i < lastName.length(); i++) {
                username += lastName.charAt(i);
            }
        }
        else {
            for (int i = 0; i < 5; i++) {
                username += lastName.charAt(i);
          }
        }

        //Jméno
        if (firstName.length() < 3 ) {
            for (int i = 0; i < firstName.length(); i++) {
                username += lastName.charAt(i);
            }
        }
        else {
            for (int i = 0; i < 2; i++) {
                username += firstName.charAt(i);
            }
        }
        username += RandomStringUtils.randomNumeric(3);

        username = username.toLowerCase();
        System.out.println(username);

        String password = RandomStringUtils.randomAlphanumeric(8);
        System.out.println(password);

        return username+";"+password;
    }

}
