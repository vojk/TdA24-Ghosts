import PromptBar from "./PromptBar";


function MainChat() {

    return (
        <div className="w-full bg-slate-400 flex flex-col h-screen overflow-y-scroll">
            <div className="flex-1">

            </div>
            <div className="w-full p-5">
                <PromptBar />
            </div>
        </div>
    )
}

export default MainChat;