export default function ToolbarButton({
    icon,
    onClick,
    disabled
}) {
    return (
        <button
            className="w-12 h-12 flex justify-center items-center bg-white border-[1px] border-gray-300 drop-shadow-sm rounded-lg transition-colors duration-300 hover:bg-gray-300"
            // title={title}
            // onClick={null}
            // disabled={false}
        >{icon}</button>
    )
}