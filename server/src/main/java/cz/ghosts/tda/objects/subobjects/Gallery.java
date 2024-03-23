package cz.ghosts.tda.objects.subobjects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public class Gallery {
    private int id;
    private String title;
    private List<Images> images;

    public Gallery(){

    }

    public Gallery(int id, String title, List<Images> images){
        this.id = id;
        this.title = title;
        this.images = images;
    }
    @JsonIgnore
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<Images> getImages() {
        return images;
    }
}
