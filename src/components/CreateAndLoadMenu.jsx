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

const junctions = [
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 2",
        score: 4343,
    },
    {
        name: "junction 3",
        score: 4343,
    },
    {
        name: "junction 4",
        score: 4343,
    },
    {
        name: "junction 5",
        score: 4343,
    },

]

// select junction designs from redux...
// add score to each junction...
// create custom colors in config file...

export default function CreateAndLoadJunction() {

    return (
        <div>
            <div className="">
            <h2 className="text-xl text-center cap mb-10">load junction</h2>
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
                    <TableBody>
                        {junctions.map((junction) => (
                        <TableRow key={junction.name}>
                            <TableCell className="font-medium">{junction.name}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                
                                {junction.score}
                            </TableCell>
                            <TableCell className="text-right">
                                <button >
                                    load
                                </button>
                            </TableCell>
                            <TableCell className="text-right">
                                <button >
                                    share
                                </button>
                            </TableCell>
                            <TableCell className="text-right">
                                <button >
                                    delete
                                </button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Clearing your browser cache will permanently delete any saved junction designs.</p>
        </div>
    )
}