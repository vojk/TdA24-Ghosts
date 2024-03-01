package cz.ghosts.tda.reservation;

import org.springframework.web.bind.annotation.*;

import cz.ghosts.tda.database.DbReservation;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
  @PostMapping("/{id}")
  public ResponseEntity<Object> getReservationForTeacher(@PathVariable String id,
      @RequestBody ReservationDTO entity) {
    DbReservation dbReservation = new DbReservation();
    System.out.println(id);
    entity.setTeacher_id(id);
    System.out.println("Potvrzeno: " + entity.getSouhlas());
    dbReservation.createReservation(entity);
    return ResponseEntity.ok().body(entity);
  }
  @PutMapping("/updateTeacher")
  public int updateReservation(@RequestBody ReservationConfirmDTO entity){
    System.out.println("funguji");
    DbReservation dbReservation = new DbReservation();
    System.out.println(entity.getSouhlas());
    if (dbReservation.updateReservation(entity) == 200) {
      return 200;
    }
    return 400;
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteReservation(@PathVariable String id) {
    System.out.println(id);
    DbReservation dbReservation = new DbReservation();
    dbReservation.deleteReservation(id);
    return ResponseEntity.ok().body(id);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> getReservation(@PathVariable String id) {
    DbReservation dbReservation = new DbReservation();
    return ResponseEntity.ok().body(dbReservation.getReservation(id));
  }


}
