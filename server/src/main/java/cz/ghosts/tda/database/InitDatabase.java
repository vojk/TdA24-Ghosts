package cz.ghosts.tda.database;

import java.io.BufferedReader;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class InitDatabase implements DBInterface {
  public void checkExistenceOfDb() {
    System.out.println("Database URL: " + dburl);
    System.out.println("Database init SQL: " + initsqlURL);
    File dbFile = new File(dburl.split(":")[2]);
    System.out.println("Database path: " + dburl.split(":")[2]);
    if (!dbFile.exists()) {
      System.out.println("Database does not exist");
      try {
        dbFile.createNewFile();
        createTables();
        System.out.println("Database created");
      } catch (Exception e) {
        System.out.println("Error creating database file");
        System.out.println(e.getMessage());
      }
    } else {
      System.out.println("Database exists");
    }
  }

  private String readInitSql() {
    String initSql = "";
    try {
      Path initSqlFile = Paths.get(initsqlURL);
      if (initSqlFile.toFile().exists()) {
        BufferedReader reader = Files.newBufferedReader(initSqlFile);
        Stream<String> lines = reader.lines();
        String data = lines.collect(Collectors.joining("\n"));
        lines.close();
        return data;
      } else {
        System.out.println("Init SQL file does not exist");
      }
    } catch (Exception e) {
      System.out.println("Error reading init SQL file");
      System.out.println(e.getMessage());
    }
    return initSql;
  }

  private void createTables() {
    try (Connection connection = DBInterface.getConnection()) {
      try (Statement statement = connection.createStatement()) {
        String[] sqlStatements = readInitSql().split("(?<=;)");
        for (String sqlStatement : sqlStatements) {
          System.out.println(sqlStatement);
          statement.execute(sqlStatement);
        }
      } catch (Exception e) {
        System.out.println("Error creating table");
        System.out.println(e.getMessage());
      }
    } catch (Exception e) {
      System.out.println("Error connecting to database");
      System.out.println(e.getMessage());
    }
  }
}
