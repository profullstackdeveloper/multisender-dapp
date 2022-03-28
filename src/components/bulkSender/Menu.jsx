import React from 'react';

export default function Menu ({isOpen, setSample, setPreview, setDisplaySample}) {

    const displaySample = (value) => {
        setSample(value);
        setDisplaySample(true);
        setPreview(false);
    }

    return (
        isOpen ? <div className="fixed z-10 flex flex-col items-start w-[100px] bg-white rounded-[8px] shadow-slate-700 shadow-sm p-[10px]">
            <div className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => displaySample('CSV')}>
                CSV
            </div>
            <hr className="h-[1px] border-zinc-700 w-full"></hr>
            <div className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => displaySample('Txt')}>
                Txt
            </div>
        </div>
        : ""
    )
}