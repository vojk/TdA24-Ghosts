package cz.ghosts.tda.reservation;

import cz.ghosts.tda.database.DbController;
import cz.ghosts.tda.mail.EmailSender;
import cz.ghosts.tda.teachers.TeachersTDO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import cz.ghosts.tda.database.DbReservation;

import org.springframework.http.ResponseEntity;

import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
  @Autowired
  EmailSender emailSender;

  @PostMapping("/{id}")
  public ResponseEntity<Object> getReservationForTeacher(@PathVariable String id,
      @RequestBody ReservationDTO entity) {
    DbReservation dbReservation = new DbReservation();
    System.out.println(id);
    entity.setTeacher_id(id);
    dbReservation.createReservation(entity);

    DbController dbController = new DbController();
    TeachersTDO teacher = dbController.getAllTeachers(id).get(0);
    SimpleDateFormat df = new SimpleDateFormat("yyyy");
    emailSender.sendEmailInfoAboutPreReserveInformativeClient(entity.getEmail(), "Předběžné potvrzení schůzky", entity.getFirstName(),
            entity.getMiddleName(), entity.getLastName(), teacher.getLast_name(), entity.getDate_of_reserv().getDate() + ". " + (entity.getDate_of_reserv().getMonth()+1) + ". " + df.format(entity.getDate_of_reserv()),
            entity.getFrom_time() + ":00", entity.getTo_time()+ ":00");
    return ResponseEntity.ok().body(entity);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteReservation(@PathVariable String id) {
    System.out.println(id);
    DbReservation dbReservation = new DbReservation();
    DbController dbController = new DbController();
    ReservationDTO rezervace = dbReservation.getReservationByReservationId(id);
    TeachersTDO teacher = dbController.getAllTeachers(rezervace.getTeacher_id()).get(0);
    SimpleDateFormat df = new SimpleDateFormat("yyyy");
    emailSender.sendEmailInfoAboutReservDeclineClient(rezervace.getEmail(), "Zrušení schůzky", rezervace.getFirstName(),
        rezervace.getMiddleName(), rezervace.getLastName(), teacher.getFirst_name(), rezervace.getDate_of_reserv().getDate() + ". " + (rezervace.getDate_of_reserv().getMonth()+1) + ". " + df.format(rezervace.getDate_of_reserv()),
        rezervace.getFrom_time() + ":00", rezervace.getTo_time()+ ":00");
    dbReservation.deleteReservation(id);
    return ResponseEntity.ok().body(id);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getReservation(@PathVariable String id) {
    DbReservation dbReservation = new DbReservation();
    return ResponseEntity.ok().body(dbReservation.getReservation(id));
  }

}
