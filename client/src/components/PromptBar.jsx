import { useState } from "react";


function PromptBar() {

const [responses, setResponses] = useState([]);



    async function sendText() {
        let text = document.getElementById('prompText').value;
        console.log(text)

        if (text) {

            let data = "text: "+text;

            let url = "/api/test"
            try {
                const response = await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(data)
                });
                
                return response.json()
            } catch(error) {
                console.log('chybicka',error)
            }
        }


    }

    async function displayResponse() {

        let response = await sendText().then(
        setResponses(...responses, response)
        )
        console.log(responses)
    }


    return (
        <div className="flex bg-slate-700 text-white-50 p-3 rounded-full w-full gap-3">
            <div className="flex-1"><input type="text" name="text" id="prompText" className="w-full text-black" /></div>
            <div><button type="button" onClick={sendText}>odeslat</button></div>
        </div>
    )
}

export default PromptBar;