import { useState } from "react";
import { 
    Handle,
    Position
} from "@xyflow/react";
import { FaCarAlt } from "react-icons/fa";
import { Slider } from "./ui/slider";
import { 
    MAX_ARRIVAL_RATE, 
    MIN_ARRIVAL_RATE 
} from "@/lib/config";

const handleStyle = {
    width: 20,
    height: 20,
    right: 0,
    border: "2px solid white",
    background: "#60A5FA"
}

export default function JunctionLaneNode(props) {
    const [vph, setVph] = useState([50]);

    const handleChange = () => {

    }

    return (
        <>
            <Handle 
                type="source" 
                position={Position[props.data.handleLocation]}
                style={handleStyle}
            />
            <div className={`w-[500px] bg-white rounded-2xl shadow-xs overflow-hidden pb-4 border-[1px] border-white`}>
                <div className="w-full flex justify-between items-center px-6 py-4 bg-[#F9F9F9] border-b-[1px] border-[#F0F0F0]">
                    <div className="flex items-center gap-2">
                        <FaCarAlt size={"18px"}/>
                        <p className="font-bold">{props.data.label}</p>
                    </div>
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
                        {/* <Slider
                            defaultValue={[50]}
                            min={MIN_ARRIVAL_RATE}
                            max={MAX_ARRIVAL_RATE}
                            step={1}
                            className=""
                            // onValueChange={handleChange}
                        /> */}
                        {/* <div className="w-full h-2 rounded-full bg-[#E0E0E0] mt-1">

                        </div> */}
                        <input type="range" className="w-full"/>
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