type scoreProps = {
    score: number[]
}
function Scoreboard({ score }: scoreProps) {
    return (
        <footer className="grid gap-3 grid-cols-3 grid-rows-1 my-6">
            <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 bg-teal-500 rounded-md score leading-3 text-base pb-3">
                <h1 className="text-xxsm pt-[0.2rem]">X(You)</h1>
                {score[0]}
            </div>
            <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 rounded-md reset score leading-3 text-base pb-3">
                <h1 className="text-xxsm pt-[0.2rem]">Ties</h1>
                {score[2]}
            </div>
            <div className="grid gap-3 grid-rows-2 text-center font-bold py-2 rounded-md bg-amber-500 score leading-3 text-base pb-3">
                <h1 className="text-xxsm pt-[0.2rem]">O(CPU)</h1>
                {score[1]}
            </div>
        </footer>
    )
}

export default Scoreboard