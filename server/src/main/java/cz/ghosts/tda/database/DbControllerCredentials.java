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

}
