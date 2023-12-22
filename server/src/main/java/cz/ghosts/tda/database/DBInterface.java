package cz.ghosts.tda.database;

import io.github.cdimascio.dotenv.Dotenv;
import java.sql.*;

public interface DBInterface {
  String dburl = Dotenv.load().get("DBURL");
  String initsqlURL = Dotenv.load().get("INITSQL");

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
