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
    MdKeyboardArrowRight, 
    MdKeyboardArrowLeft 
} from "react-icons/md";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { 
    decrementLaneCount,
    deleteJunction, 
    incrementLaneCount, 
    loadJunction, 
    selectJunction, 
    selectJunctions 
} from "@/stores/junctionSlice";
import { copyJunctionURL } from "@/lib/utils";

export default function CreateAndLoadJunction() {
    const junction = useSelector(selectJunction);
    const junctions = useSelector(selectJunctions);
    const dispatch = useDispatch();

    const renderedSavedJunctions = junctions.map(junction => (
        <TableRow key={junction.name}>
            <TableCell className="text-xs text-nowrap font-medium">{junction.name}</TableCell>
            <TableCell className="text-xs text-nowrap text-center">{junction.score}</TableCell>
            <TableCell className="text-xs text-nowrap text-center">
                <button onClick={() => dispatch(loadJunction(junction))}><MdEdit/></button>
            </TableCell>
            <TableCell className="text-xs text-nowrap text-center">
                <button onClick={() => copyJunctionURL(junction)}><FiLink/></button>
            </TableCell>
            <TableCell className="text-xs text-nowrap text-center">
                <button onClick={() => dispatch(deleteJunction(junction.name))}><RiDeleteBin7Fill/></button>
            </TableCell>
        </TableRow>
    ));

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="grow flex flex-col">
                <h2 className="text-xl text-center cap mb-10">Create & Load</h2>
                <div className="w-full h-16 lg:h-20 bg-[#73737320] flex justify-between items-center px-8 rounded lg:rounded-xl mb-8">
                    <button
                        className="h-full"
                        onClick={() => dispatch(decrementLaneCount())}
                    ><MdKeyboardArrowLeft size={"32px"}/></button>
                    <p className="text-xl">{junction.laneCount} lane</p>
                    <button
                        className="h-full"
                        onClick={() => dispatch(incrementLaneCount())}
                    ><MdKeyboardArrowRight size={"32px"}/></button>
                </div>
                {junctions.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="text-xs">name</TableHead>
                            <TableHead className="text-xs text-center">score</TableHead>
                            <TableHead className="text-xs text-center">edit</TableHead>
                            <TableHead className="text-xs text-center">share</TableHead>
                            <TableHead className="text-xs text-center">delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{renderedSavedJunctions}</TableBody>
                    </Table>
                ) : (
                    <p className="grow flex justify-center items-center">No saved junctions</p>
                )}
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Clearing your browser cache will permanently delete any saved junction designs.</p>
        </div>
    )
}