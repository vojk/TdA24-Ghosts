package cz.ghosts.tda.objects.subobjects;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Links{
    private String title;
    private String url;
    private int id;

    public Links(){

    }

    public Links(int id, String title, String url){
        this.id = id;
        this.title = title;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }
    @JsonIgnore
    public int getId() {
        return id;
    }
}
