package cz.ghosts.tda.teachers.conctacts;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.ArrayList;

public class TelephoneNumbersTDO {
  private String number;
  private String prefix;

  private List<String> parsePhoneNumber(String telephoneNumber) {
    // Define the regular expression pattern to match the phone number format
    Pattern pattern = Pattern.compile("(\\+?\\d{0,3})[\\s\\(]*([\\d\\s\\(\\)]+)[\\s\\)]*");

    // Match the input phone number against the pattern
    Matcher matcher = pattern.matcher(telephoneNumber);

    // Check if a match is found
    if (matcher.matches()) {
      // Group 1 contains the prefix, and Group 2 contains the number
      String prefix = matcher.group(1).replaceAll("[^\\d+]", " ");
      String number = matcher.group(2).replaceAll("[^\\d]", " ");

      return new ArrayList<String>() {
        {
          add(prefix.replaceAll("\\+", ""));
          add(number);
        }
      };
    } else {
      // If no match is found, return null or handle it as needed
      return null;
    }
  }

  public TelephoneNumbersTDO() {
  }

  public TelephoneNumbersTDO(String telephoneNumber) {
    List<String> telephoneNums = parsePhoneNumber(telephoneNumber);
    this.prefix = telephoneNums.get(0);
    this.number = telephoneNums.get(1);
  }

  public TelephoneNumbersTDO(String prefix, String number) {
    this.prefix = prefix;
    this.number = number;
  }

  @JsonIgnore
  public String getNumber() {
    return number;
  }

  @JsonIgnore
  public String getPrefix() {
    return prefix;
  }

  @JsonProperty("telephone_number")
  public String getWholeNumber() {
    return "+" + prefix + " " + number;
  }

  @JsonIgnore
  public String toString() {
    return "+" + prefix + " " + number;
  }
}
