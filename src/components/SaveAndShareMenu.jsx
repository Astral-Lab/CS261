import { useState } from "react"

// form validation i.e. must have text cannot exceed certain char count...
export default function SaveAndShareMenu() {
    const [name, setName] = useState("Junction 1");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <form className="w-full h-full flex flex-col justify-between items-end">
            <div className="w-full">
                <legend className="text-xl text-center cap mb-10">Save & Share</legend>
                <input
                    className="w-full h-14 bg-[#E0E0E0] rounded-lg outline-none px-4"
                    placeholder="junction 1"
                    type="text"
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <button
                className="w-40 h-14 bg-[#E0E0E0] rounded-lg font-[500] drop-shadow-xs opacity-75 transition-opacity duration-300 hover:opacity-100"
                type="button"
                onClick={null}
            >save</button>
        </form>
    )
}