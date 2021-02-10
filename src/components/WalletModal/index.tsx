import { SUPPORTED_WALLETS, EthereumWalletsLink } from 'constants/index'

import React, { FC, useState, useEffect } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import Panel from 'components/common/Panel'
import Link from 'components/common/Link'
import { isMobile } from 'react-device-detect'
import { fortmatic, injected, portis } from 'connectors/index'
import { OVERLAY_READY } from 'connectors/Fortmatic'
import { useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/types'
import { ReactComponent as WalletIcon } from 'assets/images/svgs/wallet.svg'
import { ReactComponent as LeftArrowIcon } from 'assets/images/svgs/left-arrow.svg'
import usePrevious from 'hooks/usePrevious'
import MetamaskIcon from 'assets/images/wallets/metamask.png'

import Option from './Option'
import { WALLET_VIEWS } from './consts'
import styles from './index.module.scss'
import PendingView from './PendingView'

interface IWalletModal {
  pending?: string[]
  confirmed?: string[]
}

const WalletModal: FC<IWalletModal> = ({ pending, confirmed }: IWalletModal) => {
  const { active, account, connector, activate, error } = useWeb3React()
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal()
    })
  }, [toggleWalletModal])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet

    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      const icon = option.iconName ? require('../../assets/images/wallets/' + option.iconName) : null

      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              key={key}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              link={option.href}
              header={option.name}
              active={option.connector === connector}
              subheader={null}
              icon={icon?.default || ''}
            />
          )
        }
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                key={key}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={icon?.default || ''}
          />
        )
      )
    })
  }

  const getModalContent = () => {
    if (error) {
      return (
        <>
          <span>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}</span>
          <span>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </span>
        </>
      )
    }

    return (
      <>
        {walletView === WALLET_VIEWS.PENDING ? (
          <PendingView
            connector={pendingWallet}
            error={pendingError}
            setPendingError={setPendingError}
            tryActivation={tryActivation}
          />
        ) : (
          getOptions()
        )}
        {walletView !== WALLET_VIEWS.PENDING && (
          <span className={styles.new}>
            New to Ethereum?
            <Link href={EthereumWalletsLink} variant={styles.link}>
              Learn more about wallets
            </Link>
          </span>
        )}
      </>
    )
  }

  const backAvailable = !error && walletView !== WALLET_VIEWS.ACCOUNT

  return (
    <Panel
      title={backAvailable ? '' : account && walletView === WALLET_VIEWS.ACCOUNT ? 'Account' : 'Connect to a wallet'}
      variant={styles.modal}
      open={walletModalOpen}
      onClose={toggleWalletModal}
    >
      {getModalContent()}
    </Panel>
  )
}

export default WalletModal
