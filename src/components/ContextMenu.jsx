import { MdKeyboardArrowRight } from "react-icons/md";

export default function ContextMenu({
    x,
    y,
    ...props
}) {
    // todo map instead of hardcode...
    
    return (
        <div style={{ top: y, left: x }} className="absolute w-[300px] bg-[#F9F9F9] rounded-2xl px-5 py-4 pt-3 shadow-xs z-50 border-[1px] border-[#F0F0F0]">
            <p className="px-3 py-2 pb-3 font-bold border-b-[1px] border-[#E0E0E0]">create junction</p>
            <menu className="flex flex-col mt-3">
                <li className="w-full flex justify-between items-center pl-3 pr-2 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>load design</button>
                    <MdKeyboardArrowRight />
                </li>
                <li className="w-full flex justify-between items-center px-3 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>1 lane</button>
                </li>
                <li className="w-full flex justify-between items-center px-3 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>2 lane</button>
                </li>
                <li className="w-full flex justify-between items-center px-3 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>3 lane</button>
                </li>
                <li className="w-full flex justify-between items-center px-3 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>4 lane</button>
                </li>
                <li className="w-full flex justify-between items-center px-3 py-[6px] text-left rounded-lg transition-colors duration-300 hover:bg-[#E0E0E0] hover:cursor-pointer">
                    <button onClick={null}>5 lane</button>
                </li>
            </menu>
        </div>
    )
}