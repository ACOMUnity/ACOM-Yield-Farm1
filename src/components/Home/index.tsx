import React, { useState, useEffect } from 'react'
import cls from 'classnames'
import farmer from '../../assets/farmer.png'
import { getEthPriceNow } from 'get-eth-price'
import { ReactComponent as InfoIcon } from 'assets/images/svgs/info.svg'
import styles from './index.module.scss'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
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
  const [investData, setInvestData] = useState('Attempting to Load Investment Data')

  const tooltip = (
    <Tooltip id="info-tooltip">
      A limited 1,000,000 AGOV will be distributed to community members staking their ACOM for a minimum of 6 months
      timelock between being able to withdraw them. Your initial ACOM investment will be retained and you&apos;ll earn
      AGOV community governance tokens at a rate of roughly 0.00136986301 AGOV per day per ACOM staking estimated to
      remain staking over the next 2 years of distribution before supply runs out.
    </Tooltip>
  )
  useEffect(() => {
    getEthPriceNow().then((data: any) => {
      if (data && Object.keys(data).length > 0) {
        setEthPrice(data[Object.keys(data)[0]]['ETH']['USD'])
      }
    })
  }, [])

  useEffect(() => {
    if (stakingBalance > 0) {
      const dailyPay = window.web3?.utils?.fromWei(stakingBalance, 'Ether') * 0.00136986301
      setInvestData(`Earning Roughly ${dailyPay} AGOV a Day Staking!`)
    } else {
      setInvestData('Not Earning AGOV! Please Stake Some mACOM!')
    }
  }, [stakingBalance])
  return (
    <div id="content" className="mt-3 text-center">
      <div id="theBigShow" className="lowerBold sextext theBigShow titleText">
        Welcome to the ACOM Yield Farm
      </div>
      <div className="card mb-4 mt-4">
        <div className="card-body">
          <div className="underTitle mb-3">
            You Current AGOV Balances: {window.web3?.utils?.fromWei(agovTokenBalance, 'Ether')} AGOV{' '}
          </div>
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
          <p className="text-center mt-3 mb-3">
            You Have <span id="fuckingStakingBalance">{window.web3?.utils?.fromWei(stakingBalance, 'Ether')} </span>{' '}
            ACOM Staking!
          </p>
          <p className={cls(styles['info-icon'], 'mb-0')}>
            {investData}
            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 250 }} overlay={tooltip}>
              <InfoIcon></InfoIcon>
            </OverlayTrigger>
          </p>
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
