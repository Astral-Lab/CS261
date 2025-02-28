import { forwardRef } from "react";

export default forwardRef(function ToolbarButton(props, ref) {
    return (
        <button
            className="w-12 h-12 flex justify-center items-center bg-white drop-shadow-sm rounded-lg transition-colors duration-500 hover:bg-gray-300 relative"
            title={props.title}
        >
            <input
                className="w-full h-full absolute inset-0 z-10 opacity-0 hover:cursor-pointer"
                type="checkbox"
                ref={ref}
            />
            {props.icon}
        </button>
    )
});