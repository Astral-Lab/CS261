import ToolbarButton from "./ToolbarButton";
import { DEFAULT_ICON_SIZE } from "../lib/config";
import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";

export default function Toolbar() {
    return (
        <ul className="flex gap-2">
            <ToolbarButton
                icon={<IoMdPlay size={DEFAULT_ICON_SIZE}/>}
                title={"play"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<IoStatsChart size={DEFAULT_ICON_SIZE}/>}
                title={"stats"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<IoSaveSharp size={DEFAULT_ICON_SIZE}/>}
                title={"save junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<RiAddLine size={DEFAULT_ICON_SIZE}/>}
                title={"create or load junction"}
                onClick={null}
                disabled={false}
            />
        </ul>
    )
}