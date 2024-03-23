import { TextField, duration } from "@mui/material"
import { useState, useEffect } from "react"

export default function InputDurationTitleDesc({setAgenda}) {
    const [inputs, setInputs] = useState([{ duration: null, title: "", description: "" }]) //všechny inputy zde

    const [titles, setTitles] = useState([""])
    const [durations, setDurations] = useState([""])
    const [descriptions, setDescriptions] = useState([""])

    console.log(titles, durations, descriptions)

    useEffect(() => {
        inputs.map((item, index) => (
            item.title = titles[index],
            item.description = descriptions[index],
            item.duration = durations[index]
        ))
    }, [titles, durations, descriptions])



    const handleAddInput = () => {
        setInputs([...inputs, { duration: null, title: "", description: "" }])
    }
    console.log(inputs)

    const handleDeleteInput = (index) => {
        const newTitles = [...titles]
        const newDurations = [...durations]
        const newDescriptions = [...descriptions]
        const newInputs = [...inputs]
        newTitles.splice(index, 1)
        newDurations.splice(index, 1)
        newDescriptions.splice(index, 1)
        newInputs.splice(index, 1)
        setTitles(newTitles)
        setDurations(newDurations)
        setDescriptions(newDescriptions)
        setInputs(newInputs)
    }

    const handleChange = (event, index, type, setType) => {
        let { name, value } = event.target
        if (value === "undefined") {
            let value = ""
        } else if (type === "durations") {
            let value = null
        }
        let onChangeValue = [...type]
        onChangeValue[index] = value
        setType(onChangeValue)
        console.log(inputs)
    }


    return (
        <div className="rounded-sm">{inputs.map((item, index) => (
            <div key={index} className="bg-prussian-50 rounded-lg p-2 flex flex-col gap-2 border-b-2">
                <div className="flex gap-2">
                    {/* TODO: při smazání předchozího výběru zůstane možnost viditelná, pokud v následujícím výběru možnost chybí, TLDR: v arrayi už není, ale v html se zobrazuje */}
                    <TextField id={"multi" + index} onChange={(event) => handleChange(event, index, titles, setTitles)} label="Nadpis" required value={titles[index]} sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", /* border */
                                borderWidth: "2px",
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            },

                            "& .MuiInputLabel-outlined": {
                                color: "white",
                                fontWeight: "bold",
                                "&.Mui-focused": {
                                    color: "white",
                                    fontWeight: "bold",
                                },
                            },
                        }
                    }} InputLabelProps={{
                        sx: { color: "#cacaca", "&.Mui-focused": { color: "#FECB2E" } },
                    }} />
                    <TextField id={"multi" + index} onChange={(event) => handleChange(event, index, durations, setDurations)} label="Doba trvání (min)" required value={durations[index]} sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: "2px",
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            },

                            "& .MuiInputLabel-outlined": {
                                color: "white",
                                fontWeight: "bold",
                                "&.Mui-focused": {
                                    color: "white",
                                    fontWeight: "bold",
                                },
                            },
                        }
                    }} InputLabelProps={{
                        sx: { color: "#cacaca", "&.Mui-focused": { color: "#FECB2E" } },
                    }} />
                    <TextField id={"multi" + index} onChange={(event) => handleChange(event, index, descriptions, setDescriptions)} label="Popis" multiline value={descriptions[index]} sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                                borderWidth: "2px",
                            },
                            "&:hover:not(.Mui-focused)": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            },

                            "& .MuiInputLabel-outlined": {
                                color: "white",
                                fontWeight: "bold",
                                "&.Mui-focused": {
                                    color: "white",
                                    fontWeight: "bold",
                                },
                            },
                        }
                    }} InputLabelProps={{
                        sx: { color: "#cacaca", "&.Mui-focused": { color: "#FECB2E" } },
                    }} />
                </div>
                {inputs.length > 1 && (
                    <button onClick={() => handleDeleteInput(index)} className="text-white-50">Odebrat</button>
                )}
                {index === inputs.length - 1 && (
                    <button onClick={() => handleAddInput()} className="text-white-50">Přidat</button>
                )}
            </div>))}</div>

    )
}
