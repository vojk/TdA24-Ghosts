package cz.ghosts.tda.objects.subobjects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.ghosts.tda.objects.UniversalId;

public class Instructions{
    private int id;

    private String title;
    private String warn;
    private String note;

    public Instructions(){

    }

    public Instructions(int id, String title, String warn, String note){
        this.id = id;
        this.title = title;
        this.warn = warn;
        this.note = note;
    }

    public String getTitle() {
        return title;
    }

    public String getWarn() {
        return warn;
    }

    public String getNote() {
        return note;
    }
@JsonIgnore
    public int getId() {
        return id;
    }
}
