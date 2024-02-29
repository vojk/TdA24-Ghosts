package cz.ghosts.tda.reservation;

import java.util.Date;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import cz.ghosts.tda.objects.TeacherId;
import cz.ghosts.tda.teachers.tags.TagsTDO;

public class ReservationDTO extends TeacherId<String> {
  private String teacher_id;
  @JsonFormat(pattern = "yyyy-mm-dd")
  private Date date_of_reserv;
  private int from_time;
  private int to_time;
  private int id_location;
  private List<TagsTDO> tags = new ArrayList<>();

  public ReservationDTO() {
    super(UUID.randomUUID().toString());
    // TODO Auto-generated constructor stub
  }

  private List<TagsTDO> checkForEmptyTags(List<TagsTDO> tags) {
    if (tags == null || tags.size() <= 0) {
      return Collections.emptyList();
    }
    return tags;
  }

  public ReservationDTO(String id, Date date_of_reserv, int from_time, int to_time,
      int id_location, List<TagsTDO> tags) {
    super(id);
    this.date_of_reserv = date_of_reserv;
    this.from_time = from_time;
    this.to_time = to_time;
    this.id_location = id_location;
    this.tags = checkForEmptyTags(tags);
  }

  public ReservationDTO(String id, String teacher_id, Date date_of_reserv, int from_time, int to_time,
      int id_location, List<TagsTDO> tags) {
    super(id);
    this.teacher_id = teacher_id;
    this.date_of_reserv = date_of_reserv;
    this.from_time = from_time;
    this.to_time = to_time;
    this.id_location = id_location;
    this.tags = checkForEmptyTags(tags);
  }

  public String getTeacher_id() {
    return teacher_id;
  }

  public void setTeacher_id(String teacher_id) {
    this.teacher_id = teacher_id;
  }

  public List<TagsTDO> getTags() {
    return tags;
  }

  public Date getDate_of_reserv() {
    return date_of_reserv;
  }

  public int getFrom_time() {
    return from_time;
  }

  public int getTo_time() {
    return to_time;
  }

  public int getId_location() {
    return id_location;
  }

}
