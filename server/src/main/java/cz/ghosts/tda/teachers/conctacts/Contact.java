package cz.ghosts.tda.teachers.conctacts;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Contact {
  private List<String> emails;
  private List<TelephoneNumbersTDO> telephone_numbers;

  public Contact() {

  }

  public Contact(List<TelephoneNumbersTDO> telephone_numbers) {
    this.telephone_numbers = telephone_numbers;
  }

  public Contact(List<String> emails, List<TelephoneNumbersTDO> telephone_numbers) {
    this.emails = emails;
    this.telephone_numbers = telephone_numbers;
    System.out.print("Telephone numbers: ");
    System.out.println(this.telephone_numbers);
  }

  @JsonProperty("telephone_numbers")
  public List<String> getTelephone_numbers() {
    // Check if telephone_numbers is null
    if (telephone_numbers == null) {
      // Handle the case when telephone_numbers is null, e.g., return an empty list
      return Collections.emptyList();
    }

    List<String> temp_telephone_numbers = new ArrayList<>();

    for (TelephoneNumbersTDO telephone_number : telephone_numbers) {
      temp_telephone_numbers.add(telephone_number.toString());
    }

    return temp_telephone_numbers;
  }

  @JsonProperty("emails")
  public List<String> getEmails() {
    return emails;
  }

  @JsonIgnore
  public List<TelephoneNumbersTDO> getTelephoneNumbers() {
    return telephone_numbers;
  }
}
