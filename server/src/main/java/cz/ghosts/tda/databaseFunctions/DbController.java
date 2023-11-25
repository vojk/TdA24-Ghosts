package cz.ghosts.tda.databaseFunctions;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import cz.ghosts.tda.objects.process.Person;
import io.github.cdimascio.dotenv.Dotenv;

public class DbController {
  private List<Person> people = new ArrayList<>();
  String url = Dotenv.load().get("URL");

  public void checkExistenceOfDb() {
    File dbFile = new File(url.split(":")[2]);
    System.out.println("Database path: " + url.split(":")[2]);
    if (!dbFile.exists()) {
      System.out.println("Database does not exist");
      try {
        dbFile.createNewFile();
        System.out.println("Database created");
      } catch (Exception e) {
        System.out.println("Error creating database file");
        System.out.println(e.getMessage());
      }
    } else {
      System.out.println("Database exists");
    }
  }

  public void exampleDatabse() {
    try (Connection connection = DriverManager.getConnection(url)) {
      // Create a table
      String createTableSQL = "CREATE TABLE IF NOT EXISTS example_table (id INTEGER PRIMARY KEY, name TEXT);";
      try (Statement statement = connection.createStatement()) {
        statement.execute(createTableSQL);
      }

      // Insert some data
      String insertDataSQL = "INSERT INTO example_table (name) VALUES (?);";
      try (PreparedStatement preparedStatement = connection.prepareStatement(insertDataSQL)) {
        preparedStatement.setString(1, "John Doe");
        preparedStatement.executeUpdate();
      }

      // Query the data
      String query = "SELECT * FROM example_table;";
      try (Statement statement = connection.createStatement();
          ResultSet resultSet = statement.executeQuery(query)) {

        // Process the result set
        while (resultSet.next()) {
          int id = resultSet.getInt("id");
          String name = resultSet.getString("name");
          people.add(new Person(id, name));
          System.out.println("ID: " + id + ", Name: " + name);
        }
        System.out.println("People: " + people.toString());
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
