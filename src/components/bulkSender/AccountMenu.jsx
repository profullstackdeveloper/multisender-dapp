export default function AccountMenu (props) {
    const handleClick = (value) => {
        props.setAccount(value);
        props.onClose('account');
    }
    return (
        props.accountList && props.isOpen && props.accountList.length > 0 ? <div className="fixed z-10 flex flex-col items-start w-fit mt-[10px] bg-white rounded-[8px] shadow-slate-700 shadow-sm p-[10px]">
            {
                props.accountList.map((account, index) => {
                    return (
                        <div key={index + "accountList"} className="font-bold hover:bg-blue-400 w-full cursor-pointer" onClick={() => handleClick(account)}>
                            {account}
                            <hr className="h-[1px] border-zinc-700 w-full"></hr>
                        </div>
                    )
                })
            }
        </div>
        : ""
    )
}