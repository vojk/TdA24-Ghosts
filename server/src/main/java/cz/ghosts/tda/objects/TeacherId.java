package cz.ghosts.tda.objects;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TeacherId<I extends Serializable> {
  private I id;

  public TeacherId(I id) {
    this.id = id;
  }

  @JsonProperty("uuid")
  public I getId() {
    return id;
  }

  public void setId(I id) {
    this.id = id;
  }
}
