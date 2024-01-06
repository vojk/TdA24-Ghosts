package cz.ghosts.tda.database;

import java.sql.Connection;
import java.sql.Statement;
import java.util.List;

import java.util.ArrayList;

import cz.ghosts.tda.teachers.TeachersTDO;
import cz.ghosts.tda.teachers.conctacts.Contact;
import cz.ghosts.tda.teachers.conctacts.TelephoneNumbersTDO;
import cz.ghosts.tda.teachers.tags.TagsTDO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

class DbStatement {
  public Connection connection;
  public Statement statement;

  public DbStatement(Connection connection, Statement statement) {
    this.connection = connection;
    this.statement = statement;
  }
}

public class DbController implements DBInterface {
  public void createDatabase() {
    InitDatabase initDatabase = new InitDatabase();
    initDatabase.checkExistenceOfDb();
  }

  public List<TagsTDO> getAllTags() {
    List<TagsTDO> tagsList = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectTagQuery = "SELECT * FROM tags";

        try (PreparedStatement selectTagStatement = connection.prepareStatement(selectTagQuery)) {
          ResultSet result = selectTagStatement.executeQuery();

          System.out.println("Tags:");
          while (result.next()) {
            tagsList.add(new TagsTDO(result.getString("id"), result.getString("name")));
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return tagsList.size() > 0 ? tagsList : new ArrayList<>();
  }

  public List<String> getAllLocations() {
    List<String> locationsList = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectLocationQuery = "SELECT * FROM location";

        try (PreparedStatement selectLocationStatement = connection.prepareStatement(selectLocationQuery)) {
          ResultSet result = selectLocationStatement.executeQuery();

          System.out.println("Locations:");
          while (result.next()) {
            locationsList.add(result.getString("city"));
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return locationsList.size() > 0 ? locationsList : new ArrayList<>();
  }

  private List<TagsTDO> getTags(String id) {
    List<TagsTDO> tags = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectIdOfTagFromTagsUciteleQuery = "SELECT id_tag FROM tags_ucitele WHERE id_ucitel = '" + id + "'";

        try (PreparedStatement selectIdOfTagFromTagsUciteleStatement = connection
            .prepareStatement(selectIdOfTagFromTagsUciteleQuery)) {
          ResultSet result = selectIdOfTagFromTagsUciteleStatement.executeQuery();

          System.out.println("Tags:");
          while (result.next()) {
            String selectTagQuery = "SELECT * FROM tags WHERE id = '" + result.getString("id_tag") + "'";

            try (PreparedStatement selectTagStatement = connection.prepareStatement(selectTagQuery)) {
              ResultSet resultTag = selectTagStatement.executeQuery();

              while (resultTag.next()) {
                tags.add(new TagsTDO(resultTag.getString("id"), resultTag.getString("name")));
                System.out.print(resultTag.getString("id") + " | ");
                System.out.println(resultTag.getString("name"));
              }
            }
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return tags.size() > 0 ? tags : null;
  }

  private List<TelephoneNumbersTDO> getTelephoneNumbers(String uuid) {
    List<TelephoneNumbersTDO> telephone_numbers = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectIdOfTelephoneFromTelephoneUciteleQuery = "SELECT id_tel FROM telephone_ucitel WHERE id_ucitel = '"
            + uuid + "'";

        try (PreparedStatement selectIdOfTelephoneFromTelephoneUciteleStatement = connection
            .prepareStatement(selectIdOfTelephoneFromTelephoneUciteleQuery)) {
          ResultSet result = selectIdOfTelephoneFromTelephoneUciteleStatement.executeQuery();

          System.out.println("Telephone numbers:");
          while (result.next()) {
            String selectTelephoneQuery = "SELECT * FROM telephone_nums WHERE id = '" + result.getString("id_tel")
                + "'";

            try (PreparedStatement selectTelephoneStatement = connection.prepareStatement(selectTelephoneQuery)) {
              ResultSet resultTelephone = selectTelephoneStatement.executeQuery();

              while (resultTelephone.next()) {
                String selectPrefixQuery = "SELECT * FROM prefixes WHERE id = '"
                    + resultTelephone.getString("id_prefix")
                    + "'";

                try (PreparedStatement selectPrefixStatement = connection.prepareStatement(selectPrefixQuery)) {
                  ResultSet resultPrefix = selectPrefixStatement.executeQuery();

                  while (resultPrefix.next()) {
                    telephone_numbers.add(new TelephoneNumbersTDO(resultPrefix.getString("tel_prefix"),
                        resultTelephone.getString("telephone")));
                    System.out.print(resultPrefix.getString("tel_prefix") + " | ");
                    System.out.println(resultTelephone.getString("telephone"));
                  }
                }
              }
            }
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return telephone_numbers.size() > 0 ? telephone_numbers : null;
  }

  private List<String> getEmails(String uuid) {
    List<String> emails = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectIdOfEmailFromEmailUciteleQuery = "SELECT id_email FROM email_ucitel WHERE id_ucitel = '" + uuid
            + "'";

        try (PreparedStatement selectIdOfEmailFromEmailUciteleStatement = connection
            .prepareStatement(selectIdOfEmailFromEmailUciteleQuery)) {
          ResultSet result = selectIdOfEmailFromEmailUciteleStatement.executeQuery();

          System.out.println("Emails:");
          while (result.next()) {
            String selectEmailQuery = "SELECT * FROM emails WHERE id = '" + result.getString("id_email") + "'";

            try (PreparedStatement selectEmailStatement = connection.prepareStatement(selectEmailQuery)) {
              ResultSet resultEmail = selectEmailStatement.executeQuery();

              while (resultEmail.next()) {
                emails.add(resultEmail.getString("email"));
                System.out.println(resultEmail.getString("email"));
              }
            }
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return emails.size() > 0 ? emails : null;
  }

  private String getTitleName(String id) {
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectTitleQuery = "SELECT * FROM titles WHERE id = '" + id + "'";

        try (PreparedStatement selectTitleStatement = connection.prepareStatement(selectTitleQuery)) {
          ResultSet result = selectTitleStatement.executeQuery();

          System.out.println("Title:");
          while (result.next()) {
            return result.getString("name");
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return null;
  }

  private String getLocationName(String id) {
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectLocationQuery = "SELECT * FROM location WHERE id = '" + id + "'";

        try (PreparedStatement selectLocationStatement = connection.prepareStatement(selectLocationQuery)) {
          ResultSet result = selectLocationStatement.executeQuery();

          System.out.println("Location:");
          while (result.next()) {
            return result.getString("city");
          }
        }
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
    }
    return null;
  }

  public List<TeachersTDO> getAllTeachers(String id) {
    List<TeachersTDO> teachers = new ArrayList<>();
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        String selectTeacherQuery = "";
        System.out.println(id);
        if (id.length() <= 0) {
          selectTeacherQuery = "SELECT * FROM ucitele";
        } else if (id.length() > 0) {
          selectTeacherQuery = "SELECT * FROM ucitele WHERE uuid = '" + id + "'";
        }

        try (PreparedStatement selectTeacherStatement = connection.prepareStatement(selectTeacherQuery)) {
          ResultSet result = selectTeacherStatement.executeQuery();

          System.out.println("Teachers:");
          while (result.next()) {
            System.out.println(result.getString("uuid"));
            teachers.add(new TeachersTDO(result.getString("uuid"), getTitleName(result.getString("id_title_before")),
                result.getString("first_name"), result.getString("middle_name"), result.getString("last_name"),
                getTitleName(result.getString("id_title_after")),
                result.getString("picture_url"), getLocationName(result.getString("id_location")),
                result.getString("claim"), result.getString("bio"),
                getTags(result.getString("uuid")), result.getInt("price_per_hour"),
                new Contact(getEmails(result.getString("uuid")), getTelephoneNumbers(result.getString("uuid")))));
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
    return teachers;
  }

  private void insertTags(DbStatement dbStatement, TagsTDO tag) throws SQLException {
    String insertTagQuery = ("INSERT OR IGNORE INTO tags (id, name) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = ?)");
    try (PreparedStatement insertTagStatement = dbStatement.connection.prepareStatement(insertTagQuery)) {
      insertTagStatement.setString(1, tag.getId());
      insertTagStatement.setString(2, tag.getName());
      insertTagStatement.setString(3, tag.getName());
      insertTagStatement.executeUpdate();
    }
  }

  private void insertEmails(DbStatement dbStatement, Contact contact) throws SQLException {
    for (String email : contact.getEmails()) {
      String insertEmailQuery = ("INSERT OR IGNORE INTO emails (email) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM emails WHERE email = ?)");
      try (PreparedStatement insertEmailStatement = dbStatement.connection.prepareStatement(insertEmailQuery)) {
        insertEmailStatement.setString(1, email);
        insertEmailStatement.setString(2, email);
        insertEmailStatement.executeUpdate();
      }
    }
  }

  private void insertPlace(DbStatement dbStatement, String place) throws SQLException {
    String insertPlaceQuery = ("INSERT OR IGNORE INTO location (city) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM location WHERE city = ?)");
    try (PreparedStatement insertPlaceStatement = dbStatement.connection.prepareStatement(insertPlaceQuery)) {
      insertPlaceStatement.setString(1, place);
      insertPlaceStatement.setString(2, place);
      insertPlaceStatement.executeUpdate();
    }
  }

  private void insertTitle(DbStatement dbStatement, String title) throws SQLException {
    String insertTitleQuery = ("INSERT OR IGNORE INTO titles (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM titles WHERE name = ?)");
    try (PreparedStatement insertTitleStatement = dbStatement.connection.prepareStatement(insertTitleQuery)) {
      insertTitleStatement.setString(1, title);
      insertTitleStatement.setString(2, title);
      insertTitleStatement.executeUpdate();
    }
  }

  private String getTitleId(DbStatement dbStatement, String title) throws SQLException {
    String selectTitleQuery = "SELECT id FROM titles WHERE name = ?";
    try (PreparedStatement selectTitleStatement = dbStatement.connection.prepareStatement(selectTitleQuery)) {
      selectTitleStatement.setString(1, title);
      ResultSet result = selectTitleStatement.executeQuery();
      if (result.next()) {
        return result.getString("id");
      }
    }
    return null;
  }

  private String getPlaceId(DbStatement dbStatement, String place) throws SQLException {
    String selectPlaceQuery = "SELECT id FROM location WHERE city = ?";
    try (PreparedStatement selectPlaceStatement = dbStatement.connection.prepareStatement(selectPlaceQuery)) {
      selectPlaceStatement.setString(1, place);
      ResultSet result = selectPlaceStatement.executeQuery();
      if (result.next()) {
        return result.getString("id");
      }
    }
    return null;
  }

  private void deleteUnusedTags(DbStatement dbStatement) throws SQLException {
    String deleteUnusedTagsQuery = "DELETE FROM tags WHERE id NOT IN (SELECT id_tag FROM tags_ucitele)";
    try (PreparedStatement deleteUnusedTagsStatement = dbStatement.connection.prepareStatement(deleteUnusedTagsQuery)) {
      deleteUnusedTagsStatement.executeUpdate();
    }
  }

  private void deleteUnusedTitles(DbStatement dbStatement) throws SQLException {
    String deleteUnusedTitlesQuery = "DELETE FROM titles WHERE id NOT IN (SELECT id_title_before FROM ucitele) AND id NOT IN (SELECT id_title_after FROM ucitele)";
    try (PreparedStatement deleteUnusedTitlesStatement = dbStatement.connection
        .prepareStatement(deleteUnusedTitlesQuery)) {
      deleteUnusedTitlesStatement.executeUpdate();
    }
  }

  private void deleteUnusedEmails(DbStatement dbStatement) throws SQLException {
    String deleteUnusedEmailsQuery = "DELETE FROM emails WHERE id NOT IN (SELECT id_email FROM email_ucitel)";
    try (PreparedStatement deleteUnusedEmailsStatement = dbStatement.connection
        .prepareStatement(deleteUnusedEmailsQuery)) {
      deleteUnusedEmailsStatement.executeUpdate();
    }
  }

  private void deleteUnusedTelephoneNumbers(DbStatement dbStatement) throws SQLException {
    String deleteUnusedTelephoneNumbersQuery = "DELETE FROM telephone_nums WHERE id NOT IN (SELECT id_tel FROM telephone_ucitel)";
    try (PreparedStatement deleteUnusedTelephoneNumbersStatement = dbStatement.connection
        .prepareStatement(deleteUnusedTelephoneNumbersQuery)) {
      deleteUnusedTelephoneNumbersStatement.executeUpdate();
    }
  }

  private void deleteUnusedLocations(DbStatement dbStatement) throws SQLException {
    String deleteUnusedLocationsQuery = "DELETE FROM location WHERE id NOT IN (SELECT id_location FROM ucitele)";
    try (PreparedStatement deleteUnusedLocationsStatement = dbStatement.connection
        .prepareStatement(deleteUnusedLocationsQuery)) {
      deleteUnusedLocationsStatement.executeUpdate();
    }
  }

  private void cleanDB(DbStatement dbStatement) throws SQLException {
    deleteUnusedTags(dbStatement);
    deleteUnusedTitles(dbStatement);
    deleteUnusedEmails(dbStatement);
    deleteUnusedTelephoneNumbers(dbStatement);
    deleteUnusedLocations(dbStatement);
  }

  private void insertRelationEmailTeacher(DbStatement dbStatement, TeachersTDO teacher) {
    teacher.getContact().getEmails().forEach((email) -> {
      String insertEmailToTeacherQuery = ("INSERT OR IGNORE INTO email_ucitel (id_email, id_ucitel) SELECT (SELECT id FROM emails WHERE email = ?), ? WHERE NOT EXISTS (SELECT 1 FROM email_ucitel WHERE id_email = (SELECT id FROM emails WHERE email = ?) AND id_ucitel = ?)");
      try (PreparedStatement insertEmailToTeacherStatement = dbStatement.connection
          .prepareStatement(insertEmailToTeacherQuery)) {
        insertEmailToTeacherStatement.setString(1, email);
        insertEmailToTeacherStatement.setString(2, teacher.getId());
        insertEmailToTeacherStatement.setString(3, email);
        insertEmailToTeacherStatement.setString(4, teacher.getId());
        insertEmailToTeacherStatement.executeUpdate();
      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
      }
    });
  }

  private void insertTelephoneNumbers(DbStatement dbStatement, Contact contact) {
    contact.getTelephoneNumbers().forEach(telephone_number -> {
      String insertTelephonePrefixQuery = ("INSERT OR IGNORE INTO prefixes (tel_prefix) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM prefixes WHERE tel_prefix = ?)");
      try (PreparedStatement insertTelephonePrefixStatement = dbStatement.connection
          .prepareStatement(insertTelephonePrefixQuery)) {
        insertTelephonePrefixStatement.setString(1, telephone_number.getPrefix());
        insertTelephonePrefixStatement.setString(2, telephone_number.getPrefix());
        insertTelephonePrefixStatement.executeUpdate();
      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
      }

      String insertTelephoneNumberQuery = ("INSERT OR IGNORE INTO telephone_nums (id_prefix, telephone) SELECT (SELECT id FROM prefixes WHERE tel_prefix = ?), ? WHERE NOT EXISTS (SELECT 1 FROM telephone_nums WHERE telephone = ? AND id_prefix = (SELECT id FROM prefixes WHERE tel_prefix = ?))");
      try (PreparedStatement insertTelephoneNumberStatement = dbStatement.connection
          .prepareStatement(insertTelephoneNumberQuery)) {
        insertTelephoneNumberStatement.setString(1, telephone_number.getPrefix());
        insertTelephoneNumberStatement.setString(2, telephone_number.getNumber());
        insertTelephoneNumberStatement.setString(3, telephone_number.getNumber());
        insertTelephoneNumberStatement.setString(4, telephone_number.getPrefix());
        insertTelephoneNumberStatement.executeUpdate();
      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
      }
    });
  }

  private void insertRelationTelephoneTeacher(DbStatement dbStatement, TeachersTDO teacher) {
    teacher.getContact().getTelephoneNumbers().forEach(telephone_number -> {
      String insertTelephoneToTeacherQuery = ("INSERT OR IGNORE INTO telephone_ucitel (id_tel, id_ucitel) SELECT (SELECT id FROM telephone_nums WHERE telephone = ? AND id_prefix = (SELECT id FROM prefixes WHERE tel_prefix = ?)), ? WHERE NOT EXISTS (SELECT 1 FROM telephone_ucitel WHERE id_tel = (SELECT id FROM telephone_nums WHERE telephone = ? AND id_prefix = (SELECT id FROM prefixes WHERE tel_prefix = ?)) AND id_ucitel = ?)");
      try (PreparedStatement insertTelephoneToTeacherStatement = dbStatement.connection
          .prepareStatement(insertTelephoneToTeacherQuery)) {
        insertTelephoneToTeacherStatement.setString(1, telephone_number.getNumber());
        insertTelephoneToTeacherStatement.setString(2, telephone_number.getPrefix());
        insertTelephoneToTeacherStatement.setString(3, teacher.getId());
        insertTelephoneToTeacherStatement.setString(4, telephone_number.getNumber());
        insertTelephoneToTeacherStatement.setString(5, teacher.getId());
        insertTelephoneToTeacherStatement.setString(6, telephone_number.getPrefix());
        insertTelephoneToTeacherStatement.executeUpdate();
      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
      }

      System.out.println("Telephone number: " + telephone_number.toString());
    });
  }

  public String addTeacher(TeachersTDO teacher) {
    List<String> tagsIds = new ArrayList<>();
    System.out.println("Id ucitele: " + teacher.getId());
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        for (TagsTDO tag : teacher.getTags()) {
          insertTags(new DbStatement(connection, statement), tag);

          String selectTagQuery = "SELECT * FROM tags WHERE name = ?";
          try (PreparedStatement selectTagStatement = connection.prepareStatement(selectTagQuery)) {
            selectTagStatement.setString(1, tag.getName());
            ResultSet result = selectTagStatement.executeQuery();
            if (result.next()) {
              tagsIds.add(result.getString("id"));
              System.out.println("Tag id: " + tagsIds);
            }
          }

        }

        insertTitle(new DbStatement(connection, statement), teacher.getTitle_before());
        insertTitle(new DbStatement(connection, statement), teacher.getTitle_after());

        insertEmails(new DbStatement(connection, statement), teacher.getContact());
        insertTelephoneNumbers(new DbStatement(connection, statement), teacher.getContact());
        insertPlace(new DbStatement(connection, statement), teacher.getLocation());

        insertRelationEmailTeacher(new DbStatement(connection, statement), teacher);
        insertRelationTelephoneTeacher(new DbStatement(connection, statement), teacher);

        for (String tagId : tagsIds) {
          String insertTeacherTagQuery = ("INSERT OR IGNORE INTO tags_ucitele (id_tag, id_ucitel) VALUES (?, ?)");
          try (PreparedStatement insertTeacherTagStatement = connection.prepareStatement(insertTeacherTagQuery)) {
            insertTeacherTagStatement.setString(1, tagId);
            insertTeacherTagStatement.setString(2, teacher.getId());
            insertTeacherTagStatement.executeUpdate();
          }
        }

        String insertTeacherQuery = "INSERT OR IGNORE INTO ucitele (uuid, first_name, middle_name, last_name, picture_url, claim, bio, price_per_hour, id_title_before, id_title_after, id_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement insertTeacherStatement = connection.prepareStatement(insertTeacherQuery)) {
          insertTeacherStatement.setString(1, teacher.getId());
          insertTeacherStatement.setString(2, teacher.getFirst_name());
          insertTeacherStatement.setString(3, teacher.getMiddle_name());
          insertTeacherStatement.setString(4, teacher.getLast_name());
          insertTeacherStatement.setString(5, teacher.getPicture_url());
          insertTeacherStatement.setString(6, teacher.getClaim());
          insertTeacherStatement.setString(7, teacher.getBio());
          insertTeacherStatement.setInt(8, teacher.getPrice_per_hour());
          insertTeacherStatement.setString(9,
              getTitleId(new DbStatement(connection, statement), teacher.getTitle_before()));
          insertTeacherStatement.setString(10, getTitleId(new DbStatement(connection, statement),
              teacher.getTitle_after()));
          insertTeacherStatement.setString(11, getPlaceId(new DbStatement(connection, statement),
              teacher.getLocation()));
          insertTeacherStatement.executeUpdate();
        }

        return teacher.getId();

      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
        return null;
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
      return null;
    }
  }

  private void deleteRelationTags(DbStatement dbStatement, String id) throws SQLException {
    String deleteRelationTagsQuery = "DELETE FROM tags_ucitele WHERE id_ucitel = ?";
    try (PreparedStatement deleteRelationTagsStatement = dbStatement.connection
        .prepareStatement(deleteRelationTagsQuery)) {
      deleteRelationTagsStatement.setString(1, id);
      deleteRelationTagsStatement.executeUpdate();
    }
  }

  private void deleteRelationEmails(DbStatement dbStatement, String id) throws SQLException {
    String deleteRelationEmailsQuery = "DELETE FROM email_ucitel WHERE id_ucitel = ?";
    try (PreparedStatement deleteRelationEmailsStatement = dbStatement.connection
        .prepareStatement(deleteRelationEmailsQuery)) {
      deleteRelationEmailsStatement.setString(1, id);
      deleteRelationEmailsStatement.executeUpdate();
    }
  }

  private void deleteRelationPhones(DbStatement dbStatement, String id) throws SQLException {
    String deleteRelationPhonesQuery = "DELETE FROM telephone_ucitel WHERE id_ucitel = ?";
    try (PreparedStatement deleteRelationPhonesStatement = dbStatement.connection
        .prepareStatement(deleteRelationPhonesQuery)) {
      deleteRelationPhonesStatement.setString(1, id);
      deleteRelationPhonesStatement.executeUpdate();
    }
  }

  public String updateTeacher(TeachersTDO teachersTDO) {
    System.out.println("Id ucitele: " + teachersTDO.getId());
    TeachersTDO teacher = getAllTeachers(teachersTDO.getId()).get(0);
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        insertTitle(new DbStatement(connection, statement), teachersTDO.getTitle_before());
        insertTitle(new DbStatement(connection, statement), teachersTDO.getTitle_after());
        insertPlace(new DbStatement(connection, statement), teachersTDO.getLocation());

        String updateTeacherQuery = "UPDATE ucitele SET first_name = ?, middle_name = ?, last_name = ?, picture_url = ?, claim = ?, bio = ?, price_per_hour = ?, id_title_before = ?, id_title_after = ?, id_location = ? WHERE uuid = ?";
        try (PreparedStatement updateTeacherStatement = connection.prepareStatement(updateTeacherQuery)) {
          updateTeacherStatement.setString(1, teachersTDO.getFirst_name() == null ? teacher.getFirst_name()
              : teachersTDO.getFirst_name());
          updateTeacherStatement.setString(2, teachersTDO.getMiddle_name() == null ? teacher.getMiddle_name()
              : teachersTDO.getMiddle_name());
          updateTeacherStatement.setString(3, teachersTDO.getLast_name() == null ? teacher.getLast_name()
              : teachersTDO.getLast_name());
          updateTeacherStatement.setString(4, teachersTDO.getPicture_url() == null ? teacher.getPicture_url()
              : teachersTDO.getPicture_url());
          updateTeacherStatement.setString(5,
              teachersTDO.getClaim() == null ? teacher.getClaim() : teachersTDO.getClaim());
          updateTeacherStatement.setString(6,
              teachersTDO.getBio() == null ? teacher.getBio() : teachersTDO.getBio());
          updateTeacherStatement.setInt(7, teachersTDO.getPrice_per_hour() == 0 ? teacher.getPrice_per_hour()
              : teachersTDO.getPrice_per_hour());
          updateTeacherStatement.setString(8,
              getTitleId(new DbStatement(connection, statement), teachersTDO.getTitle_before()) == null
                  ? getTitleId(new DbStatement(connection, statement), teacher.getTitle_before())
                  : getTitleId(new DbStatement(connection, statement), teachersTDO.getTitle_before()));
          updateTeacherStatement.setString(9, getTitleId(new DbStatement(connection, statement),
              teachersTDO.getTitle_after() == null ? teacher.getTitle_after() : teachersTDO.getTitle_after()));
          updateTeacherStatement.setString(10, getPlaceId(new DbStatement(connection, statement),
              teachersTDO.getLocation()));
          updateTeacherStatement.setString(11, teachersTDO.getId());
          updateTeacherStatement.executeUpdate();
        }

        deleteRelationTags(new DbStatement(connection, statement), teachersTDO.getId());

        List<String> tagsIds = new ArrayList<>();
        for (TagsTDO tag : teachersTDO.getTags()) {
          insertTags(new DbStatement(connection, statement), tag);
          String selectTagQuery = "SELECT * FROM tags WHERE name = ?";
          try (PreparedStatement selectTagStatement = connection.prepareStatement(selectTagQuery)) {
            selectTagStatement.setString(1, tag.getName());
            ResultSet result = selectTagStatement.executeQuery();
            if (result.next()) {
              tagsIds.add(result.getString("id"));
              System.out.println("Tag id: " + tagsIds);
            }
          }
        }

        for (String tagId : tagsIds) {
          String insertTeacherTagQuery = ("INSERT OR IGNORE INTO tags_ucitele (id_tag , id_ucitel) VALUES (?, ?)");
          try (PreparedStatement insertTeacherTagStatement = connection.prepareStatement(insertTeacherTagQuery)) {
            insertTeacherTagStatement.setString(1, tagId);
            insertTeacherTagStatement.setString(2, teachersTDO.getId());
            insertTeacherTagStatement.executeUpdate();
          }
        }

        deleteRelationEmails(new DbStatement(connection, statement), teachersTDO.getId());

        insertEmails(new DbStatement(connection, statement), teachersTDO.getContact());
        insertRelationEmailTeacher(new DbStatement(connection, statement), teachersTDO);

        deleteRelationPhones(new DbStatement(connection, statement), teachersTDO.getId());

        insertTelephoneNumbers(new DbStatement(connection, statement), teachersTDO.getContact());
        insertRelationTelephoneTeacher(new DbStatement(connection, statement), teachersTDO);

        cleanDB(new DbStatement(connection, statement));

      } catch (Exception e) {
        System.out.println("Error executing query");
        System.out.println(e.getMessage());
        return null;
      }
    } catch (Exception e) {
      System.out.println("Error adding teacher");
      System.out.println(e.getMessage());
      return null;
    }
    return teachersTDO.getId();
  }

  public boolean deleteTeacher(String uuid) {
    String deleteTeacherQuerry = "DELETE FROM ucitele WHERE uuid = ?";
    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement()) {
        deleteRelationEmails(new DbStatement(connection, statement), uuid);
        deleteRelationPhones(new DbStatement(connection, statement), uuid);
        deleteRelationTags(new DbStatement(connection, statement), uuid);

        try (PreparedStatement deleteTeacherStatement = connection.prepareStatement(deleteTeacherQuerry)) {
          deleteTeacherStatement.setString(1, uuid);
          deleteTeacherStatement.executeUpdate();
        }
        cleanDB(new DbStatement(connection, statement));
      }
    } catch (Exception e) {
      System.out.println("Error executing query");
      System.out.println(e.getMessage());
      return false;
    }
    return true;
  }
}
