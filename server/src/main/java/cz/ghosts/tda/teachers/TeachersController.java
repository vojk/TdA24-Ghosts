package cz.ghosts.tda.teachers;

import cz.ghosts.tda.teachers.credentials.CredentialsGenerator;
import org.springframework.web.bind.annotation.RestController;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.objects.return_objects.HTTPCodesTDO;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/lecturers")
public class TeachersController {
  @GetMapping(path = { "/", "", "/{id}" })
  public ResponseEntity<Object> getTeachers(@PathVariable(required = false) String id) {
    if (id == null) {
      id = "";
    }
    List<TeachersTDO> teachers = new ArrayList<>();
    DbController dbController = new DbController();

    teachers = dbController.getAllTeachers(id);

    if (id.length() <= 0)
      return ResponseEntity.ok(teachers);

    if ((teachers == null || teachers.size() <= 0))
      return ResponseEntity.status(404).body(new HTTPCodesTDO(404, "User not found"));

    return ResponseEntity.ok(teachers.get(0));

  }

  @PostMapping(path = { "/", "" })
  public ResponseEntity<Object> postMethodName(@RequestBody TeachersTDO entity) {
    System.out.println(entity);
    DbController dbController = new DbController();
    if (entity.getFirst_name() == null || entity.getFirst_name().length() <= 0 || entity.getLast_name() == null
        || entity.getLast_name().length() <= 0 || entity.getContact() == null || entity.getContact().getEmails() == null
        || entity.getContact().getEmails().size() <= 0 || entity.getContact().getTelephoneNumbers() == null
        || entity.getContact().getTelephoneNumbers().size() <= 0) {
      return ResponseEntity.status(400).body(new ArrayList<>());
    }
    String teacherId = dbController.addTeacher(entity);

    CredentialsGenerator credentialsGenerator = new CredentialsGenerator();
    List<TeachersTDO> tempList = dbController.getAllTeachers(teacherId);
    credentialsGenerator.generator(tempList.get(0).getFirst_name(), tempList.get(0).getLast_name());

    return ResponseEntity.ok(dbController.getAllTeachers(teacherId).get(0));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateTeacher(@RequestBody TeachersTDO entity, @PathVariable String id) {
    entity.setId(id);
    DbController dbController = new DbController();

    List<TeachersTDO> teachers = dbController.getAllTeachers(id);

    if ((teachers == null || teachers.size() <= 0))
      return ResponseEntity.status(404).body(new HTTPCodesTDO(404, "User not found"));

    if (entity.getFirst_name() == null || entity.getFirst_name().length() <= 0 || entity.getLast_name() == null
        || entity.getLast_name().length() <= 0 || entity.getContact() == null || entity.getContact().getEmails() == null
        || entity.getContact().getEmails().size() <= 0 || entity.getContact().getTelephoneNumbers() == null
        || entity.getContact().getTelephoneNumbers().size() <= 0) {
      return ResponseEntity.status(400).body(new ArrayList<>());
    }
    String teacherId = dbController.updateTeacher(entity);
    return ResponseEntity.ok(dbController.getAllTeachers(teacherId).get(0));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteTeacher(@PathVariable String id) {
    DbController dbController = new DbController();

    List<TeachersTDO> teachers = dbController.getAllTeachers(id);

    if ((teachers == null || teachers.size() <= 0))
      return ResponseEntity.status(404).body(new HTTPCodesTDO(404, "User not found"));

    if (dbController.deleteTeacher(id)) {
      return ResponseEntity.ok(new HTTPCodesTDO(200, "Teacher deleted"));
    }
    return ResponseEntity.status(404).body(new HTTPCodesTDO(404, "User not found"));
  }

}
