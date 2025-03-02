import { saveJunction } from "@/stores/junctionSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

export default function SaveAndShareMenu({ state }) {
    const [name, setName] = useState("Junction 1");
    const dispatch = useDispatch();
    const disabled = !name.length;

    return (
        <form className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <legend className="text-xl text-center cap mb-10">Save & Share</legend>
                <input
                    className="w-full bg-[#73737320] py-4 text-center text-4xl outline-none px-4 mb-8"
                    placeholder="junction name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                onClick={() => dispatch(saveJunction(state))}
                disabled={disabled}
            >save</button>
        </form>
    )
}