package cz.ghosts.tda.objects.return_objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HTTPCodesTDO {
  private int code;
  private String message;

  public HTTPCodesTDO(int code, String message) {
    this.code = code;
    this.message = message;
  }

  @JsonProperty("code")
  public int getCode() {
    return this.code;
  }

  @JsonProperty("message")
  public String getMessage() {
    return this.message;
  }
}
