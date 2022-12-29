import React from "react";
import { ImCross } from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";

type ModalProps = {
    winner: string;
    onNextRound: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function ModalContent({ winner, onNextRound, onClose }: ModalProps) {
    return (
        <dialog
            className="text-center gap-1 absolute left-0 top-[45%] w-full bg-slate-800 pt-5 px-2 grid place-items-center pb-6"
        >
            {winner === "X" && (
                <p className="text-xxsm leading-3 uppercase my-1 text-slate-400 font-semibold tracking-wide">
                    You won!
                </p>
            )}
            {winner === "O" && (
                <p className="text-xxsm leading-3 uppercase my-1 text-slate-400 font-semibold tracking-wide">
                    Cpu won!
                </p>
            )}
            {winner === "" && <p className="text-slate-400 text-xxsm leading-3 uppercase my-1 tracking-wide font-semibold">It's a draw!</p>}
            {winner === "X" && (
                <p className="text-teal-300 flex gap-3 place-items-center pb-3 uppercase text-sm font-medium tracking-wide">
                    <ImCross className="text-md" /> takes the round
                </p>
            )}
            {winner === "O" && (
                <p className="text-teal-300 flex gap-3 leading-3 place-items-center pb-3 uppercase text-sm font-medium tracking-wide">
                    <BsFillRecordCircleFill className="text-md" />
                    takes the round
                </p>
            )}
            <div className="w-full flex gap-3 justify-center">
                <button
                    onClick={onClose}
                    className="bg-indigo-200 text-teal-900 py-1 px-3 rounded-md text-[0.8rem] font-semibold shadow-sm"
                >
                    Quit
                </button>
                <button
                    onClick={onNextRound}
                    className="rounded-md bg-amber-400 text-teal-900 p-1 px-3 text-[0.8rem] font-semibold shadow-sm"
                >
                    Next Round
                </button>
            </div>
        </dialog>
    );
}

export default ModalContent;
/**
 * PurgeCss:
 * bg-amber-400 
 * text-teal-900 
 * bg-indigo-200 
 * text-teal-900 
 * text-teal-300
 */