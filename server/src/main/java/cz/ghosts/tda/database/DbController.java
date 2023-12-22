package cz.ghosts.tda.database;

import java.sql.Connection;
import java.sql.Statement;
import java.util.List;
import java.util.ArrayList;

import cz.ghosts.tda.teachers.TeachersTDO;
import cz.ghosts.tda.teachers.tags.TagsTDO;

import java.sql.ResultSet;
import java.sql.PreparedStatement;

public class DbController implements DBInterface {
  public void createDatabase() {
    InitDatabase initDatabase = new InitDatabase();
    initDatabase.checkExistenceOfDb();
  }

  public void addTeacher(TeachersTDO teacher) {
    List<String> tagsIds = new ArrayList<>();
    System.out.println("Id ucitele: " + teacher.getId());
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        for (TagsTDO tag : teacher.getTags()) {
          String insertTagQuery = ("INSERT OR IGNORE INTO tags (id, name) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = ?)");
          try (PreparedStatement insertTagStatement = connection.prepareStatement(insertTagQuery)) {
            insertTagStatement.setString(1, tag.getId());
            insertTagStatement.setString(2, tag.getName());
            insertTagStatement.setString(3, tag.getName());
            insertTagStatement.executeUpdate();
          }

          String selectTagQuery = "SELECT id FROM tags WHERE name = ?";
          try (PreparedStatement selectTagIdStatement = connection.prepareStatement(selectTagQuery)) {
            selectTagIdStatement.setString(1, tag.getName());
            ResultSet tagIdResult = selectTagIdStatement.executeQuery();
            if (tagIdResult.next()) {
              tagsIds.add(tagIdResult.getString("id"));
              System.out.println("Tag id: " + tagsIds);
            }
          }
        }

        for (String tagId : tagsIds) {
          String insertTeacherTagQuery = ("INSERT OR IGNORE INTO tags_ucitele (id_tag, id_ucitel) VALUES (?, ?)");
          try (PreparedStatement insertTeacherTagStatement = connection.prepareStatement(insertTeacherTagQuery)) {
            insertTeacherTagStatement.setString(1, tagId);
            insertTeacherTagStatement.setString(2, teacher.getId());
            insertTeacherTagStatement.executeUpdate();
          }
        }

        String insertTeacherQuery = "INSERT OR IGNORE INTO ucitele (uuid, first_name, last_name) VALUES (?, ?, ?)";
        try (PreparedStatement insertTeacherStatement = connection.prepareStatement(insertTeacherQuery)) {
          insertTeacherStatement.setString(1, teacher.getId());
          insertTeacherStatement.setString(2, teacher.getFirst_name());
          insertTeacherStatement.setString(3, teacher.getLast_name());
          insertTeacherStatement.executeUpdate();
        }

        String selectTeacherQuery = "SELECT * FROM ucitele WHERE uuid = ?";
        try (PreparedStatement selectTeacherStatement = connection.prepareStatement(selectTeacherQuery)) {
          selectTeacherStatement.setString(1, teacher.getId());
          ResultSet result = selectTeacherStatement.executeQuery();

          System.out.println("Teachers:");
          while (result.next()) {
            System.out.print(result.getString("first_name") + " | ");
            System.out.println(result.getString("last_name"));
          }
        }
      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
  }

}
