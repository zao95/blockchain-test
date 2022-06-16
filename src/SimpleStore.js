import { ethers } from 'ethers'
import React, { useState } from 'react'
import SimpleStore_abi from './SimpleStore_abi.json'

const SimpleStore = () => {
    const contractAddress = '0x4896C552D92D668f4Bde90a635dF46316178a1C5'

    const [errorMessage, setErrorMessage] = useState(null)
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [connButtonText, setConnButtonText] = useState('Connect Wallet')

    const [currentContractVal, setCurrentContractVal] = useState(null)

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((result) => {
                    accountChangedHandler(result[0])
                    setConnButtonText('Wallet Connected')
                })
        } else {
            setErrorMessage('Need to install MetaMask!')
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount)
        updateEthers()
    }

    const updateEthers = () => {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider)

        const tempSigner = tempProvider.getSigner()
        setSigner(tempSigner)

        const tempContract = new ethers.Contract(
            contractAddress,
            SimpleStore_abi,
            tempSigner
        )
        setContract(tempContract)
    }

    const getCurrentVal = async () => {
        console.log('run getCurrentVal')
        let val = await contract.get()
        console.log('🚀 ~ getCurrentVal ~ val', val)
        setCurrentContractVal(val)
    }

    const setHandler = (event) => {
        event.preventDefault()
        console.log('run setHandler')
        contract
            .set(event.target.setText.value)
            .then((result) => console.log('🚀 ~ setHandler ~ result', result))
            .catch((error) => console.log('🚀 ~ setHandler ~ error', error))
    }

    return (
        <div>
            <h3> {'Get/Set Interaction with contract!'} </h3>
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <h3> Address: {defaultAccount} </h3>

            <form onSubmit={setHandler}>
                <input id='setText' type='text' />
                <button type='submit'> Update Contract </button>
            </form>

            <button onClick={getCurrentVal}> Get Current Value </button>
            {currentContractVal}
            {errorMessage}
        </div>
    )
}

export default SimpleStore
