/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="react-scripts" />

declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}
interface Window {
  // ethereum?: {
  //   isMetaMask?: true
  //   on?: (...args: any[]) => void
  //   removeListener?: (...args: any[]) => void
  //   enable?: (...args: any[]) => void
  // }
  ethereum?: any
  web3?: any
  acomToken?: any
  agovToken?: any
  tokenFarm?: any
}
