import { TextField } from "@mui/material"
import { useState, useEffect } from "react"

export default function InputImages({setGallery}) {
    const [inputs, setInputs] = useState([{ title: "", images: [{ lowRes: "", highRes: "" }] }]) //všechny inputy zde
    useEffect(() => {
        setGallery(inputs)
    }, [inputs])
    const [titles, setTitles] = useState([""])
    const [images, setImages] = useState([{}])

    console.log(inputs)



    function addMore(collectionIndex, imageIndex) {//pridani dalsiho obrazku
        let addThis = [...inputs]
        addThis[collectionIndex].images.splice(imageIndex, 0, { lowRes: "", highRes: "" });
        console.log("a", addThis)
        setInputs(addThis)
    }

    const handleChangeObrazek = (event, index, indexObrazku, type) => {
        let { name, value } = event.target
        if (value === "undefined") {
            let value = ""
        }

        let onChangeValue = [...inputs]

        if (type == "lowRes") {
            onChangeValue[index].images[indexObrazku].lowRes = value
        } else {
            onChangeValue[index].images[indexObrazku].highRes = value
        }
        setInputs(onChangeValue)
    }


    const handleChange = (event, index) => { //handle pro title
        let { name, value } = event.target
        if (value === "undefined") {
            let value = ""
        }
        let onChangeValue = [...inputs]
        onChangeValue[index].title = value;
        setInputs(onChangeValue)
        console.log("inputs", inputs)
    }

    const handleAddInput = () => { //prida sadu
        setInputs([...inputs, { title: "", images: [{ lowRes: "", highRes: "" }] }])
    }

    const handleDeleteInput = (index) => {
        let onChangeValue = [...inputs]
        onChangeValue.splice(index, 1)
        setInputs(onChangeValue)
    }
    const handleDeleteImage = (index, indexObrazku) => {
        let onChangeValue = [...inputs]
        onChangeValue[index].images.splice(indexObrazku, 1)
        setInputs(onChangeValue)
    }

    return (
        <div>
            <div className="rounded-sm">{inputs.map((item, index) => (
                <div key={index} className="bg-jet-50 rounded-lg p-2 flex gap-2">
                    <div className="flex flex-col gap-2">

                        <TextField id={"multi1" + index} onChange={(event) => handleChange(event, index, "title", setInputs)} label="Nadpis" value={inputs[index].title} sx={{
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

                        {inputs[index].images.map((data, indexObrazku) => (<div className="flex gap-2">
                            <TextField id={"multi2" + index} label="Odkaz na nižší rozlišení" required onChange={(event) => handleChangeObrazek(event, index, indexObrazku, "lowRes")} value={inputs[index].images[indexObrazku].lowRes} sx={{
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
                            <TextField id={"multi3" + index} label="Odkaz na vyšší rozlišení" required onChange={(event) => handleChangeObrazek(event, index, indexObrazku, "highRes")} value={inputs[index].images[indexObrazku].highRes} sx={{
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

                            {inputs[index].images.length > 1 && (
                                <button onClick={() => handleDeleteImage(index, indexObrazku)} className="text-white-50 bg-sunglow-50 h-fit p-2 rounded-md">Odebrat obrázek</button>
                            )}
                            {indexObrazku === inputs[index].images.length - 1 && (
                                <button onClick={() => { addMore(index, indexObrazku) }} className="text-white-50 bg-sunglow-50 h-fit p-2 rounded-md">Přidat obrázek</button>
                            )}
                        </div>))}

                    </div>
                    {inputs.length > 1 && (
                        <button onClick={() => handleDeleteInput(index)} className="text-white-50 bg-sky-50 h-fit p-2 rounded-md">Odebrat album</button>
                    )}
                    {index === inputs.length - 1 && (
                        <>  <button onClick={() => { handleAddInput() }} className="text-white-50 bg-sky-50 h-fit p-2 rounded-md">Přidat album</button>
                        </>
                    )}
                </div>))}</div>


        </div>
    )




    /*     useEffect(() => {
            inputs.map((item, index) => (
                item.title = titles[index],
                item.images = images[index]
            ))
        }, [titles, images])
    
    
    
        const handleAddInput = () => {
            setInputs([...inputs, { title: "", images: [{ lowRes: "", highRes: "" }] }])
        }
    
        const handleAddImages = (index) => {
            let onChangeValue = [...images]
            onChangeValue[index] += { lowRes: "", highRes: "" }
            setImages([onChangeValue])
        }
    
    
        console.log(inputs)
    
        const handleDeleteInput = (index) => {
            const newTitles = [...titles]
            const newImages = [...images]
    
            const newInputs = [...inputs]
            newTitles.splice(index, 1)
            newImages.splice(index, 1)
    
            newInputs.splice(index, 1)
            setTitles(newTitles)
            setImages(newImages)
    
            setInputs(newInputs)
        }
    
        const handleChange = (event, index, type, setType) => {
            let { name, value } = event.target
            if (value === "undefined") {
                let value = ""
            }
            let onChangeValue = [...type]
            onChangeValue[index] = value
            setType(onChangeValue)
            console.log(inputs)
        }
    
    
    
        return (
            <div className="rounded-sm">{inputs.map((item, index) => (
                <div key={index} className="bg-prussian-50 p-2 flex gap-2">
                    <div className="flex flex-col gap-2">
                        
                        <TextField id={"multi1" + index} onChange={(event) => handleChange(event, index, titles, setTitles)} label="Nadpis" value={titles[index]} sx={{
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
                            sx: { color: "white", "&.Mui-focused": { color: "#FECB2E" } },
                        }} />
    
                        {inputs[index].images.map((data, index) => (<div>
                            <TextField id={"multi2" + index} onChange={(event) => handleChange(event, index, images, setImages)} label="lowRes" value={data.lowRes} sx={{
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
                                sx: { color: "white", "&.Mui-focused": { color: "#FECB2E" } },
                            }} />
                            <TextField id={"multi3" + index} onChange={(event) => handleChange(event, index, images, setImages)} label="highRes" value={data.highRes} sx={{
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
                                sx: { color: "white", "&.Mui-focused": { color: "#FECB2E" } },
                            }} />
                        </div>))}
    
                    </div>
                    {inputs.length > 1 && (
                        <button onClick={() => handleDeleteInput(index)} className="text-white-50">Odebrat</button>
                    )}
                    {index === inputs.length - 1 && (
                        <>  <button onClick={() => { handleAddInput() }} className="text-white-50">Přidat sadu</button>
                            <button onClick={() => { handleAddImages(index) }} className="text-white-50">Přidat obrázek</button> </>
                    )}
                </div>))}</div>
    
        ) */
} 