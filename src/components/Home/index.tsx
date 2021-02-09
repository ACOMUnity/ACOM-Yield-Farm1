import React, { useState, useEffect } from 'react'
import farmer from '../../assets/farmer.png'
import { getEthPriceNow } from 'get-eth-price'
interface Props {
  acomTokenBalance: any
  agovTokenBalance: any
  stakingBalance: any
  stakeTokens: (amount: any) => void
  unstakeTokens: () => void
}

const Main: React.FC<Props> = ({
  acomTokenBalance,
  agovTokenBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
}: Props) => {
  const [stakeAmount, setStakeAmount] = useState('')
  const [ethPrice, setEthPrice] = useState('')
  useEffect(() => {
    getEthPriceNow().then((data: any) => {
      if (data && Object.keys(data).length > 0) {
        setEthPrice(data[Object.keys(data)[0]]['ETH']['USD'])
      }
    })
  }, [])

  return (
    <div id="content" className="mt-3 text-center">
      <div id="theBigShow" className="lowerBold sextext theBigShow titleText">
        Welcome to the ACOM Yield Farm
      </div>
      <br></br>
      <div className="card mb-4">
        <div className="card-body">
          <span className="underTitle">You Current ACOM Community Token Balances:</span>
          <br></br>
          <table className="table table-borderless text-muted text-center">
            <thead></thead>
            <tbody>
              <tr>
                <td
                  className=""
                  onClick={() => {
                    setStakeAmount(window.web3?.utils?.fromWei(acomTokenBalance, 'Ether') || '')
                    // const updateamount: HTMLInputElement = window.document.getElementById('numberInputter')
                    // updateamount.innerText = stakeAmount
                    // updateamount.value = stakeAmount
                  }}
                >
                  {window.web3?.utils?.fromWei(acomTokenBalance, 'Ether')} ACOM
                </td>
                <td className="">{window.web3?.utils?.fromWei(agovTokenBalance, 'Ether')} AGOV</td>
              </tr>
            </tbody>
          </table>
          <form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault()
              stakeTokens(window.web3?.utils?.toWei(stakeAmount, 'Ether'))
            }}
          >
            <div>
              <label className="text-center">
                <b>Stake ACOM to Earn AGOV</b>
              </label>
            </div>
            <div className="input-group mb-4">
              <input
                type="number"
                min="0"
                className="form-control form-control-lg"
                placeholder="0"
                id="numberInputter"
                required
                onChange={(event) => {
                  setStakeAmount(event.target.value)
                }}
                value={stakeAmount}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img className="mr-2" src={farmer} height="32" alt="DAI Token" />
                  ACOM
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg sextext">
              DEPOSIT
            </button>
          </form>
          <button
            //DISABLE LINE BELLOW TO RE-ENABLE THE WITHDRAWALS
            disabled //Remove this after enabling withdrawals
            type="submit"
            className="btn btn-primary btn-block btn-lg sextext"
            id="withdrawButton"
            onClick={(event) => {
              event.preventDefault()
              unstakeTokens()
            }}
          >
            WITHDRAW
          </button>
          <br></br>
          <span className="text-center">
            You Have <span id="fuckingStakingBalance">{window.web3?.utils?.fromWei(stakingBalance, 'Ether')} </span>{' '}
            ACOM Staking!
          </span>
          &nbsp;<br></br>
          &nbsp;<br></br>
          <span id="guesstimate" className="guesstimate">
            Attempting to Load Investment Data
          </span>
          <hr></hr>
          <span className="text-center text-muted">
            A limited 1,000,000 AGOV will be distributed to community members staking their ACOM for a minimum of 6
            months timelock between being able to withdraw them. Your initial ACOM investment will be retained and
            you&apos;ll earn AGOV community governance tokens at a rate of roughly 0.00136986301 AGOV per day per ACOM
            staking estimated to remain staking over the next 2 years of distribution before supply runs out.
          </span>
          &nbsp;<br></br>
          &nbsp;<br></br>
        </div>
      </div>
      <div className="lowerBold sextext">Ethereum Price in USD:</div>
      <div>
        <span id="totalEthPrice" className="totalEthPrice">
          {ethPrice === '' ? `Connecting to API` : ethPrice}
        </span>
      </div>
    </div>
  )
}

export default Main
