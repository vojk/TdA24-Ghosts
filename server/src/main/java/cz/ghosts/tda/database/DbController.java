package cz.ghosts.tda.database;


import cz.ghosts.tda.objects.Activity;
import cz.ghosts.tda.objects.subobjects.*;
import org.sqlite.core.DB;

import java.sql.Connection;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;

import java.util.ArrayList;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class DbController implements DBInterface {
    class DbStatement {
        public Connection connection;
        public Statement statement;

        public DbStatement(Connection connection, Statement statement) {
            this.connection = connection;
            this.statement = statement;
        }
    }

    public void createDatabase() {
        InitDatabase initDatabase = new InitDatabase();
        initDatabase.checkExistenceOfDb();
    }

    public List<Activity> getAllActivities() {
        List<Activity> activities = new ArrayList<>();
        try {
            DbStatement dbStatement = new DbStatement(DBInterface.getConnection(), DBInterface.getConnection().createStatement());
            ResultSet resultSet = dbStatement.statement.executeQuery("SELECT * FROM Activities;");
            while (resultSet.next()) {
                Activity activity = new Activity(
                        resultSet.getString("uuid"),
                        resultSet.getString("activityName"),
                        resultSet.getString("description"),
                        getObjectives(resultSet.getString("uuid")),
                        resultSet.getString("classStructure"),
                        resultSet.getInt("lengthMin"),
                        resultSet.getInt("lengthMax"),
                        resultSet.getInt("potvrzovani"),
                        getEdLevel(resultSet.getString("uuid")),
                        getTools(resultSet.getString("uuid")),
                        getHomePreparation(resultSet.getString("uuid")),
                        instructions(resultSet.getString("uuid")),
                        getAgenda(resultSet.getString("uuid")),
                        getLinks(resultSet.getString("uuid")),
                        galleries(resultSet.getString("uuid")
                ));
                activities.add(activity);
            }
            dbStatement.connection.close();
        } catch (SQLException e) {
            System.out.println("Error getting all activities");
            System.out.println(e.getMessage());
        }
        return activities;
    }

    public Activity getActivityByUUID(String UUID) {
        Activity activity = null;
        try {
            DbStatement dbStatement = new DbStatement(DBInterface.getConnection(), DBInterface.getConnection().createStatement());
            ResultSet resultSet = dbStatement.statement.executeQuery("SELECT * FROM Activities WHERE uuid = " + UUID + ";");
            while (resultSet.next()) {
                activity = new Activity(
                        resultSet.getString("uuid"),
                        resultSet.getString("activityName"),
                        resultSet.getString("description"),
                        getObjectives(resultSet.getString("uuid")),
                        resultSet.getString("classStructure"),
                        resultSet.getInt("lengthMin"),
                        resultSet.getInt("lengthMax"),
                        resultSet.getInt("potvrzovani"),
                        getEdLevel(resultSet.getString("uuid")),
                        getTools(resultSet.getString("uuid")),
                        getHomePreparation(resultSet.getString("uuid")),
                        instructions(resultSet.getString("uuid")),
                        getAgenda(resultSet.getString("uuid")),
                        getLinks(resultSet.getString("uuid")),
                        galleries(resultSet.getString("uuid")
                        ));
            }
            dbStatement.connection.close();
        } catch (SQLException e) {
            System.out.println("Error getting all activities");
            System.out.println(e.getMessage());
        }
        return activity;
    }

    public List<String> getObjectives(String uuid) {
        List<String> objectives = new ArrayList<>();
        String selectObjectivesQuery = "SELECT * FROM Objectives WHERE activityUUID = ?;";
        try (Connection connection = DBInterface.getConnection();) {
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        objectives.add(new String(resultSet.getString("objective")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return objectives;
    }

    public List<String> getTools(String uuid) {
        List<String> tools = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM Tools WHERE activityUUID = ?;";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        tools.add(new String(resultSet.getString("tool")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tools;
    }

    public List<Instructions> getHomePreparation(String uuid) {
        List<Instructions> homePreparations = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM HomePreparations WHERE activityUUID = ?;";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        homePreparations.add(new Instructions(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getString("warn"), resultSet.getString("note")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return homePreparations;
    }

    public List<Agenda> getAgenda(String uuid) {
        List<Agenda> agenda = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM Agendas WHERE activityUUID = ?";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        agenda.add(new Agenda(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getInt("duration"), resultSet.getString("description")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return agenda;
    }


    public List<String> getEdLevel(String uuid) {
        List<String> edLevels = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM EducationLevels WHERE activityUUID = ?;";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        edLevels.add(new String(resultSet.getString("level")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return edLevels;
    }

    public List<Links> getLinks(String uuid) {
        List<Links> links = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM Links WHERE activityUUID = ?;";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        links.add(new Links(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getString("url")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return links;
    }

    public List<Instructions> instructions(String uuid) {
        List<Instructions> instructions = new ArrayList<>();
        try (Connection connection = DBInterface.getConnection();) {
            String selectObjectivesQuery = "SELECT * FROM Instructions WHERE activityUUID = ?;";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectObjectivesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        instructions.add(new Instructions(resultSet.getInt("id"), resultSet.getString("title"), resultSet.getString("warn"), resultSet.getString("note")));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return instructions;
    }

    public List<Gallery> galleries(String uuid) {
        List<Gallery> gallery = new ArrayList<>();
        List<Images> images = new ArrayList<>();

        try (Connection connection = DBInterface.getConnection();) {
            String selectGalleriesQuery = "SELECT * FROM Gallery WHERE activityUUID = ?";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(selectGalleriesQuery)) {
                    preparedStatement.setString(1, uuid);
                    ResultSet resultSet = preparedStatement.executeQuery();
                    while (resultSet.next()) {
                        try(Connection connection1 = DBInterface.getConnection();) {
                            String selectImagesQuery = "SELECT * FROM Images WHERE galleryId = ?";
                            try (Statement statement1 = connection1.createStatement()) {
                                try (PreparedStatement preparedStatement1 = connection1.prepareStatement(selectImagesQuery)) {
                                    preparedStatement1.setInt(1, resultSet.getInt("id"));
                                    ResultSet resultSet1 = preparedStatement1.executeQuery();

                                    while (resultSet1.next()) {
                                        images.add(new Images(resultSet1.getInt("id"), resultSet1.getString("lowRes"), resultSet1.getString("highRes")));
                                    }
                                    gallery.add(new Gallery(resultSet.getInt("id"), resultSet.getString("title"), images));
                                }
                            }

                        }
                        gallery.add(new Gallery(resultSet.getInt("id"), resultSet.getString("title"), images));
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return gallery;
    }

    public void deleteActivity(String uuid) {
        try (Connection connection = DBInterface.getConnection();) {
            String deleteActivityQuery = "DELETE FROM Activity WHERE uuid = ?";
            try (Statement statement = connection.createStatement()) {
                try (PreparedStatement preparedStatement = connection.prepareStatement(deleteActivityQuery)) {
                    preparedStatement.setString(1, uuid);
                    preparedStatement.executeUpdate();
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


}
