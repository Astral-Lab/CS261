import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { 
    deleteJunction, 
    selectJunctions 
} from "@/stores/junctionSlice";
import { copyJunctionURL } from "@/lib/utils";

export default function CreateAndLoadJunction() {
    const junctions = useSelector(selectJunctions);
    const dispatch = useDispatch();

    const renderedSavedJunctions = junctions.map(junction => (
        <TableRow key={junction.name}>
            <TableCell className="font-medium">{junction.name}</TableCell>
            <TableCell className="flex items-center gap-2">{junction.score}</TableCell>
            <TableCell className="text-center">
                <button onClick={() => null}><MdEdit/></button>
            </TableCell>
            <TableCell className="text-center">
                <button onClick={() => copyJunctionURL(junction)}><FiLink/></button>
            </TableCell>
            <TableCell className="text-center">
                <button onClick={() => dispatch(deleteJunction(junction.name))}><RiDeleteBin7Fill/></button>
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