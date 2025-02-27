import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
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
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    {
        name: "junction 1",
        score: 4343,
    },
    
]

export default function CreateAndLoadJunction() {
    // select junction designs from redux...
    // add score to each junction...

    return (
        <div className="w-[500px] h-full bg-[#FAfAFA] absolute top-0 right-0 z-10 p-10 pt-16 flex flex-col justify-between">
            <div className="">
            <h2 className="text-xl text-center cap mb-10">load junction</h2>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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