package cz.ghosts.tda.database;

import java.sql.*;
import java.util.UUID;

public class DbControllerCredentials {
    class DbStatement {
        public Connection connection;
        public Statement statement;

        public DbStatement(Connection connection, Statement statement) {
            this.connection = connection;
            this.statement = statement;
        }
    }

    public String addCredentials(String username, String password, String id) {
        //  String id = "15ea865d-e4d4-4233-834a-72700bf01310";
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
        String checkCredentialsQuery = "SELECT * FROM ucitele WHERE uuid_ucitele = '" + id + "'";
        try (PreparedStatement checkCredentialsStatement = dbStatement.connection.prepareStatement(checkCredentialsQuery)) {
            ResultSet result = checkCredentialsStatement.executeQuery();
            if (result.next()) {
                System.out.println(200);
                return 200;
            } else {
                System.out.println(400);
                return 400;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private String createSeassonToken(String userId) {
        String sql = "INSERT INTO seasson_user (user_id, seasson_token) VALUES (?, ?)";
        try (Connection connection = DBInterface.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                String token = UUID.randomUUID().toString();
                statement.setString(1, userId);
                statement.setString(2, token);
                statement.executeUpdate();
                return token;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public String getSeassonToken(String userId) {
        return createSeassonToken(userId);
    }

    public boolean checkSeassonToken(String seassonToken) {
        String sql = "SELECT seasson_token FROM seasson_user WHERE seasson_token = ?";
        try (Connection connection = DBInterface.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, seassonToken);
                ResultSet result = statement.executeQuery();
                while (result.next()) {
                    return true;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public String checkCredentials(String username, String password) {
        try (Connection connection = DBInterface.getConnection();) {
            String getPasswordQuery = "SELECT uuid FROM ucitele WHERE username = ? AND password = ?";
            try (PreparedStatement getPasswordStatement = connection.prepareStatement(getPasswordQuery)) {
                getPasswordStatement.setString(1, username);
                getPasswordStatement.setString(2, password);
                ResultSet resultSet = getPasswordStatement.executeQuery();
                System.out.println("Title:");
                while (resultSet.next()) {
                    return resultSet.getString("uuid");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public void logout(String token) {
        String sql = "DELETE FROM seasson_user WHERE seasson_token = ?";
        try (Connection connection = DBInterface.getConnection()) {
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, token);
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
