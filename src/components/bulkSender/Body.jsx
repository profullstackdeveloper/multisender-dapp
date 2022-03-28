import React from 'react';
import Menu from './Menu';
import ERC20ABI from '../../contracts/ERC20.json';
import MultisenderABI from '../../contracts/Multisender.json';
import Web3 from 'web3';



export default function Body (props) {
    
    const [memberList, setMemberList] = React.useState([]);
    const [amountList, setAmountList] = React.useState([]);
    const [preview, setPreview] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const [tokenAddress, setTokenAddress] = React.useState();
    const [tokenType, setTokenType] = React.useState();
    const [inputManually, setInputManually] = React.useState(false);


    const getFile = (e) => {
        const file = e.target.files[0];
        const fr = new FileReader();
        let mList = ["0x2eB6e59aC97E6FD66A5692bc3Ab7A379F9BeB72d"];
        let aList = [0];
        let totalAmount = 0;
        fr.onload = function (result) {
            result.currentTarget.result.split(/\r\n|\n/).map((row, index) => {
                const txData = row.split(' ');
                mList.push(txData[0]);
                aList.push(txData[1]);
                totalAmount = totalAmount + Number(txData[1]);
                return true;
            });
            aList[0] = totalAmount;
            setPreview(true);
            setMemberList(mList);
            setAmountList(aList);
        }
        fr.readAsText(file)
    }

    const changeTokenType = (e) => {
        setTokenAddress("0x0000000000000000000000000000000000000000");
        setTokenType(e.target.value);
    }

    const multiSend = async () => {
        const web3 = new Web3(window.ethereum);
        const txFee = 0.01;
        const MultisendInstance = new web3.eth.Contract(MultisenderABI.abi, MultisenderABI[props.chainSymbol])
        if(tokenAddress && memberList.length >= 1 && amountList.length >= 1){
            if(  tokenAddress !== "0x0000000000000000000000000000000000000000" && props.currentAccount !== "Choose Account" ){
                const ERC20Instance = new web3.eth.Contract(ERC20ABI.abi, tokenAddress)
                const totalAmount = Web3.utils.toWei(amountList[0].toString());
                const tempList = [];
                amountList.map((amount, index) => {
                    tempList.push(Web3.utils.toWei(amount.toString()))
                    return true;
                });
                await ERC20Instance.methods.approve(MultisenderABI[props.chainSymbol], totalAmount).send({
                    from: props.currentAccount
                });
                await MultisendInstance.methods.mutiSendCoinWithDifferentValue(tokenAddress, memberList, tempList).send({
                    from: props.currentAccount,
                    value: Web3.utils.toWei(txFee.toString())
                })
            } else {
                const totalAmount = txFee + amountList[0];
                const tempList = [];
                amountList.map((amount, index) => {
                    tempList.push(Web3.utils.toWei(String(amount)))
                    return true;
                });
                await MultisendInstance.methods.mutiSendETHWithDifferentValue(memberList, tempList).send({
                    from: props.currentAccount,
                    value: Web3.utils.toWei(totalAmount.toString())
                })
            }
        }
    }

    const displayMenu = () => {
        setShowMenu(true);
    }

    const hideMenu = () => {
        setShowMenu(false);
    }

    const reset = () => {
        setPreview(false);
        setInputManually(false);
        props.setDisplaySample(false)
        setMemberList([]);
        setAmountList([]);
    }

    const setSample = (value) => {
        props.setSample(value);
    }

    const setDisplaySample = (value) => {
        props.setDisplaySample(value);
        setInputManually(false)
    }

    const handleInputManualData = (e) => {
        var totalAmount=0;
        let mList=["0x0000000000000000000000000000000000000000"];
        let aList=[0];
        e.target.value.split(/\r\n|\n/).map((row, index) => {
            const txData = row.includes(',') ? row.split(',') : row.split(' ');
            console.log(txData)
            mList.push(txData[0]);
            aList.push(txData[1]);
            totalAmount = totalAmount + Number(txData[1]);
            return true;
        });
        aList[0] = totalAmount;
        setPreview(true);
        setMemberList(mList);
        setAmountList(aList);
        console.log(mList, aList);
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-[972px] flex flex-col">
                <select className="outline-1 border-cyan-600 border-[1px] rounded-[8px] w-[200px] mt-[40px] text-[20px] h-[50px] pl-2 pr-2" onChange={(e) => changeTokenType(e)}>
                    <option value="">Choose Token</option>
                    <option value="native">{props.chainSymbol} Native Token</option>
                    <option value="custom">Custom Token</option>
                </select>
                {
                    tokenType && tokenType === "custom" ? <div className="flex flex-row justify-between mt-[40px] w-[70%]">      
                        <div className="w-[85%] flex flex-col">
                            <div className="font-bold">Token</div>
                            <input placeholder="Please insert token address." className="w-[100%] h-[48px] mt-[5px] px-[8px]" onChange={(e) => setTokenAddress(e.target.value)}></input>
                        </div>
                        <div className="w-[10%] flex flex-col">
                            <div className="font-bold">Decimal</div>
                            <input className="w-[100%] h-[48px] mt-[5px] px-[8px]" readOnly defaultValue={18}></input>
                        </div>
                    </div>
                    : ""
                }
                <div className="flex flex-col items-start mt-[10px] w-full">
                    <div className="flex flex-row justify-between w-[70%]">
                        <div className="font-bold">
                            Addresses with Amounts
                        </div>
                        <div className="font-bold cursor-pointer" >
                            <u onClick={() => setInputManually(true)}>Input Manually</u>
                        </div>
                    </div>
                    {
                        !inputManually ? !preview ? !props.displaySample ? (<div className="w-[632px] mt-[10px]">
                            <label htmlFor="fileUpload" className="cursor-pointer">
                                <p className="text-[60px] w-[632px] hover:text-white bg-[#ffff] hover:bg-cyan-700 text-center rounded-[8px] text-black leading-[172px]">
                                    Click to Upload
                                </p>
                            </label> 
                            <input id="fileUpload" type="file" multiple="multiple" accept=".txt, .csv, .xls, .xlsx" className="hidden w-[632px] h-[172px]" onChange={(e) => getFile(e)}></input>
                            <div className="flex flex-row justify-between w-[632px] mt-[5px]">
                                <div>
                                    Accepted: CSV/TXT
                                </div>
                                <div className="w-fit" onMouseOver={() => displayMenu()} onMouseLeave={() => hideMenu()}>
                                    <u className="hover:font-bold hover:cursor-pointer">Show examples</u>
                                    <Menu isOpen={showMenu} setSample={setSample} setPreview={setPreview} setDisplaySample={setDisplaySample}></Menu>
                                </div>
                            </div>
                        </div>)
                        :(<div>
                            <div className="flex flex-col w-[620px] mt-[10px] h-[172px] overflow-y-scroll bg-white p-[15px]">
                                <div className="text-center text-[30px] font-bold w-[90%]">
                                    Make TXT/CSV file as below.
                                </div>
                                <hr className="h-[1px] border-zinc-700 w-full"></hr>
                                <div className="flex flex-row w-full justify-between mt-[15px]">
                                    0x2eB6e59aC97E6FD66A5692bc3Ab7A379F9BeB72d 0.05
                                </div>
                                <div className="flex flex-row w-full justify-between">
                                    0x34e950970a665B1D6B200a699BA6240cc83e7F39 0.05
                                </div>
                                <hr></hr>
                                <div>Or</div>
                                <div className="flex flex-row w-full justify-between mt-[15px]">
                                    0x2eB6e59aC97E6FD66A5692bc3Ab7A379F9BeB72d,0.05
                                </div>
                                <div className="flex flex-row w-full justify-between">
                                    0x34e950970a665B1D6B200a699BA6240cc83e7F39,0.05
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-[632px] mt-[5px]">
                                    <div>
                                        Accepted: CSV/EXCEL/TXT
                                    </div>
                                    <div onMouseOver={() => displayMenu()} onMouseLeave={() => hideMenu()}>
                                        <u className="hover:font-bold hover:cursor-pointer">Show examples</u>
                                        <Menu isOpen={showMenu} setSample={setSample} setPreview={setPreview} setDisplaySample={setDisplaySample}></Menu>
                                    </div>
                                </div>
                        </div>
                        )
                        : (
                            <div>
                                <div className="flex flex-col w-[620px] mt-[10px] h-[172px] overflow-y-scroll bg-white p-[15px]">
                                    <div className="text-center text-[30px] font-bold w-[90%]">
                                        Upload Preview
                                    </div>
                                    {
                                        memberList.map((member, index) => {
                                            if(index !== 0) {
                                                return (
                                                    <div className="flex flex-row w-full justify-between" key={index + "memberlist"}>
                                                        <div>{index}</div>
                                                        <div>{member}</div>
                                                        <div>{amountList[index]}</div>
                                                    </div>
                                                )
                                            }
                                        })    
                                    }
                                    
                                </div>
                                <div className="flex flex-row justify-between w-[632px] mt-[5px]">
                                    <div>
                                        Accepted: CSV/EXCEL/TXT
                                    </div>
                                    <div onMouseOver={() => displayMenu()} onMouseLeave={() => hideMenu()}>
                                        <u className="hover:font-bold hover:cursor-pointer">Show examples</u>
                                        <Menu isOpen={showMenu} setSample={setSample} setPreview={setPreview} setDisplaySample={setDisplaySample}></Menu>
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <div className="flex flex-col w-[620px] mt-[10px] h-[172px] overflow-y-scroll bg-white">
                                    <textarea className="text-[20px] w-[100%] h-[172px] outline-none p-[15px]" onChange={(e) => handleInputManualData(e)}></textarea>
                                </div>
                                <div className="flex flex-row justify-between w-[632px] mt-[5px]">
                                    <div>
                                        Accepted: CSV/EXCEL/TXT
                                    </div>
                                    <div onMouseOver={() => displayMenu()} onMouseLeave={() => hideMenu()}>
                                        <u className="hover:font-bold hover:cursor-pointer">Show examples</u>
                                        <Menu isOpen={showMenu} setSample={setSample} setPreview={setPreview} setDisplaySample={setDisplaySample}></Menu>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex flex-row justify-between w-[70%]">
                        <button type="button" className={` hover:bg-indigo-900 w-[196px] h-[50px] bg-[#00174B] rounded-[4px] text-white mt-[40px]`} onClick={() => multiSend()}>
                            NEXT
                        </button>
                        <button type="button" className={` hover:bg-indigo-900 w-[196px] h-[50px] bg-[#00174B] rounded-[4px] text-white mt-[40px]`} onClick={() => reset()}>
                            RESET
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}