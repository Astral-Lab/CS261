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

export default function SaveAndShareMenu() {
    const junction = useSelector(selectJunction);
    const dispatch = useDispatch();
    const disabled = !junction.name.length;

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
                    "w-full h-16 text-xl bg-blue-400 rounded-full font-[500] drop-shadow-xs",
                    {
                        "opacity-75": disabled
                    }
                )}
                type="button"
                onClick={() => dispatchStore(saveJunction(junction))}
                disabled={disabled}
            >save</button>
        </form>
    )
}