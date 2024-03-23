package cz.ghosts.tda.objects.subobjects;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Images {
    private int id;
    private String lowRes;
    private String highRes;

    public Images(){

    }

    public Images(int ID, String lowRes, String highRes){
        this.id = ID;
        this.lowRes = lowRes;
        this.highRes = highRes;
    }

    @JsonIgnore
    public int getId() {
        return id;
    }

    public String getLowRes() {
        return lowRes;
    }

    public String getHighRes() {
        return highRes;
    }
}
