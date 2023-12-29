package cz.ghosts.tda.teachers;

import org.springframework.web.bind.annotation.RestController;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.objects.return_objects.HTTPCodesTDO;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/teachers")
public class TeachersController {
  @GetMapping(path = { "/", "/{id}" })
  public ResponseEntity<Object> getTeachers(@PathVariable(required = false) String id) {
    if (id == null) {
      id = "";
    }
    List<TeachersTDO> teachers = new ArrayList<>();
    DbController dbController = new DbController();

    teachers = dbController.getAllTeachers(id);

    if (teachers == null || teachers.size() <= 0)
      return ResponseEntity.status(404).body(new HTTPCodesTDO(404, "User not found"));

    if (id.length() <= 0)
      return ResponseEntity.ok(teachers);

    return ResponseEntity.ok(teachers.get(0));

  }

  @PostMapping("/")
  public ResponseEntity<TeachersTDO> postMethodName(@RequestBody TeachersTDO entity) {
    System.out.println(entity);
    DbController dbController = new DbController();
    String teacherId = dbController.addTeacher(entity);
    return ResponseEntity.ok(dbController.getAllTeachers(teacherId).get(0));
  }

}
