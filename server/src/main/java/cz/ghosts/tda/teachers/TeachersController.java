package cz.ghosts.tda.teachers;

import org.springframework.web.bind.annotation.RestController;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.teachers.conctacts.Contact;
import cz.ghosts.tda.teachers.tags.TagsTDO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/teachers")
public class TeachersController {
  @GetMapping("/")
  public ResponseEntity<Object> getTeachers() {
    List<TeachersTDO> teachers = new ArrayList<>();
    List<String> emails = new ArrayList<>();
    List<String> telephone_numbers = new ArrayList<>();
    List<TagsTDO> tags = new ArrayList<>();
    tags.add(new TagsTDO("jfkfa-fasdf-vadfa", "tag1"));
    emails.add("user@example.com");
    telephone_numbers.add("123456789");

    teachers.add(new TeachersTDO("asjda-adf-dsfad", "Petr", "Novak", new Contact(emails, telephone_numbers), tags));

    emails.add("jenicek.as@asd.cz");
    telephone_numbers.add("987654321");
    teachers.add(new TeachersTDO("asjda-adf-asdf", "Pavel", "Novak", new Contact(emails, telephone_numbers), tags));

    return ResponseEntity.ok(teachers);
  }

  @PostMapping("/")
  public ResponseEntity<TeachersTDO> postMethodName(@RequestBody TeachersTDO entity) {
    System.out.println(entity);
    DbController dbController = new DbController();
    dbController.addTeacher(entity);
    System.out.println(entity.getFirst_name());
    System.out.println(entity.getLast_name());
    return ResponseEntity.ok(entity);
  }

}
