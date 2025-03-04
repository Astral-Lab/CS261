import { 
    changeJunctionName,
    saveJunction, 
    selectJunction 
} from "@/stores/junctionSlice";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import clsx from "clsx";
import { forwardRef } from "react";

export default forwardRef(function SaveAndShareMenu(props, ref) {
    const junction = useSelector(selectJunction);
    const dispatch = useDispatch();
    const disabled = !junction.name.length;

    const handleSave = () => {
        // close the save menu on save
        ref.current.checked = false;

        dispatch(saveJunction(junction));
    }

    return (
        <form className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <legend className="text-xl text-center cap mb-10">Save & Share</legend>
                <input
                    className="w-full h-20 text-2xl bg-[#73737320] flex justify-between items-center px-8 rounded-xl mb-8 outline-none"
                    placeholder="Junction name"
                    type="text"
                    value={junction.name}
                    onChange={(e) => dispatch(changeJunctionName(e.target.value))}
                />
                <p className="text-xs italic">Saving without changing the name will overwrite the existing junction design with that name. Saving with a new name will create a new junction entry. </p>
                {disabled && <p className="text-red-400 mt-8">Must enter a name for the junction</p>}
            </div>
            <button
                className={clsx(
                    "w-40 h-14 text-xl bg-blue-400 rounded-lg drop-shadow-xs",
                    {
                        "opacity-75": disabled
                    }
                )}
                type="button"
                onClick={handleSave}
                disabled={disabled}
            >save</button>
        </form>
    )
})