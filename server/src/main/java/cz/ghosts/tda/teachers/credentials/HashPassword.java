package cz.ghosts.tda.teachers.credentials;

import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

public interface HashPassword {
    default String hashPassword(String password){
        return Hashing.sha256().hashString("Td" + password + "a", StandardCharsets.UTF_8).toString();
    }
}
