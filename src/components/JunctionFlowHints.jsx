import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";

export default function JunctionFlowHints() {
    return (
        <div className="w-full h-full lg:h-auto lg:z-0 bg-white lg:bg-transparent p-8 lg:p-0 lg:px-0 opacity-0 lg:opacity-100 transition-opacity duration-300 group-[:has(:checked)]/hint:opacity-100 group-[:has(:checked)]/hint:z-10 absolute inset-0 lg:static">
            <h2 className="lg:hidden text-center text-2xl mt-8 mb-8">Guide</h2>
            <ul className="w-full h-full flex flex-col gap-6 lg:py-8 lg:border-y-[1px] border-[#73737340] text-sm">
                <li>1. (<RiAddLine size={"12px"} className="inline"/>) Create, load, and manage junction designs in the junction menu.</li>
                <li>2. (<IoMdPlay size={"12px"} className="inline"/>) View how traffic flows into junctions in realtime using the simulation feature.</li>
                <li>3. (<IoStatsChart size={"12px"} className="inline"/>) Analyse junction performance and view metrics such as overall score, queue time, and wait time.</li>
                <li>4. (<IoSaveSharp size={"12px"} className="inline"/>) Save and name junction designs for future analysis. Easily share designs via the shareable link feature.</li>
            </ul>
        </div>
    )
}