package cz.ghosts.tda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.UUID;

import cz.ghosts.tda.database.DbController;

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
