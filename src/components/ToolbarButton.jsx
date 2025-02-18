import { IoMdPlay } from "react-icons/io";

export default function ToolbarButton({
    icon,
    onClick,
    disabled
}) {
    return (
        <button 
            className="w-12 h-12 rounded-lg bg-blue-500"
            title={title}
            onClick={onClick}
            disabled={disabled}
        >
            <IoMdPlay size={"32px"}/>
        </button>
    )
}