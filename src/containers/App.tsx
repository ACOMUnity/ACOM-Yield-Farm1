import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { Toast, ToastHeader, ToastBody } from 'react-bootstrap'
import { useEagerConnect } from 'hooks'
import Navbar from 'components/Navbar'
import Home from 'components/Home'
import AgovToken from 'abis/AgovToken.json'
import TokenFarm from 'abis/TokenFarm.json'
import abiArray from 'constants/abiArray'
import './App.scss'

const App: React.FC = () => {
  const { account } = useWeb3React()
  const triedEager = useEagerConnect()
  const [loading, setLoading] = useState(account !== undefined && account !== null ? true : false)
  const [toastStatus, setToastStatus] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [acomToken, setAcomToken] = useState<any>({})
  const [agovToken, setAgovToken] = useState<any>({})
  const [tokenFarm, setTokenFarm] = useState<any>({})
  const [withdrawEnabled, setWithdrawEnabled] = useState(false)
  const [acomTokenBalance, setAcomTokenBalance] = useState('0')
  const [agovTokenBalance, setAgovTokenBalance] = useState('0')
  const [stakingBalance, setStakingBalance] = useState('0')

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider)
    window.web3 = web3
    const tempAcomToken = await new web3.eth.Contract(abiArray as any, '0x643fd19acBb31E5247EF652e15368f744e2a265a')

    if (typeof tempAcomToken !== undefined) {
      setAcomToken(tempAcomToken)
      window.acomToken = tempAcomToken
      const acomTokenBalance = await tempAcomToken.methods.balanceOf(account).call()
      setAcomTokenBalance(acomTokenBalance.toString())
    }

    const tempAgovToken = await new web3.eth.Contract(
      AgovToken.abi as any,
      '0x8Db94b765d76474ceFF19072f663fCf11bcbBA46'
    )
    if (typeof tempAgovToken !== undefined) {
      setAgovToken(tempAgovToken)
      window.agovToken = tempAgovToken
      const agovTokenBalance = await tempAgovToken.methods.balanceOf(account).call()
      setAgovTokenBalance(agovTokenBalance.toString())
    }

    // load Token Farm
    const tokenFarm = new web3.eth.Contract(TokenFarm.abi as any, '0x9f82FAcd0De79b44aF2E5A18f105f6285CE6a681')
    if (typeof tokenFarm !== undefined) {
      setTokenFarm(tokenFarm)
      window.tokenFarm = tokenFarm
      const stakingBalance = await tokenFarm.methods.stakingBalance(account).call()
      setStakingBalance(stakingBalance)
    }
    setLoading(false)
  }

  const stakeTokens = (amount: string) => {
    setToastStatus(true)
    setToastMsg('Waiting for your confirmation')

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
                  setToastMsg('Transaction Confirmed')
                  setToastStatus(true)
                })
                .on('error', () => {
                  setToastMsg('Transaction Failed')
                  setToastStatus(true)
                })
            })
            .on('error', () => {
              setToastMsg('Transaction Failed')
              setToastStatus(true)
            })
        } else {
          tokenFarm.methods
            .stakeTokens(amount)
            .send({ from: account })
            .on('transactionHash', () => {
              setLoading(false)
            })
            .on('error', () => setLoading(false))
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
    if (account) {
      loadBlockchainData()
    }
  }, [account, triedEager])

  return (
    <div>
      <Navbar account={account ? account : ''} acomTokenBalance={acomTokenBalance} />
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
      <div style={{ position: 'absolute', right: 2, bottom: 5 }}>
        <Toast onClose={() => setToastStatus(false)} show={toastStatus} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">ACOM Notification</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </div>
    </div>
  )
}

export default App
