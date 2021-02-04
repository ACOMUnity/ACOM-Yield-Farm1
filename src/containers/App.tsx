import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import AgovToken from '../abis/AgovToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import abiArray from '../const/abiArray'
import './App.css'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('0x0')
  const [acomToken, setAcomToken] = useState<any>({})
  const [agovToken, setAgovToken] = useState<any>({})
  const [tokenFarm, setTokenFarm] = useState<any>({})
  const [withdrawEnabled, setWithdrawEnabled] = useState(false)
  const [acomTokenBalance, setAcomTokenBalance] = useState('0')
  const [agovTokenBalance, setAgovTokenBalance] = useState('0')
  const [stakingBalance, setStakingBalance] = useState('0')

  const loadWeb3 = async (callback: any) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum as any)
      await window.ethereum?.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    callback()
  }
  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = (await web3.eth.getAccounts()) || []
    setAccount(accounts?.length > 0 ? accounts[0] : '0x0')
    console.log('accounts => ', accounts?.length > 0, accounts, account)
    const tempAcomToken = await new web3.eth.Contract(abiArray, '0x643fd19acBb31E5247EF652e15368f744e2a265a')

    // const networkId = await web3.eth.net.getId()

    if (typeof tempAcomToken !== undefined && accounts[0] !== '0x0') {
      // this.setState({ acomToken });
      setAcomToken(tempAcomToken)
      window.acomToken = tempAcomToken
      const acomTokenBalance = await tempAcomToken.methods.balanceOf(accounts[0]).call()

      setAcomTokenBalance(acomTokenBalance.toString())
    }

    if (accounts[0]) {
      const tempAgovToken = await new web3.eth.Contract(AgovToken.abi, '0x8Db94b765d76474ceFF19072f663fCf11bcbBA46')
      setAgovToken(tempAgovToken)
      window.agovToken = tempAgovToken
      const agovTokenBalance = await tempAgovToken.methods.balanceOf(accounts[0]).call()
      setAgovTokenBalance(agovTokenBalance)
    } else {
      window.alert('AgovToken contract not deployed to detected network')
    }

    // load Token Farm
    if (accounts[0]) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, '0x9f82FAcd0De79b44aF2E5A18f105f6285CE6a681')
      setTokenFarm(tokenFarm)
      window.tokenFarm = tokenFarm
      const stakingBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call()
      setStakingBalance(stakingBalance)
    } else {
      window.alert('TokenFarm contract not deployed to detected network')
    }
    setLoading(false)
  }

  const stakeTokens = (amount: string) => {
    // this.setState({ loading: true })
    setLoading(true)

    acomToken.methods
      .allowance('0x07b37E682B100208C6288F2F121298A4D60D103c', '0x9f82facd0de79b44af2e5a18f105f6285ce6a681')
      .call()
      .then((allowance: any) => {
        allowance = window.web3.utils.fromWei(allowance)

        if (allowance < window.web3.utils.fromWei(amount)) {
          acomToken.methods
            .approve(tokenFarm._address, amount)
            .send({ from: account })
            .on('transactionHash', () => {
              tokenFarm.methods
                .stakeTokens(amount)
                .send({ from: account })
                .on('transactionHash', () => {
                  setLoading(false)
                })
            })
        } else {
          tokenFarm.methods
            .stakeTokens(amount)
            .send({ from: account })
            .on('transactionHash', () => {
              setLoading(false)
            })
        }
      })
  }

  const unstakeTokens = () => {
    setLoading(true)
    tokenFarm.methods
      .unstakeTokens()
      .send({ from: account })
      .on('transactionHash', () => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadWeb3(() => loadBlockchainData())
  }, [])

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
            <div className="content mr-auto ml-auto">
              {loading ? (
                <p id="loader" className="text-center">
                  Loading...
                </p>
              ) : (
                <Home
                  acomTokenBalance={acomTokenBalance}
                  agovTokenBalance={agovTokenBalance}
                  stakingBalance={stakingBalance}
                  stakeTokens={stakeTokens}
                  unstakeTokens={unstakeTokens}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
