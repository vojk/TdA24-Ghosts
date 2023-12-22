package cz.ghosts.tda.teachers.tags;

import java.util.UUID;

import cz.ghosts.tda.objects.TeacherId;

public class TagsTDO extends TeacherId<String> {
  private String name;

  public TagsTDO() {
    super(UUID.randomUUID().toString());
  }

  public TagsTDO(String name) {
    super(UUID.randomUUID().toString());
    this.name = name;
  }

  public TagsTDO(String id, String name) {
    super(id);
    this.name = name;
  }

  public String getName() {
    return name;
  }

}
