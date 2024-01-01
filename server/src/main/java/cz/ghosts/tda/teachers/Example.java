package cz.ghosts.tda.teachers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Example {
  @GetMapping("")
  public ResponseEntity<Object> responseEntity() {

    return ResponseEntity.ok("OK");
  }

}
