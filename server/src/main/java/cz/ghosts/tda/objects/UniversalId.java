package cz.ghosts.tda.objects;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class UniversalId <I extends Serializable> {
    private I id;

    public UniversalId(I id) {
        this.id = id;
    }

    @JsonProperty("uuid")
    public I getId() {
        return id;
    }

    public void setId(I id) {
        this.id = id;
    }

}
