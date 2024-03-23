package cz.ghosts.tda.objects;

import cz.ghosts.tda.objects.subobjects.*;

import java.util.List;
import java.util.UUID;

public class Activity {
    private String uuid;
    private String activityName;
    private String description;
    private List<String> objectives;
    private String classStructure;
    private int lengthMin;
    private int lengthMax;
    private List<String> edLevel;
    private List<String> tools;
    private List<Instructions> homePreparation;
    private List<Instructions> instructions;
    private List<Agenda> agenda;
    private List<Links> links;
    private List<Gallery> gallery;
    private int potvrzovani;

    public Activity(String uuid, String activityName, String description, List<String> objectives,
                    String classStructure, int lengthMin, int lengthMax, int potvrzovani, List<String> edLevel,
                    List<String> tools, List<Instructions> homePreparation, List<Instructions> instructions,
                    List<Agenda> agenda, List<Links> links, List<Gallery> gallery){
        this.activityName = activityName;
        this.description = description;
        this.objectives=objectives;
        this.classStructure=classStructure;
        this.lengthMin=lengthMin;
        this.lengthMax=lengthMax;
        this.edLevel=edLevel;
        this.tools=tools;
        this.homePreparation=homePreparation;
        this.instructions=instructions;
        this.agenda=agenda;
        this.links=links;
        this.gallery=gallery;
        this.uuid = uuid;
        this.potvrzovani = potvrzovani;
    }


    public Activity(){

    }

    public String getActivityName() {
        return activityName;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getObjectives() {
        return objectives;
    }

    public String getClassStructure() {
        return classStructure;
    }

    public int getLengthMin() {
        return lengthMin;
    }

    public int getLengthMax() {
        return lengthMax;
    }

    public List<String> getEdLevel() {
        return edLevel;
    }

    public List<String> getTools() {
        return tools;
    }

    public List<Instructions> getHomePreparation() {
        return homePreparation;
    }

    public List<Instructions> getInstructions() {
        return instructions;
    }

    public List<Agenda> getAgenda() {
        return agenda;
    }

    public List<Links> getLinks() {
        return links;
    }

    public List<Gallery> getGallery() {
        return gallery;
    }

    public int getPotvrzovani() {
        return potvrzovani;
    }

    public String getUuid() {
        if (uuid == null) {
            this.uuid = UUID.randomUUID().toString();
        }
        return uuid;
    }
}
