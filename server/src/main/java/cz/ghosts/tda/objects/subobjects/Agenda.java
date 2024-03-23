package cz.ghosts.tda.objects.subobjects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.ghosts.tda.objects.UniversalId;

public class Agenda {
    private int id;
    private int duration;
    private String title;
    private String description;

    public Agenda() {

    }

    public Agenda(int id, String title, int duration,  String description) {
        this.id = id;
        this.duration = duration;
        this.title = title;
        this.description = description;
    }

    @JsonIgnore
    public int getId() {
        return id;
    }

    public int getDuration() {
        return duration;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
