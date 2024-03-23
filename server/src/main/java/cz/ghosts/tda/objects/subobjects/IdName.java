package cz.ghosts.tda.objects.subobjects;

public class IdName {
    public int id;
    public String name;

    public IdName(){

    }

    public IdName(int id, String name){
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
