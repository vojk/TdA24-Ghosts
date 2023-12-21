package cz.ghosts.tda.teachers.tags;

import cz.ghosts.tda.objects.TeacherId;

public class TagsTDO extends TeacherId<String> {
  private String name;

  public TagsTDO(String id, String name) {
    super(id);
    this.name = name;
  }

  public String getName() {
    return name;
  }

}
