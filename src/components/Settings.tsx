import { IoSettings } from "react-icons/io5";
import { useState } from "react";
import { createPortal } from "react-dom";

type settingProps = {
    onSetMode: (item: string) => void;
    mode: string;
};
function Settings({ onSetMode, mode }: settingProps) {
    const [isEditing, setEditing] = useState(false);
    const handleSettings = () => {
        setEditing((prev) => !prev);
    };
    let styleButton1 = {};
    let styleButton2 = {};
    if (isEditing && mode === "PvP") {
        styleButton1 = {
            backgroundColor: "rgb(245,158,11)",
        };
    }
    if (isEditing && mode === "PvB") {
        styleButton2 = {
            backgroundColor: "rgb(245,158,11)",
        };
    }
    return (
        <>
            <div className="fixed top-6 right-6 flex z-50">
                <div className="bg-teal-500 h-10 w-10 scale-[0.75] rounded-[50%] animate-ping"></div>
                <IoSettings
                    className="absolute top-3 left-3 transition-transform hover:rotate-45 hover:cursor-pointer scale-[2] xl:scale-[2.5] text-teal-100"
                    onClick={handleSettings}
                />
            </div>

            {isEditing &&
                createPortal(
                    <section className="absolute inset-0 bg-[rgba(0,0,0,0.07)] backdrop-blur-md clip-circle flex flex-col flex-1 justify-center gap-[2.5rem] sm:items-end">
                        <h1 className="text-xl w-full text-center text-slate-300 sm:text-right sm:pr-8">
                            Choose Mode
                        </h1>
                        <div className="flex flex-col gap-5 justify-center items-center sm:justify-end sm:pr-8">
                            <button
                                className="px-6 py-2 rounded-md bg-slate-500 text-sm font-extralight hover:scale-110"
                                style={styleButton1}
                                onClick={() => {
                                    onSetMode("PvP");
                                }}
                            >
                                Player<img alt="battle-logo" className="inline-block w-4 h-4 mx-2" src={"./battle.png"} />Player
                            </button>
                            <button
                                className="px-6 py-2 rounded-md bg-slate-500 text-sm font-extralight hover:scale-110"
                                style={styleButton2}
                                onClick={() => {
                                    onSetMode("PvB");
                                }}
                            >
                                Player<img alt="battle-logo" className="inline-block w-4 h-4 mx-2" src={"./battle.png"} />Bot
                            </button>
                        </div>
                    </section>,
                    document.body
                )}
        </>
    );
}

export default Settings;
