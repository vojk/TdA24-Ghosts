package cz.ghosts.tda.database;

import cz.ghosts.tda.teachers.credentials.CredentialsTDO;

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

    public String addCredentials(String username, String password){
        try(Connection connection = DBInterface.getConnection()) {
            try (Statement statement = connection.createStatement()){
                insertCredentials(new DbStatement(connection, statement), username, password);

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return username;
    }

    public String getUsername(String username) {
        try (Connection connection = DBInterface.getConnection();) {
            try (Statement statement = connection.createStatement()){
                String selectUsernameQuery = "SELECT * FROM usercredentials WHERE username = '" + username + "'";
                try (PreparedStatement selectUsernameStatement = connection.prepareStatement(selectUsernameQuery)){
                    ResultSet result = selectUsernameStatement.executeQuery();

                System.out.println("Title:");
                while (result.next()){
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
        try (PreparedStatement insertCredentialsStatement = dbStatement.connection.prepareStatement(insertCredentialsQuery)) {
            insertCredentialsStatement.setString(1, username);
            insertCredentialsStatement.setString(2, username);
            insertCredentialsStatement.executeUpdate();
        }
    }

    private void insertCredentials (DbStatement dbStatement, String username, String password) throws SQLException {
        String insertCredentialsQuery = ("INSERT OR IGNORE INTO usercredentials (username) SELECT? WHERE NOT EXISTS (SELECT 1 FROM usercredentials WHERE username = ?)");
        try (PreparedStatement insertCredentialsStatement = dbStatement.connection.prepareStatement(insertCredentialsQuery)) {
            insertCredentialsStatement.setString(1, username);
            insertCredentialsStatement.setString(2, username);
            insertCredentialsStatement.executeUpdate();
        }
    }

}
