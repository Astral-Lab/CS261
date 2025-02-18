import { LuPlay } from "react-icons/lu";
import { LuSave } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsExclamationCircle } from "react-icons/bs";
import { GoLink } from "react-icons/go";
import ToolbarButton from "./ToolbarButton";
import { DEFAULT_ICON_SIZE } from "../lib/config";

export default function Toolbar() {
    return (
        <ul className="flex gap-2">
            <ToolbarButton
                icon={<LuPlay size={DEFAULT_ICON_SIZE}/>}
                title={"play"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<LuSave size={DEFAULT_ICON_SIZE}/>}
                title={"save or load junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<RiDeleteBinLine size={DEFAULT_ICON_SIZE}/>}
                title={"delete junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<GoLink size={DEFAULT_ICON_SIZE}/>}
                title={"about Junction Flow"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={<BsExclamationCircle size={DEFAULT_ICON_SIZE}/>}
                title={"show guide"}
                onClick={null}
                disabled={false}
            />
        </ul>
    )
}