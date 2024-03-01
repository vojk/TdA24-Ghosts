package cz.ghosts.tda;

import cz.ghosts.tda.mail.EmailSender;
import cz.ghosts.tda.teachers.credentials.CredentialsGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cz.ghosts.tda.database.DbController;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class TdaApplication {
    public static void main(String[] args) {
        SpringApplication.run(TdaApplication.class, args);

        DbController dbController = new DbController();
        System.out.println("Starting TDA application");
        dbController.createDatabase();
        // dbController.addTeacher();
    }
}
