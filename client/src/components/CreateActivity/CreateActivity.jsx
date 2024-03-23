import InputField from "./InputField";
import InputTitleWarnNote from "./InputTitleWarnNote";
import InputTitleUrl from "./InputTitleUrl"
import InputImages from "./InputImages";
import { TextField } from "@mui/material";
import { Switch } from "@mui/material";
import { Paper } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import InputDurationTitleDesc from "./InputDurationTitleDesc";
import { useState } from "react";
import { Checkbox } from "@mui/material";

function CreateActivity() {
    const [activityName, setActivityName] = useState("") //
    const [description, setDescription] = useState("") //
    const [objectives, setObjectives] = useState([])
    const [classStructure, setClassStructure] = useState("Individual")//
    const [lenghtMin, setLenghtMin] = useState("") //
    const [lenghtMax, setLenghtMax] = useState("") //
    const [edLevel, setEdLevel] = useState([])
    const [tools, setTools] = useState([])
    const [homePreparation, setHomePreparation] = useState([])
    const [agenda, setAgenda] = useState([])
    const [links, setLinks] = useState([])
    const [gallery, setGallery] = useState([])

    function switchStructure(e) {
        console.log(e.target.value)
        if (document.getElementById("switch").checked) {
            setClassStructure("Group")
        } else {
            setClassStructure("Individual")
        }
    }

    function HelpsetEdLevel(e) {
        console.log("level", e)
        setEdLevel(e.value)
    }

    return (<>

        <div className="flex gap-1 p-4 flex-wrap">
            <Paper elevation={5} className="p-3 flex flex-col gap-2 text-center font-semibold flex-1 m-auto">

                <div>
                    {/*  <p>nazev aktivity:</p> */}
                    <TextField fullWidth placeholder="Název aktivity" id="nazev" onChange={(e) => { setActivityName(e.target.value) }} /> {/* activityName: */}
                </div>
                <div>
                    {/*  <p>popis aktivity:</p> */} {/* description: */}
                    <TextField fullWidth placeholder="Popis aktivity" id="popis" onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <div>
                    <p>Cíle aktivity:</p> {/* objectives: */}
                    <InputField className="max-w-sm m-auto" setObjectives={setObjectives} />
                </div>
                <div>
                    <p>Potřebné pomůcky:</p>
                    <InputField className="max-w-sm m-auto" setTools={setTools}/>
                </div>
                <div className="flex flex-col items-center">
                    <p>Jedná se o skupinovou aktivitu?</p> {/* classStructure: "Group/Individual" */}
                    <div className="flex"><p>Jednotlivci</p><Switch id="switch" onChange={(e) => { switchStructure(e) }} /><p>Skupina</p></div>
                </div>
                <div className="p-2 bg-prussian-50 flex flex-col gap-2">
                    <NumberInput placeholder="zadej minimální dobu" required min={0} step={1} onChange={(e) => { setLenghtMin(e.target.value) }} />
                    <NumberInput placeholder="zadej maximální dobu" required min={0} step={1} onChange={(e) => { setLenghtMax(e.target.value) }} />

                </div>
                <Autocomplete className='bg-white p-2 rounded-xl'
                    multiple
                    options={[{ label: "Základní škola", data: "primarySchool" }, { label: "Střední škola", data: "secondarySchool" }, { label: "Vysoká škola", data: "highSchool" }]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Vyberte pro jaké školy je aktivita vhodná"
                            placeholder="Úroveň žáka"
                        />
                    )} onChange={(e, value) => {
                        HelpsetEdLevel(value)
                    }} />

            </Paper>
            <Paper elevation={5} className="p-3 text-center flex-1 font-semibold m-auto">
                <div>
                    <p>Domácí příprava:</p>
                    <InputTitleWarnNote setHomePreparation={setHomePreparation}/>
                </div>
                <div>
                    <p>Agenda:</p>
                    <InputDurationTitleDesc setAgenda={setAgenda}/>
                </div>
                <div>
                    <p>Odkazy:</p>
                    <InputTitleUrl setLinks={setLinks}/>
                </div>
            </Paper>
        </div>

        <div className="flex gap-1 p-4 flex-wrap">
            <Paper elevation={5} className="p-3 text-center flex-1 font-semibold m-auto">
                <InputImages setGallery={setGallery}/>

            </Paper>
        </div>

    </>

    )
}

export default CreateActivity;