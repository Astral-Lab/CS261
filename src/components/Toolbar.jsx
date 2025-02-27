import ToolbarButton from "./ToolbarButton";
import { DEFAULT_ICON_SIZE } from "../lib/config";
import { IoMdPlay } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaStaylinked } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";

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
                icon={<IoSaveSharp size={DEFAULT_ICON_SIZE}/>}
                title={"save or load junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<RiDeleteBin2Fill size={DEFAULT_ICON_SIZE}/>}
                title={"delete junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<FaStaylinked size={DEFAULT_ICON_SIZE}/>}
                title={"about Junction Flow"}
                onClick={null}
                disabled={false}
            />
            {/* <ToolbarButton
                icon={<FaExclamationCircle size={DEFAULT_ICON_SIZE}/>}
                title={"show guide"}
                onClick={null}
                disabled={false}
            /> */}
        </ul>
    )
}