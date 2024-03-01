package cz.ghosts.tda.reservation;

public class ReservationConfirmDTO{
    public String getId() {
        return id;
    }

    private String id;
    private int souhlas;
    public ReservationConfirmDTO(){

    }
    public ReservationConfirmDTO(String id, int souhlas) {
        this.id = id;
        this.souhlas = souhlas;
    }


    public int getSouhlas() {return souhlas;}

}
