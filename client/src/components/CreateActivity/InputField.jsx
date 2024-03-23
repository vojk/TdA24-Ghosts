import { TextField } from "@mui/material"
import { useState, useEffect } from "react"

//simple string array
export default function InputField({className}) {
    const [inputs, setInputs] = useState([""]) //všechny inputy zde

    
    

    const handleAddInput = () => {
        setInputs([...inputs, ""])
    }

    const handleChange = (event, index) => {
        let { name, value } = event.target
        let onChangeValue = [...inputs]
        onChangeValue[index] = value
        setInputs(onChangeValue)
        console.log(inputs)
    }

    const handleDeleteInput = (index) => {
        const newArray = [...inputs]
        newArray.splice(index, 1)
        setInputs(newArray)
    }
    return (
        <div className={className}>
        <div className="bg-prussian-50 p-2 rounded-sm flex flex-col gap-2">
            {inputs.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <input name="value" type="text" value={item} onChange={(event) => handleChange(event, index)} />
                    {inputs.length > 1 && (
                        <button onClick={() => handleDeleteInput(index)} className="text-white-50">Odebrat</button>
                    )}
                    {index === inputs.length - 1 && (
                        <button onClick={() => handleAddInput()} className="text-white-50">Přidat</button>
                    )}
                </div>
            ))}
        </div></div>
    )
}