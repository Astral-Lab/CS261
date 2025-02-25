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
    transform: "none",
    position: "relative",
    left: 0,
}


// comment code...
// align issue on handles...
export default function JunctionIntersectionNode(props) {
    const renderedTopHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Top} 
            style={handleStyle}
        />
    ));

    const renderedRightHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Right} 
            style={handleStyle}
        />
    ));

    const renderedBottomHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Bottom} 
            style={handleStyle}
        />
    ));

    const renderedLeftHandles = Array(props.data.laneCount).fill(true).map(i => (
        <Handle 
            key={i}
            type="target" 
            position={Position.Left} 
            style={handleStyle}
        />
    ));

    return (
        <>
        
            <div className="w-[500px] aspect-square bg-white rounded-2xl shadow-xs relative">
                <div className="w-full flex justify-between items-center px-6 py-4 bg-[#F9F9F9] rounded-t-2xl border-b-[1px] border-[#F0F0F0]">
                    <p className="font-bold">Junction</p>
                </div>
                <div className="flex flex-col gap-8 px-6 p-4">
                    <p className="">This node consumes traffic flow and controls the traffic light cycle.</p>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">duration <span className="text-[#E0E0E0]">(120s)</span></label>
                        <p className="">the number of seconds in a traffic cycle</p>
                        {/** temp */}
                        <div className="w-full flex gap-2">
                            <div className="w-1/3 h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                            <div className="w-1/3 h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                            <div className="w-1/3 h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">priority</label>
                        <p className="">the ratio each side has of a light cycle</p>
                        {/** temp */}
                        <div className="w-full grid grid-cols-2 gap-2">
                            <div className="w-full h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                            <div className="w-full h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                            <div className="w-full h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                            <div className="w-full h-12 rounded-lg bg-[#E0E0E0] mt-1"></div>
                        </div>
                    </div>
                    {/** configure lane type i.e. bus/cycle/left turn etc... */}
                </div>
                <div className="w-full flex justify-center gap-2 absolute -top-[10px]">
                    {renderedTopHandles}
                </div>
                <div className="w-full flex justify-center gap-2 absolute top-0 left-[10px] rotate-90 origin-top-left">
                    {renderedRightHandles}
                </div>
                <div className="w-full flex justify-center gap-2 absolute -bottom-[10px]">
                    {renderedBottomHandles}
                </div>
                <div className="w-full flex justify-center gap-2 absolute top-0 right-[10px] rotate-[270deg] origin-top-right">
                    {renderedLeftHandles}
                </div>
            </div>
        </>
    )
}