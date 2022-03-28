import React from 'react';
import Header from '../components/bulkSender/Header';
import Body from '../components/bulkSender/Body';
import MultisenderABI from '../contracts/Multisender.json';
import Web3 from 'web3';

export default function BulkSender () {
    const [selectedSample, setSelectedSample] = React.useState();
    const [displaySample, setDisplaySample] = React.useState(false);
    const [selectedAccount, setSelectedAccount] = React.useState("Choose Account");
    const [accountList, setAccountList] = React.useState();
    const [selectedChain, setSelectedChain] = React.useState('Ethereum');
    React.useEffect(async () => {
        const web3 = new Web3(window.ethereum);
        const accountList = await web3.eth.getAccounts();
        setAccountList(accountList);
    }, []);

    return (
        <div className=" bg-[#dbeeff] w-full h-[100vh]">
            <Header setAccount={setSelectedAccount} setChain={setSelectedChain} accountList={accountList} selectedAccount={selectedAccount} selectedChain={selectedChain}></Header>
            <Body chainSymbol={selectedChain} currentAccount={selectedAccount} selectedSample={selectedSample} setSample={setSelectedSample} displaySample={displaySample} setDisplaySample={setDisplaySample}></Body>
        </div>
    )
}