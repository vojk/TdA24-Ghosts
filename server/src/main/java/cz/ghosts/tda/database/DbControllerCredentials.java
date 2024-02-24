package cz.ghosts.tda.database;

import java.sql.*;

public class DbControllerCredentials {
  class DbStatement {
    public Connection connection;
    public Statement statement;

    public DbStatement(Connection connection, Statement statement) {
      this.connection = connection;
      this.statement = statement;
    }
  }

  public String addCredentials(String username, String password) {
    String id = "15ea865d-e4d4-4233-834a-72700bf01310";
    try (Connection connection = DBInterface.getConnection()) {
      try (Statement statement = connection.createStatement()) {
        if (credentialsExists(new DbStatement(connection, statement), id) == 400) {
          insertCredentials(new DbStatement(connection, statement), username, password, id);
          return "200";
        } else {
          return "400";
        }
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  public String getUsername(String username) {
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectUsernameQuery = "SELECT * FROM usercredentials WHERE username = '" + username + "'";
        try (PreparedStatement selectUsernameStatement = connection.prepareStatement(selectUsernameQuery)) {
          ResultSet result = selectUsernameStatement.executeQuery();

          System.out.println("Title:");
          while (result.next()) {
            return result.getString("username");
          }
        }

      }

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return null;
  }

  private void ainsertCredentials(DbStatement dbStatement, String username, String password) throws SQLException {
    String insertCredentialsQuery = ("INSERT OR IGNORE INTO usercredentials (username) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM usercredentials WHERE username = ?)");
    try (PreparedStatement insertCredentialsStatement = dbStatement.connection
            .prepareStatement(insertCredentialsQuery)) {
      insertCredentialsStatement.setString(1, username);
      insertCredentialsStatement.setString(2, username);
      insertCredentialsStatement.executeUpdate();
    }
  }

  private void insertCredentials(DbStatement dbStatement, String username, String password, String id) throws SQLException {
    String insertCredentialsQuery = ("INSERT OR IGNORE INTO usercredentials (uuid_ucitele, username, password) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM usercredentials WHERE username = ?)");
    try (PreparedStatement insertCredentialsStatement = dbStatement.connection
            .prepareStatement(insertCredentialsQuery)) {
      insertCredentialsStatement.setString(1, id);
      insertCredentialsStatement.setString(2, username);
      insertCredentialsStatement.setString(3, password);
      insertCredentialsStatement.setString(4, username);
      insertCredentialsStatement.executeUpdate();
    }
  }

  private int credentialsExists(DbStatement dbStatement, String id) {
    String checkCredentialsQuery = "SELECT * FROM usercredentials WHERE uuid_ucitele = '" + id + "'";
    try (PreparedStatement checkCredentialsStatement = dbStatement.connection.prepareStatement(checkCredentialsQuery)) {
      ResultSet result = checkCredentialsStatement.executeQuery();
      if (result.next()) {
        return 200;
      } else {
        return 400;
      }

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  private String getPassword(String id) {
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String getPasswordQuery = "SELECT password FROM usercredentials WHERE uuid_ucitele = '" + id + "'";
        try(PreparedStatement getPasswordStatement = connection.prepareStatement(getPasswordQuery)) {
          ResultSet resultSet = getPasswordStatement.executeQuery();
          while (resultSet.next()) {
            return resultSet.getString("password");
          }
        }
      }

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return null;
  }
}