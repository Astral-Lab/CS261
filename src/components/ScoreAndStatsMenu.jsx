import { FaStar } from "react-icons/fa";

// label vph left turn max queue avg queue wait
export default function ScoreAndStatsMenu() {
    return (
        <div className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <h2 className="text-xl text-center cap mb-10">Score & Stats</h2>
            </div>
            <div className="w-full grow flex flex-col items-center gap-8">
                <div>
                    <p className="text-5xl mb-2 text-blue-400">17,234</p>
                    <div className="flex justify-center items-center gap-1">
                        <FaStar size={"12px"} className="inline"/>
                        <p>score</p>
                    </div>
                </div>
                <ul className="w-full flex justify-between border-b-[1px] border-[#73737340] pb-12">
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">43s</p>
                        <p className="text-xs">avg wait</p>
                    </li>
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">83s</p>
                        <p className="text-xs">max wait</p>
                    </li>
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">74m</p>
                        <p className="text-xs">avg queue</p>
                    </li>
                </ul>
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Junction metrics generated are based on simulated data. Real-world conditions may vary due to factors such as weather, traffic volume, and driver behavior.</p>
        </div>
    )
}