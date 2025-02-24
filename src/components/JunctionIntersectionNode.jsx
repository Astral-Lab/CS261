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
export default function JunctionIntersectionNode() {
    const renderedTopHandles = Array(3).fill(true).map(i => (
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

    const renderedRightHandles = Array(3).fill(true).map(i => (
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

    const renderedBottomHandles = Array(3).fill(true).map(i => (
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

    const renderedLeftHandles = Array(3).fill(true).map(i => (
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
        
            <div className="w-[500px] aspect-square bg-white rounded-2xl shadow-xs">
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