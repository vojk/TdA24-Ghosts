package cz.ghosts.tda.teachers;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

import cz.ghosts.tda.objects.TeacherId;
import cz.ghosts.tda.teachers.conctacts.Contact;
import cz.ghosts.tda.teachers.tags.TagsTDO;

public class TeachersTDO extends TeacherId<String> {
  private String title_before;
  private String first_name;
  private String middle_name;
  private String last_name;
  private String title_after;
  private String picture_url;
  private String location;
  private String claim;
  private String bio;
  private List<TagsTDO> tags;
  private int price_per_hour;
  private Contact contact;

  public TeachersTDO() {
    super(UUID.randomUUID().toString()); // Pass a default or null value for the parent constructor
  }

  public TeachersTDO(String id, String first_name, String last_name, Contact contact, List<TagsTDO> tags) {
    super(UUID.randomUUID().toString());
    this.first_name = first_name;
    this.last_name = last_name;
    this.contact = contact;
    this.tags = tags;
  }

  @JsonProperty("contact")
  public Object getContact() {
    return contact;
  }

  public String getLast_name() {
    return last_name;
  }

  public String getFirst_name() {
    return first_name;
  }

  public List<TagsTDO> getTags() {
    return tags;
  }

  public String getTitle_before() {
    return title_before;
  }

  public String getMiddle_name() {
    return middle_name;
  }

  public String getTitle_after() {
    return title_after;
  }

  public String getPicture_url() {
    return picture_url;
  }

  public String getLocation() {
    return location;
  }

  public String getClaim() {
    return claim;
  }

  public String getBio() {
    return bio;
  }

  public int getPrice_per_hour() {
    return price_per_hour;
  }

}
