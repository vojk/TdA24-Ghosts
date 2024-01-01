package cz.ghosts.tda.teachers;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

import org.jetbrains.annotations.NotNull;
import org.springframework.lang.NonNull;

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
  private List<TagsTDO> tags = null;
  private int price_per_hour = 0;
  private Contact contact;

  private String checkForEmptyString(String str) {
    if (str == null || str.length() <= 0) {
      return null;
    }
    return str;
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
      int price_per_hour, Contact contact) {
    super(id);
    this.title_before = checkForEmptyString(title_before);
    this.first_name = checkForEmptyString(first_name);
    this.middle_name = checkForEmptyString(middle_name);
    this.last_name = checkForEmptyString(last_name);
    this.title_after = checkForEmptyString(title_after);
    this.picture_url = checkForEmptyString(picture_url);
    this.location = checkForEmptyString(location);
    this.claim = checkForEmptyString(claim);
    this.bio = checkForEmptyString(bio);
    this.tags = tags;
    this.price_per_hour = price_per_hour;
    this.contact = contact;
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

}
