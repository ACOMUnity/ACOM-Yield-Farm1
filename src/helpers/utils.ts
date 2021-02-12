import { getAddress } from '@ethersproject/address'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getEthBalance(account: string, callback: (balance: string) => void) {
  // console.log('getEThBalance', window.web3?)
  window.web3?.eth?.getBalance(account).then((balance: string) => callback(balance))
}

export function fromWei(balance: string) {
  return window.web3?.utils?.fromWei(balance, 'Ether')
}

export function setPrecision(balance: string, precise: number) {
  return balance.substr(0, balance.indexOf('.') + precise + 1)
}
