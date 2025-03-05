import { 
    Handle,
    Position
} from "@xyflow/react";
import { FaCarAlt } from "react-icons/fa";
import { 
    MAX_ARRIVAL_RATE, 
    MIN_ARRIVAL_RATE,
    HANDLE_STYLES
} from "@/lib/config";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { 
    changeLaneVph,
    selectLaneById,
    selectSimulationQueueSizeById
} from "@/stores/junctionSlice";
import { Slider } from "./ui/slider";

export default function JunctionLaneNode(props) {
    const lane = useSelector(state => selectLaneById(state, props.data?.label));
    const queueSize = useSelector(state => selectSimulationQueueSizeById(state, props.data?.label));
    const dispatch = useDispatch();

    return (
        <>
            <Handle 
                type="source" 
                position={Position[props.data.handleLocation]}
                style={HANDLE_STYLES}
            />
            <div className={`w-[500px] bg-white rounded-2xl shadow-xs overflow-hidden pb-4 border-[1px] border-white`}>
                <div className="w-full flex justify-between items-center px-6 py-4 bg-[#F9F9F9] border-b-[1px] border-[#F0F0F0]">
                    <div className="flex items-center gap-2">
                        <FaCarAlt size={"18px"}/>
                        <p className="font-bold">{props.data.label}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-[#E0E0E0] rounded-full"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 px-6 p-4">
                    <p >This node will forward cars to the junction.</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">vph <span className="text-[#E0E0E0]">({lane?.vph})</span></label>
                        <p >the vehicles per hour arriving at the junction</p>
                        <Slider
                            className="nodrag nopan"
                            min={MIN_ARRIVAL_RATE}
                            max={MAX_ARRIVAL_RATE}
                            step={1}
                            value={[lane?.vph]}
                            onValueChange={([value]) => dispatch(changeLaneVph({ value, label: props.data?.label }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">simulation queue <span className="text-[#E0E0E0]">({queueSize})</span></label>
                        <p className="">the number of vehicles in the lane queue</p>
                        <div className="w-full h-2 rounded-full bg-[#E0E0E0] mt-1 overflow-hidden">
                            <div className="h-full bg-blue-400" style={{ width: `${(Math.floor(queueSize)/100) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}