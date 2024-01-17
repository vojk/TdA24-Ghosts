package cz.ghosts.tda.misc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.teachers.tags.TagsTDO;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/")
public class MiscController {
  @GetMapping(path = { "tag/", "tag" })
  public ResponseEntity<Object> getTags() {
    List<TagsTDO> tags = new ArrayList<>();
    DbController dbController = new DbController();

    tags = dbController.getAllTags();

    return ResponseEntity.ok(tags);
  }

  @GetMapping(path = { "location/", "location" })
  public ResponseEntity<Object> getLocations() {
    List<String> locations = new ArrayList<>();
    DbController dbController = new DbController();

    locations = dbController.getAllLocations();

    return ResponseEntity.ok(locations);
  }
}
