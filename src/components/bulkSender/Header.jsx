import React from 'react';
import {ExpandMore} from '@material-ui/icons'
import ChainMenu from './ChainMenu';
import AccountMenu from './AccountMenu';
import Web3 from 'web3';

export default function Header (props) {
    const [showChainMenu, setShowChainMenu] = React.useState(false);
    const [showAccountMenu, setShowAccountMenu] = React.useState(false);
    const onClose = (value) => {
        value == 'chain' ? setShowChainMenu(false) : setShowAccountMenu(false);
    }

    const connectWalletAndSetAccounts = async () => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({method: 'eth_requestAccounts'});
        setShowAccountMenu(!showAccountMenu);
    }
    return (
        <div className="w-full">
            <div className="bg-[url('images/headerBg6.png')] w-full h-[233px] bg-cover bg-[#031e5d] flex flex-col items-center justify-between">
                <div className="flex-row flex w-[972px] h-[130px] items-center font-bold justify-between">
                    <div className="text-green-600 text-[50px] cursor-pointer">
                        MultiSender
                    </div>
                    <div className=" text-neutral-400 text-[24px] hover:text-white cursor-pointer">
                        VIP 
                   </div>
                    <div className=" text-neutral-400 text-[24px] hover:text-white cursor-pointer">
                        Tutorial
                    </div>
                    <div className=" text-neutral-400 text-[24px] hover:text-white cursor-pointer">
                        Referral
                    </div>
                    <div className=" text-neutral-400 text-[24px] hover:text-white cursor-pointer">
                        More
                    </div>
                    <div>
                        <button className="w-[32px] h-[32px] rounded-[4px] cursor-pointer border-sky-200 border-[1px] hover:bg-gray-400 p-1" onClick={() => setShowChainMenu(!showChainMenu)}>
                            <img src={`assets/images/${props.selectedChain}.png`}></img>
                        </button>
                        <div>
                            <ChainMenu isOpen={showChainMenu} {...props} onClose={onClose}></ChainMenu>
                        </div>
                    </div>
                    <div>
                        <button className="w-[108px] h-[32px] rounded-[4px] cursor-pointer border-sky-200 border-[1px] hover:bg-gray-400 p-1 overflow-hidden text-neutral-400 font-bold hover:text-neutral-900" onClick={() => connectWalletAndSetAccounts()}>
                            {
                                props.selectedAccount
                            }
                        </button>
                        <div>
                            <AccountMenu {...props} isOpen={showAccountMenu} onClose={onClose}></AccountMenu>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-row justify-between w-[972px] items-center">
                    <div className="text-[42px] font-extrabold text-stone-50">
                        Prepare
                    </div>
                    <ExpandMore className="text-neutral-400 cursor-pointer hover:text-white" fontSize='large'></ExpandMore>
                </div>
            </div>
        </div>
    )
}