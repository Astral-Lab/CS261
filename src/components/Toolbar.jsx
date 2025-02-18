import ToolbarButton from "./ToolbarButton";

export default function Toolbar() {
    return (
        <ul className="flex gap-2">
            <ToolbarButton
                icon={""}
                title={"play"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={""}
                title={"save or load junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={""}
                title={"delete junction"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={""}
                title={"show guide"}
                onClick={null}
                disabled={false}
            />
            <ToolbarButton
                icon={""}
                title={"about Junction Flow"}
                onClick={null}
                disabled={false}
            />
        </ul>
    )
}