package cz.ghosts.tda.teachers.conctacts;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Contact {
  private List<String> emails;
  private List<String> telephone_numbers;

  public Contact(List<String> emails, List<String> telephone_numbers) {
    this.emails = emails;
    this.telephone_numbers = telephone_numbers;
  }

  @JsonProperty("telephone_numbers")
  public List<String> getTelephone_numbers() {
    return telephone_numbers;
  }

  @JsonProperty("emails")
  public List<String> getEmails() {
    return emails;
  }
}
