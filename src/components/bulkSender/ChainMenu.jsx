export default function ChainMenu ({isOpen, ...props}) {
    const handleClick = (value) => {
        props.setChain(value);
        props.onClose('chain')
    }
    return (
        isOpen ? <div className="fixed z-10 flex flex-col items-start w-[100px] mt-[10px] bg-white rounded-[8px] shadow-slate-700 shadow-sm p-[10px]">
            <div className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => handleClick('Ethereum')}>
                Ethereum
            </div>
            <hr className="h-[1px] border-zinc-700 w-full"></hr>
            <div className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => handleClick('Matic')}>
                Matic
            </div>
            <hr className="h-[1px] border-zinc-700 w-full"></hr>
            <div className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => handleClick('xDai')}>
                xDai
            </div>
        </div>
        : ""
    )
}