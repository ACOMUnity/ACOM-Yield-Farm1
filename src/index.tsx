import React from 'react'
import ReactDOM from 'react-dom'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { NetworkContextName } from 'constants/index'
import getLibrary from 'helpers/getLibrary'
import store, { persistor } from 'state/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from 'containers/App'
import reportWebVitals from 'reportWebVitals'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

document.documentElement.className = ''
document.documentElement.classList.add(`theme--light`)

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
