package cz.ghosts.tda.database;

import io.github.cdimascio.dotenv.Dotenv;

import java.io.InputStream;
import java.sql.*;

public interface DBInterface {
  String dburl = "JDBC:sqlite:/server/tda.db";
  //String dburl = "JDBC:sqlite:src/main/resources/tda.db";
  // String dburl = Dotenv.load().get("DBURL");
  // String initsqlURL = Dotenv.load().get("INITSQL");

  static InputStream initsqlURL() {
    InputStream initSqlInputStream = DBInterface.class.getResourceAsStream("/database/createDB.sql");
    return initSqlInputStream;
  }

  static Connection getConnection() {
    try {
      return DriverManager.getConnection(dburl);
    } catch (Exception e) {
      System.out.println("Error getting connection");
      System.out.println(e.getMessage());
    }
    return null;
  }
}
