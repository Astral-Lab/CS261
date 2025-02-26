export default function CreateAndLoadJunction() {
    // select junction designs from redux...
    // add score to each junction...

    return (
        <div className="w-[400px] h-full bg-white border-r-[1px] absolute inset-0 z-10 p-10 flex flex-col gap-16">
            <div className="border-b-[1px] border-black pb-16">
                <h2 className="text-xl text-center cap mb-8">create new</h2>
                <ul className="w-full grid grid-cols-2 gap-2">
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                            onClick={null}
                        >1 lane</button>
                    </li>
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                            onClick={null}
                        >2 lane</button>
                    </li>
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                            onClick={null}
                        >3 lane</button>
                    </li>
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                            onClick={null}
                        >4 lane</button>
                    </li>
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl shadow-xs lg:opacity-80 lg:hover:opacity-100 transition-opacity duration-300"
                            onClick={null}
                        >5 lane</button>
                    </li>
                </ul>
            </div>
            <div className="grow flex flex-col gap-8">
                <h2 className="text-xl text-center cap">load design</h2>
                <div className="grow bg-[#E0E0E0A0] rounded-xl flex justify-center items-center shadow-xs">
                    <p className="">no saved junctions</p>
                </div>
                {/* <ul className="w-full flex flex-col gap-2">
                    <li>
                        <button 
                            className="w-full h-16 bg-[#E0E0E0] rounded-xl"
                            onClick={null}
                        >regent avenue 1</button>
                    </li>
                </ul> */}
                <p className="text-xs italic">Clearing your browser cache will permanently delete any saved junction designs.</p>
            </div>
        </div>
    )
}