import { SUPPORTED_WALLETS } from 'constants/index'

import React, { FC } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected } from 'connectors/index'
import Button from 'components/common/Button'
import Loader from 'components/common/Loader'

import Option from './Option'
import styles from './index.module.scss'

interface IPendingView {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}

const PendingView: FC<IPendingView> = ({ connector, error = false, setPendingError, tryActivation }: IPendingView) => {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <div className={styles.pendingWrapper}>
      <section className={styles.loading}>
        {error ? (
          <>
            <span className={styles.error}>Error Connecting</span>
            <Button
              theme="secondary"
              onClick={() => {
                setPendingError(false)
                connector && tryActivation(connector)
              }}
              variant={styles.retry}
            >
              Try again
            </Button>
          </>
        ) : (
          <>
            <Loader />
            <span className={styles.init}>Initializing...</span>
          </>
        )}
      </section>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]
        const icon = option.iconName ? require('../../assets/images/wallets/' + option.iconName) : null

        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              key={key}
              clickable={false}
              header={option.name}
              subheader={option.description}
              icon={icon?.default || ''}
            />
          )
        }
        return null
      })}
    </div>
  )
}

export default PendingView
