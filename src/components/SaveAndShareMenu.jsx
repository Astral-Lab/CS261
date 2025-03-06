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
import { computeJunctionScore } from "@/lib/utils";

export default forwardRef(function SaveAndShareMenu(props, ref) {
    const junction = useSelector(selectJunction);
    const dispatch = useDispatch();
    const disabled = !junction.name.length;

    const handleSave = () => {
        // close the save menu on save
        ref.current.checked = false;

        // computing junction score here otherwise the junction saves with a score of '0'
        dispatch(saveJunction({ ...junction, score: computeJunctionScore(junction) }));
    }

    return (
        <form className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <legend className="text-xl text-center cap mb-10">Save</legend>
                <input
                    className="w-full h-16 lg:h-20 text-lg lg:text-2xl bg-[#73737320] flex justify-between items-center px-4 lg:px-8 rounded lg:rounded-xl mb-8 outline-none"
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
                    "w-full lg:w-full h-14 lg:h-16 text-xl bg-blue-400 rounded-full drop-shadow-xs",
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