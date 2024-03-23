import { TextField } from "@mui/material"
import { useState, useEffect } from "react"

export default function InputTitleWarnNote({setLinks}) {
    const [inputs, setInputs] = useState([{title:"", url:""}]) //všechny inputy zde

    const [titles, setTitles] = useState([""])
    const [urls, setUrls] = useState([""])


    console.log(titles, urls)

    useEffect(() => {
        inputs.map((item, index) => (
            item.title = titles[index],
            item.url = urls[index]
        )) 
    }, [titles, urls])



    const handleAddInput = () => {
        setInputs([...inputs, {title:"", url:""}])
    }
    console.log(inputs)

    const handleDeleteInput = (index) => {
        const newTitles = [...titles]
        const newUrls = [...urls]

        const newInputs = [...inputs]
        newTitles.splice(index, 1)
        newUrls.splice(index, 1)

        newInputs.splice(index, 1)
        setTitles(newTitles)
        setUrls(newUrls)

        setInputs(newInputs)
    }

    const handleChange = (event, index, type, setType) => {
        let { name, value } = event.target
        if (value === "undefined") {
            let value = ""
        }//jen tak pro jistotku
        let onChangeValue = [...type]
        onChangeValue[index] = value
        setType(onChangeValue)
        console.log(inputs)
    }


    return (
        <div className="rounded-sm">{inputs.map((item, index) => (
            <div key={index} className="bg-prussian-50 p-2 flex rounded-lg flex-col gap-2 border-b-2">
                <div className="flex gap-2">
                    {/* TODO: při smazání předchozího výběru zůstane možnost viditelná, pokud v následujícím výběru možnost chybí, TLDR: v arrayi už není, ale v html se zobrazuje */}
                    <TextField id={"multi"+index} onChange={(event) => handleChange(event, index, titles, setTitles)} label="Název" value={titles[index]} sx={{
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
                    <TextField id={"multi"+index} onChange={(event) => handleChange(event, index, urls, setUrls)} label="URL" className="flex-1" value={urls[index]} sx={{
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
