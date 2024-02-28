package cz.ghosts.tda.teachers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

import cz.ghosts.tda.objects.TeacherId;
import cz.ghosts.tda.teachers.conctacts.Contact;
import cz.ghosts.tda.teachers.tags.TagsTDO;

public class TeachersTDO extends TeacherId<String> {
  private String title_before = null;
  private String first_name;
  private String middle_name = null;
  private String last_name;
  private String title_after = null;
  private String picture_url = null;
  private String location = null;
  private String claim = null;
  private String bio = null;
  private String username=null;
  private String password=null;

  private List<TagsTDO> tags = new ArrayList<>();
  private int price_per_hour = 0;
  private Contact contact;

  private List<TagsTDO> checkForEmptyTags(List<TagsTDO> tags) {
    if (tags == null || tags.size() <= 0) {
      return Collections.emptyList();
    }
    return tags;
  }

  public TeachersTDO() {
    super(UUID.randomUUID().toString()); // Pass a default or null value for the parent constructor
  }

  public TeachersTDO(String id, String first_name, String last_name, Contact contact, List<TagsTDO> tags) {
    super(id);
    this.first_name = first_name;
    this.last_name = last_name;
    this.contact = contact;
    this.tags = tags;
  }

  public TeachersTDO(String id, String title_before, String first_name, String middle_name,
      String last_name,
      String title_after, String picture_url, String location, String claim, String bio, List<TagsTDO> tags,
      int price_per_hour, Contact contact, String password) {
    super(id);
    this.title_before = title_before;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.title_after = title_after;
    this.picture_url = picture_url;
    this.location = location;
    this.claim = claim;
    this.bio = bio;
    this.tags = checkForEmptyTags(tags);
    this.price_per_hour = price_per_hour;
    this.contact = contact;
    this.password = password;
  }

  @JsonProperty("contact")
  public Contact getContact() {
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

  public String getUsername() {
    return first_name+middle_name+last_name;
  }

@JsonIgnore
  public String getPassword() {
    return password;
  }
}
