import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { 
    computeAverageQueueLength, 
    computeAverageQueueTime, 
    computeJunctionScore, 
    computeMaxQueueTime, 
    computeTotalAverageQueueLength, 
    computeTotalAverageQueueTime,
    computeTotalMaxQueueTime
} from "@/lib/utils";
import { selectJunction } from "@/stores/junctionSlice";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ScoreAndStatsMenu() {
    const junction = useSelector(selectJunction);

    const renderedLaneStats = junction.lanes.map(lane => (
        <TableRow key={lane.label}>
            <TableCell className="text-xs font-medium">{lane.label}</TableCell>
            <TableCell className="text-xs ">{lane.vph}</TableCell>
            <TableCell className="text-xs text-center">{computeAverageQueueTime(lane)}s</TableCell>
            <TableCell className="text-xs text-center">{computeMaxQueueTime(lane)}s</TableCell>
            <TableCell className="text-xs text-center">{computeAverageQueueLength(lane)}m</TableCell>
        </TableRow>
    ));

    return (
        <div className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <h2 className="text-xl text-center cap mb-10">Score & Stats</h2>
            </div>
            <div className="w-full grow flex flex-col items-center gap-8">
                <div>
                    <p className="text-5xl mb-2 text-blue-400">{computeJunctionScore(junction)}</p>
                    <div className="flex justify-center items-center gap-1">
                        <FaStar size={"12px"} className="inline"/>
                        <p>score</p>
                    </div>
                </div>
                <ul className="w-full flex justify-between border-[#73737340]">
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">{computeTotalAverageQueueTime(junction)}s</p>
                        <p className="text-xs">avg wait</p>
                    </li>
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">{computeTotalMaxQueueTime(junction)}s</p>
                        <p className="text-xs">max wait</p>
                    </li>
                    <li className="w-1/3 text-center">
                        <p className="text-3xl">{computeTotalAverageQueueLength(junction)}m</p>
                        <p className="text-xs">avg queue</p>
                    </li>
                </ul>
                <Table className="mb-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">lane</TableHead>
                            <TableHead className="text-xs">vph</TableHead>
                            <TableHead className="text-xs text-right">avg wait</TableHead>
                            <TableHead className="text-xs text-right">max wait</TableHead>
                            <TableHead className="text-xs text-right">avg queue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderedLaneStats}</TableBody>
                </Table>
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Junction metrics generated are based on simulated data. Real-world conditions may vary due to factors such as weather, traffic volume, and driver behavior.</p>
        </div>
    )
}