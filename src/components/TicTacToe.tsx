import { ImCross } from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";

const AI = "O";
const Human = "X";
const empty = " ";
type inputArray = {
    arr: string[];
    handleEntry: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function TicTacToe({ arr, handleEntry }: inputArray) {

    return (
        <section className="container grid gap-3 xl:gap-4 grid-cols-3 grid-rows-3 w-80 xl:w-[400px] xl:h-[400px]">
            {arr.map((item, index) => {
                let styles = {};
                if (item === "X") {
                    styles = {
                        color: "#17BEBB",
                    };
                } else if (item === "O") {
                    styles = {
                        color: "#FEC601",
                    };
                }
                return (
                    <button
                        key={index}
                        style={styles}
                        data-key={index}
                        className="h-24 shadow-md text-xxl focus:outline-none rounded-md xl:h-auto input grid place-items-center"
                        onClick={handleEntry}
                    >
                        {item === empty && <> </>}
                        {item === Human && <ImCross />}
                        {item === AI && <BsFillRecordCircleFill />}
                    </button>
                );
            })}
        </section>
    )
}

export default TicTacToe