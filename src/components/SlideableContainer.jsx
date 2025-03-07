import { forwardRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { 
    DEFAULT_ICON_SIZE, 
    MENU_CLASSES 
} from "@/lib/config";
import clsx from "clsx";

export default forwardRef(function SlideableContainer(props, ref) {
    const handleClick = () => {
        ref.current.checked = false;
    }

    return (
        <div className={clsx(
            "w-full lg:w-[500px] h-full z-50 bg-[#FAFAFA] drop-shadow-sm p-10 pt-16 flex flex-col justify-between absolute top-0 -right-[500px] transition-all duration-500 overflow-y-scroll scrollbar-hide",
            [MENU_CLASSES[props.id]] // precomplied tailwind utility class, allows dynamic runtime classes
        )}>
            <button 
                className="absolute top-0 right-0 p-6" 
                onClick={handleClick}
            >
                <RxCross2 size={DEFAULT_ICON_SIZE}/>
            </button>
            <div className="grow">
                {props.content}
            </div>
        </div>
    )
});