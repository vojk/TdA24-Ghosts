package cz.ghosts.tda.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertDatabase {
    public void insertActivity(String uuid, String activityName, String description, String classStructure, int lengthMin, int lengthMax) throws SQLException {
        String sql = "INSERT INTO Activities (uuid, activityName, description, classStructure, lengthMin, lengthMax, potvrzovani) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, uuid);
            statement.setString(2, activityName);
            statement.setString(3, description);
            statement.setString(4, classStructure);
            statement.setInt(5, lengthMin);
            statement.setInt(6, lengthMax);
            statement.setInt(7, 0);
            statement.executeUpdate();
        }
    }

    public void insertAgenda(String title, int duration, String description, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Agendas (title, duration, description, activityUUID) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setInt(2, duration);
            statement.setString(3, description);
            statement.setString(4, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertObjectives(String description, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Objectives (objective, activityUUID) VALUES (?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, description);
            statement.setString(2, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertTools(String tool, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Tools (tool,activityUUID) VALUES (?,?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, tool);
            statement.setString(2, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertGallery(String title, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Gallery (title, activityUUID) VALUES (?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setString(2, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertHomePreparation(String title, String warn, String note, String activityUUID) throws SQLException {
        String sql = "INSERT INTO HomePreparations (title, warn, note, activityUUID) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setString(2, warn);
            statement.setString(3, note);
            statement.setString(4, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertImages(String lowRes, String highRes, int galleryID) throws SQLException {
        String sql = "INSERT INTO Images (lowRes, highRes, galleryID) VALUES (?, ?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, lowRes);
            statement.setString(2, highRes);
            statement.setInt(3, galleryID);
            statement.executeUpdate();
        }
    }

    public void insertInstructions(String title, String warn, String note, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Instructions (title, warn, note, activityUUID) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, title);
            statement.setString(2, warn);
            statement.setString(3, note);
            statement.setString(4, activityUUID);
            statement.executeUpdate();
        }
    }

    public void insertLinks(String link, String name, String activityUUID) throws SQLException {
        String sql = "INSERT INTO Links (title, url, activityUUID) VALUES (?,?,?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, name);
            statement.setString(2, link);
            statement.setString(3, activityUUID);
            statement.executeUpdate();
        }
    }


    public void insertEdLevel(String type, String activityUUID) throws SQLException {
        String sql = "INSERT INTO EducationLevels (level, activityUUID) VALUES (?, ?)";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, type);
            statement.setString(2, activityUUID);
            statement.executeUpdate();
        }
    }

    public void editPotvrzeni(String uuid) throws SQLException {
        String sql = "UPDATE Activities SET potvrzovani = 1 WHERE uuid = ?";
        try (PreparedStatement statement = DBInterface.getConnection().prepareStatement(sql)) {
            statement.setString(1, uuid);
            statement.executeUpdate();
        }
    }
}
