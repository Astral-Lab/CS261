import { useCallback } from "react"
import { 
    Handle,
    Position
} from "@xyflow/react";

// on select give blue border of 1px...
const handleStyle = {
    width: 20,
    height: 20,
    border: "2px solid white",
    background: "#60A5FA",

}


// comment code...
// align issue on handles...
export default function JunctionIntersectionNode(props) {
    const renderedTopHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Top} 
            style={{
                ...handleStyle,
                position: "relative",
                left: 0,
      
            }}
        />
    ));

    const renderedRightHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Right} 
            style={{
                ...handleStyle,
                position: "relative",
               left: 0
             
            }}
        />
    ));

    const renderedBottomHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Bottom} 
            style={{
                ...handleStyle,
                position: "relative",
                left: 0,
                
            }}
        />
    ));

    const renderedLeftHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Left} 
            style={{
                ...handleStyle,
                position: "relative",
                left: 0,
                
            }}
        />
    ));

    return (
        <>
        
            <div className="w-[500px] aspect-square bg-white rounded-2xl shadow-xs overflow-hidden">
                <div className="w-full flex justify-between items-center px-6 py-4 bg-[#F9F9F9] border-b-[1px] border-[#F0F0F0]">
                    <p className="font-bold">Junction</p>
                </div>
                <div className="flex flex-col gap-8 px-6 p-4">
                    <p className="">This node controls the traffic flow.</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">vph <span className="text-[#E0E0E0]">(234)</span></label>
                        <p className="">the vehicles per hour arriving at the junction</p>
                        {/** temp */}
                        <div className="w-full h-2 rounded-full bg-[#E0E0E0] mt-1">

                        </div>
                    </div>
                   
                    {/** configure lane type i.e. bus/cycle/left turn etc... */}
                </div>
                {/* <div className="bg-blue-500 flex justify-center gap-2 top-0 left-1/2">
                    {renderedTopHandles}
                    
                </div> */}
                {/* <div className="h-full flex flex-col items-center gap-2 absolute top-0 right-0">
                    {renderedRightHandles}
                </div> */}
                {/* <div className="w-full flex justify-center gap-2 absolute bottom-0 left-0">
                    {renderedBottomHandles}
                </div> */}
                {/* <div className="h-full flex flex-col items-center gap-2 absolute top-0 left-0">
                    {renderedLeftHandles}
                </div> */}
            </div>
        </>
    )
}