package cz.ghosts.tda.database;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;

import java.util.List;
import java.util.ArrayList;

import cz.ghosts.tda.reservation.ReservationDTO;
import cz.ghosts.tda.teachers.tags.TagsTDO;

public class DbReservation {
  class DbStatement {
    public Connection connection;
    public Statement statement;

    public DbStatement(Connection connection, Statement statement) {
      this.connection = connection;
      this.statement = statement;
    }
  }

  public void createReservation(ReservationDTO reservationDTO) {

    String sql_to_main_db = "INSERT INTO reservation (uuid, date_of_reserv, from_time, to_time) VALUES ('"
        + reservationDTO.getId() + "', '" + reservationDTO.getDate_of_reserv()
        + "', " + reservationDTO.getFrom_time() + ", " + reservationDTO.getTo_time()
        + ")";

    String sql_to_reservation_ucitele = "INSERT INTO reservation_ucitele (uuid_ucitele, uuid_reservation) VALUES ('"
        + reservationDTO.getTeacher_id() + "', '" + reservationDTO.getId()
        + "')";

    String selectTagQuery = "SELECT * FROM tags WHERE name = ?";

    String sql_to_reservation_tags = "INSERT INTO reservation_tag (uuid_reversation, uuid_tags) VALUES (?, ?)";

    List<String> tagsIds = new ArrayList<>();

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        statement.execute(sql_to_main_db);
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        statement.execute(sql_to_reservation_ucitele);
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    for (TagsTDO tag : reservationDTO.getTags()) {
      try (Connection connection = DBInterface.getConnection();) {
        try (Statement statement = connection.createStatement();) {
          try (PreparedStatement selectTagStatement = connection.prepareStatement(selectTagQuery)) {
            selectTagStatement.setString(1, tag.getName());
            ResultSet result = selectTagStatement.executeQuery();
            if (result.next()) {
              tagsIds.add(result.getString("id"));
              System.out.println("Tag id: " + tagsIds);
            }
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        try (PreparedStatement insertTagStatement = connection.prepareStatement(sql_to_reservation_tags)) {
          for (String tagId : tagsIds) {
            insertTagStatement.setString(1, reservationDTO.getId());
            insertTagStatement.setString(2, tagId);
            insertTagStatement.execute();
          }
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void deleteReservation(String id) {
    String sql_to_main_db = "DELETE FROM reservation WHERE uuid = '" + id + "';";

    String sql_to_reservation_ucitele = "DELETE FROM reservation_ucitele WHERE uuid_reservation = '" + id + "';";

    String sql_to_reservation_tags = "DELETE FROM reservation_tag WHERE uuid_reversation = '" + id + "';";

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        statement.execute(sql_to_reservation_ucitele);
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        statement.execute(sql_to_reservation_tags);
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        statement.execute(sql_to_main_db);
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private List<TagsTDO> getTags(String reservation_id) {
    String sql_as = "SELECT uuid_tags FROM reservation_tag WHERE uuid_reversation = '" + reservation_id + "';";

    List<String> tagsIds = new ArrayList<>();
    List<TagsTDO> tags = new ArrayList<>();

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        ResultSet result = statement.executeQuery(sql_as);
        while (result.next()) {
          tagsIds.add(result.getString("uuid_tags"));
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    for (String id : tagsIds) {
      String sql = "SELECT * FROM tags WHERE id = '" + id + "';";
      try (Connection connection = DBInterface.getConnection();) {
        try (Statement statement = connection.createStatement();) {
          ResultSet result = statement.executeQuery(sql);
          if (result.next()) {
            tags.add(new TagsTDO(result.getString("id"), result.getString("name")));
          }
        } catch (Exception e) {
          e.printStackTrace();
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    return tags;
  }

  public List<ReservationDTO> getReservation(String id) {
    String sql = "SELECT reservation.uuid, reservation.date_of_reserv, reservation.from_time, reservation.to_time, reservation_ucitele.uuid_ucitele FROM reservation JOIN reservation_ucitele ON reservation_ucitele.uuid_reservation = reservation.uuid WHERE reservation_ucitele.uuid_ucitele = '"
        + id + "'";

    List<ReservationDTO> reservation = new ArrayList<>();

    String pattern = "EEE MMM dd HH:mm:ss zzz yyyy";
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);

    try (Connection connection = DBInterface.getConnection();) {
      try (Statement statement = connection.createStatement();) {
        try (PreparedStatement selectStatement = connection.prepareStatement(sql)) {
          ResultSet result = selectStatement.executeQuery();
          while (result.next()) {
            System.out.println(result.getString("uuid_ucitele"));
            reservation.add(new ReservationDTO(result.getString("uuid"), result.getString("uuid_ucitele"),
                new SimpleDateFormat("yyyy-mm-dd").parse(result.getString("date_of_reserv")), // TODO: fix date format
                result.getInt("from_time"), result.getInt("to_time"), 0,
                getTags(result.getString("uuid"))));
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    } catch (

    Exception e) {
      e.printStackTrace();
    }

    return reservation;
  }

}
