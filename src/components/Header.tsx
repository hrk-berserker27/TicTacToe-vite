import { ImCross } from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

type header = {
    turn: number;
    handleReset: () => void;
    playerA: string;//Human
    playerB: string;//AI
}

function Header({ turn, handleReset, playerA, playerB }: header) {
    return (
        <header className="grid grid-cols-3 grid-rows-1 place-items-center my-3">
            <div className="pl-2 flex gap-1 my-4 xl:my-3 mr-10">
                <span className="text-base xl:text-md text-teal-400">
                    <ImCross />
                </span>
                <span className="text-base xl:text-md text-amber-500">
                    <BsFillRecordCircleFill />
                </span>
            </div>
            <div className="turn container flex gap-2 shadow-sm justify-center align-middle text-sm py-2 rounded-md font-medium mr-4 ml-3 xl:mx-0">
                {turn % 2 ? playerA : playerB /*This term rotates between 0 and 1*/}
                <span className="uppercase text-xsm font-bold tracking-widest leading-[1.7rem]">
                    turn
                </span>
            </div>
            <button
                className="reset w-50 rounded-md p-2 translate-x-7 xl:translate-x-9"
                onClick={handleReset}
            >
                <GrPowerReset />
            </button>
        </header>
    )
}

export default Header