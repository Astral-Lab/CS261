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
    deleteJunction, 
    selectJunctions 
} from "@/stores/junctionSlice";
import { copyJunctionURL } from "@/lib/utils";

export default function CreateAndLoadJunction({ state, dispatch }) {
    const junctions = useSelector(selectJunctions);
    const dispatchStore = useDispatch();

    const renderedSavedJunctions = junctions.map(junction => (
        <TableRow key={junction.name}>
            <TableCell className="text-xs font-medium">{junction.name}</TableCell>
            <TableCell className="text-xs text-center">{junction.score}</TableCell>
            <TableCell className="text-xs text-center">
                <button onClick={() => dispatch({ type: "LOAD_JUNCTION", payload: junction })}><MdEdit/></button>
            </TableCell>
            <TableCell className="text-xs text-center">
                <button onClick={() => copyJunctionURL(junction)}><FiLink/></button>
            </TableCell>
            <TableCell className="text-xs text-center">
                <button onClick={() => dispatchStore(deleteJunction(junction.name))}><RiDeleteBin7Fill/></button>
            </TableCell>
        </TableRow>
    ));

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div>
                <h2 className="text-xl text-center cap mb-10">Create & Load</h2>
                <div className="w-full h-20 bg-[#73737320] flex justify-between items-center px-8 rounded-xl mb-8">
                    <button
                        className="h-full"
                        onClick={() => dispatch({ type: "DECREMENT_LANE_COUNT" })}
                    ><MdKeyboardArrowLeft size={"32px"}/></button>
                    <p className="text-xl">{state.laneCount} lane</p>
                    <button
                        className="h-full"
                        onClick={() => dispatch({ type: "INCREMENT_LANE_COUNT" })}
                    ><MdKeyboardArrowRight size={"32px"}/></button>
                </div>
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
            </div>
            <p className="text-xs italic border-t-[1px] border-[#73737340] pt-8">Clearing your browser cache will permanently delete any saved junction designs.</p>
        </div>
    )
}