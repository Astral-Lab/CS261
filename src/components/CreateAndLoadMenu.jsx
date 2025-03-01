import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoUnlinkSharp } from "react-icons/io5";
import { TbHttpDelete } from "react-icons/tb";
import { useSelector } from "react-redux";
import { selectJunctions } from "@/stores/junctionSlice";

export default function CreateAndLoadJunction() {
    const junctions = useSelector(selectJunctions);

    console.log(junctions)

    const renderedSavedJunctions = junctions.map(junction => (
        <TableRow key={junction.name}>
            <TableCell className="font-medium">{junction.name}</TableCell>
            <TableCell className="flex items-center gap-2">{junction.score}</TableCell>
            <TableCell className="text-right">
                <button
                    className=""
                    onClick={null}
                >load</button>
            </TableCell>
            <TableCell className="text-right">
                <button
                    className=""
                    onClick={null}
                >share</button>
            </TableCell>
            <TableCell className="text-right">
                <button
                    className=""
                    onClick={null}
                >delete</button>
            </TableCell>
        </TableRow>
    ));

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div>
                <h2 className="text-xl text-center cap mb-10">Create & Load</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[120px]">name</TableHead>
                        <TableHead className="w-[100px]">score</TableHead>
                        <TableHead className="text-right">edit</TableHead>
                        <TableHead className="text-right">share</TableHead>
                        <TableHead className="text-right">delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{renderedSavedJunctions}</TableBody>
                </Table>
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Clearing your browser cache will permanently delete any saved junction designs.</p>
        </div>
    )
}