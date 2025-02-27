import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";

export default function JunctionFlowHints() {
    return (
        <ul className="w-full flex flex-col gap-6 border-y-[1px] border-black py-8 text-sm">
            <li>1. Create, load, and manage junction designs in the junction menu.</li>
            <li>2. View how traffic flows into junctions in realtime using the simulation feature.</li>
            <li>3. Analyse junction performance and view metrics such as overall score, queue time, and wait time.</li>
            <li>4. Save and name junction designs for future analysis. Easily share designs via the shareable link feature.</li>
        </ul>
    )
}