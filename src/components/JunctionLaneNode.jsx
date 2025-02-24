import { useCallback } from "react"
import { 
    Handle,
    Position
} from "@xyflow/react";

// on select give blue border of 1px...
const handleStyle = {
    width: 20,
    height: 20,
    right: 0,
    border: "2px solid white",
    background: "#60A5FA"
};

export default function JunctionLaneNode(props) {
    return (
        <>
            <Handle 
                type="source" 
                position={Position[props.data.handlePosition]}
                style={handleStyle}
            />
            <div className={`w-[500px] bg-white rounded-2xl shadow-xs overflow-hidden pb-4 border-[1px] ${props.selected ? "border-blue-400" : "border-white"}`}>
                <div className="w-full flex justify-between items-center px-6 py-4 bg-[#F9F9F9] border-b-[1px] border-[#F0F0F0]">
                    <p className="font-bold">eastbound 1</p>
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-[#E0E0E0] rounded-full"></div>
                        <div className="w-4 h-4 bg-[#E0E0E0] rounded-full"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 px-6 p-4">
                    <p className="">This node will forward cars to the junction.</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">vph <span className="text-[#E0E0E0]">(234)</span></label>
                        <p className="">the vehicles per hour arriving at the junction</p>
                        {/** temp */}
                        <div className="w-full h-2 rounded-full bg-[#E0E0E0] mt-1">

                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">queue <span className="text-[#E0E0E0]">(12)</span></label>
                        <p className="">the number of vehicles in the lane queue</p>
                        {/** temp */}
                        <div className="w-full h-2 rounded-full bg-[#E0E0E0] mt-1">

                        </div>
                    </div>
                    {/** configure lane type i.e. bus/cycle/left turn etc... */}
                </div>
            </div>
        </>
    )
}