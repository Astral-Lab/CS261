import { 
    Handle,
    Position
} from "@xyflow/react";
import { HANDLE_STYLES } from "@/lib/config";
import { MdTraffic } from "react-icons/md";
import clsx from "clsx";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { 
    changeLightDuration, 
    changeLightPriority, 
    selectJunction 
} from "@/stores/junctionSlice";
import { 
    MdKeyboardArrowRight, 
    MdKeyboardArrowLeft 
} from "react-icons/md";

export default function JunctionIntersectionNode(props) {
    const junction = useSelector(selectJunction);
    const dispatch = useDispatch();
    const laneCount = props.data.laneCount;
    const handleLocation = ["Top", "Right", "Bottom", "Left"];
    const renderedHandles = [];
    
    // creates the handles that the edges attach to
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < props.data.laneCount; j++) {
            renderedHandles.push(
                <Handle
                    key={`handle-${i+1}:${j+1}`}
                    id={`handle-${i+1}:${j+1}`}
                    type="target"
                    position={Position[handleLocation[i]]}
                    style={{
                        ...HANDLE_STYLES,
                        transform: "none",
                        position: "relative",
                        left: 0
                    }}
                />
            );
        }
    }

    const renderedLightPriorityButtons = junction.lightPriority.map((p, i)=> (
        <li key={i} className="w-full h-12 rounded-lg bg-[#E0E0E0] flex justify-between items-center px-4">
            <button
                className="grow h-full flex justify-start items-center"
                onClick={() => dispatch(changeLightPriority({ light: i, value: (junction.lightPriority[i] - 1) || 5  }))}
            ><MdKeyboardArrowLeft size={"16px"}/></button>
            <div className="w-3/5">
                <p className="text-xs text-center">{junction.lightPriority[i] - 1}</p>
                <p className="text-[10px] text-center">{["north", "east", "south", "west"][i]}</p>
            </div>
            <button
                className="grow h-full flex justify-end items-center"
                onClick={() => dispatch(changeLightPriority({ light: i, value: (junction.lightPriority[i] % 5) + 1 }))}
            ><MdKeyboardArrowRight size={"16px"}/></button>
        </li>
    ));

    return (
        <>
            <div className="w-[500px] aspect-square bg-white rounded-2xl shadow-xs relative">
                <div className="w-full flex items-center gap-2 px-6 py-4 bg-[#F9F9F9] rounded-t-2xl border-b-[1px] border-[#F0F0F0]">
                    <MdTraffic size={"20px"}/>
                    <p className="font-bold">Junction</p>
                </div>
                <div className="flex flex-col gap-8 px-6 p-4">
                    <p className="">This node consumes traffic flow and controls the traffic light cycle.</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">duration <span className="text-[#E0E0E0]">({junction.lightDuration}s)</span></label>
                        <p className="">the number of seconds in a traffic cycle</p>
                        <div className="w-full flex gap-2 nodrag nopan">
                            <button 
                                className={clsx(
                                    "w-1/3 h-12 rounded-lg mt-1",
                                    {
                                        "bg-blue-400": junction.lightDuration === 60,
                                        "bg-[#E0E0E0]": junction.lightDuration !== 60
                                    }
                                )}
                                onClick={() => dispatch(changeLightDuration(60))}
                            >60</button>
                            <button 
                                className={clsx(
                                    "w-1/3 h-12 rounded-lg mt-1",
                                    {
                                        "bg-blue-400": junction.lightDuration === 90,
                                        "bg-[#E0E0E0]": junction.lightDuration !== 90
                                    }
                                )}
                                onClick={() => dispatch(changeLightDuration(90))}
                            >90</button>
                            <button 
                                className={clsx(
                                    "w-1/3 h-12 rounded-lg mt-1",
                                    {
                                        "bg-blue-400": junction.lightDuration === 120,
                                        "bg-[#E0E0E0]": junction.lightDuration !== 120
                                    }
                                )}
                                onClick={() => dispatch(changeLightDuration(120))}
                            >120</button>
                        </div>
                    </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">priority</label>
                    <p className="">the ratio each side has of a light cycle</p>
                    <ul className="w-full grid grid-cols-2 gap-2 nodrag nopan">{renderedLightPriorityButtons}</ul>
                </div>
                </div>
                <div className="w-full flex justify-center gap-2 absolute -top-[10px]">
                    {renderedHandles.slice(0, 1 * laneCount)}
                </div>
                <div className="w-full flex justify-center gap-2 absolute top-0 right-[10px] rotate-[270deg] origin-top-right">
                    {renderedHandles.slice(1 * laneCount, 2 * laneCount).reverse()}
                </div>
                <div className="w-full flex justify-center gap-2 absolute -bottom-[10px]">
                    {renderedHandles.slice(2 * laneCount, 3 * laneCount)}
                </div>
                <div className="w-full flex justify-center gap-2 absolute top-0 left-[10px] rotate-90 origin-top-left">
                    {renderedHandles.slice(3 * laneCount, 4 * laneCount)}
                </div>
            </div>
        </>
    )
}