import React, { useState } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3(Web3.givenProvider, null);

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

function App() {
  const [number, setNumber] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ran');

    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    console.log(account);

    const contractAddress = '0x15EbA188789C8FB5c66D9aD6EDeC7983352e5520';

    const storageContract = new web3.eth.Contract(abi, account, { address: contractAddress });

    console.log(storageContract.methods);

    const result = await storageContract.methods.set(number).send();
  }

  console.log(web3);
  console.log(number)

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value) }  />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
