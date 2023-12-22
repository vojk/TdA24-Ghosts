package cz.ghosts.tda.database;

import java.util.UUID;

public interface UUIDGenerator {
  String uuid = UUID.randomUUID().toString();
}
