import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { 
    computeAverageQueueTime, 
    computeJunctionScore, 
    computeMaxQueueLength, 
    computeMaxQueueTime, 
    getLightPriorityPercentage
} from "@/lib/utils";
import { selectJunction } from "@/stores/junctionSlice";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ScoreAndStatsMenu() {
    const junction = useSelector(selectJunction);
    const renderedLaneStats = junction.lanes.map(lane => (
        <TableRow key={lane.label}>
            <TableCell className="text-xs font-medium">{lane.label}</TableCell>
            <TableCell className="text-xs">{lane.vph}</TableCell>
            <TableCell className="text-xs text-center">{computeAverageQueueTime(lane, junction)}s</TableCell>
            <TableCell className="text-xs text-center">{computeMaxQueueTime(lane, junction)}s</TableCell>
            <TableCell className="text-xs text-center">{computeMaxQueueLength(lane, junction)}m</TableCell>
        </TableRow>
    ));

    return (
        <div className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <h2 className="text-xl text-center cap mb-10">Score & Stats</h2>
            </div>
            <div className="w-full grow flex flex-col items-center gap-8">
                <div>
                    <p className="text-5xl text-center mb-2 text-blue-400">{computeJunctionScore(junction)}</p>
                    <div className="flex justify-center items-center gap-1">
                        <FaStar size={"12px"} className="inline"/>
                        <p>score</p>
                    </div>
                </div>
                <ul className="w-full flex justify-center gap-16 border-[#73737340]">
                    <li className="text-center">
                        <p className="text-3xl">{junction.laneCount}</p>
                        <p className="text-xs">lane count</p>
                    </li>
                    <li className="text-center">
                        <p className="text-3xl">{junction.lightDuration}s</p>
                        <p className="text-xs">cycle length</p>
                    </li>
                </ul>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">lane</TableHead>
                            <TableHead className="text-xs w-[70px]">vph</TableHead>
                            <TableHead className="text-xs text-right">avg wait</TableHead>
                            <TableHead className="text-xs text-right">max wait</TableHead>
                            <TableHead className="text-xs text-right">avg queue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderedLaneStats}</TableBody>
                </Table>
                <div className="w-full">
                    <p className="mb-4 text-center">light priorities</p>
                    <div className="w-full h-4 flex bg-[#E0E0E0] mb-12">
                        <div className="h-full bg-blue-300 relative" style={{ width: `${getLightPriorityPercentage(junction.lightPriority, 0)}%` }}>
                            <p className="text-xs absolute -bottom-6 w-full text-center">North</p>
                        </div>
                        <div className="h-full bg-blue-400 relative" style={{ width: `${getLightPriorityPercentage(junction.lightPriority, 1)}%` }}>
                            <p className="text-xs absolute -bottom-6 w-full text-center">East</p>
                        </div>
                        <div className="h-full bg-blue-500 relative" style={{ width: `${getLightPriorityPercentage(junction.lightPriority, 2)}%` }}>
                            <p className="text-xs absolute -bottom-6 w-full text-center">South</p>
                        </div>
                        <div className="h-full bg-blue-600 relative" style={{ width: `${getLightPriorityPercentage(junction.lightPriority, 3)}%` }}>
                            <p className="text-xs absolute -bottom-6 w-full text-center">West</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Junction metrics generated are based on simulated data. Real-world conditions may vary due to factors such as weather, traffic volume, and driver behavior.</p>
        </div>
    )
}