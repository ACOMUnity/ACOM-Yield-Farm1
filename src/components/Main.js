import React, { Component } from "react";
import farmer from "../farmer.png";
var updateamount;
let amount;
//let withdrawEnabled;
class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3 text-center">
      <div id="theBigShow" className="lowerBold sextext theBigShow titleText">
      Welcome to the ACOM Yield Farm
      </div>
      <br></br>
        <div className="card mb-4">
          <div className="card-body">
          <span className="underTitle">You Current ACOM Community Token Balances:</span><br></br>
          <table className="table table-borderless text-muted text-center">
            <thead>

            </thead>
            <tbody>
              <tr>
                <td className=""
                onClick={(event) => {
                  amount = window.web3.utils.fromWei(this.props.acomTokenBalance,"Ether");
                  updateamount = window.document.getElementById('numberInputter');
                  updateamount.innerText = amount;
                  updateamount.value = amount;
                }}
                >
                {window.web3.utils.fromWei(this.props.acomTokenBalance,"Ether"  )}{" "} ACOM
                </td>
                <td className="">
                  {window.web3.utils.fromWei(this.props.agovTokenBalance,"Ether")}{" "} AGOV
                </td>
              </tr>
            </tbody>
          </table>

            <form
              className="mb-3"
              onSubmit={(event) => {
                event.preventDefault();
                let amount;
                amount = this.input.value.toString();
                amount = window.web3.utils.toWei(amount, "Ether");
                this.props.stakeTokens(amount);
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
                  ref={(input) => (this.input = input)}
                  className="form-control form-control-lg"
                  placeholder="0"
                  id="numberInputter"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={farmer} height="32" alt="DAI Token" />
                    &nbsp;&nbsp;&nbsp; ACOM
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg sextext"
              >
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
                event.preventDefault();
                this.props.unstakeTokens();
              }}
            >
              WITHDRAW
            </button>
            <br></br>
            <span className="text-center">
              You Have <span id="fuckingStakingBalance">{window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}</span> ACOM Staking!
            </span>
            &nbsp;<br></br>
            &nbsp;<br></br>
            <span id="guesstimate" className="guesstimate">
            Attempting to Load Investment Data
            </span>
            <hr></hr>
            <span className="text-center text-muted">
            A limited 1,000,000 AGOV will be distributed to community members staking their ACOM for a minimum of 6 months timelock between being able to withdraw them. Your initial ACOM investment will be retained and you'll earn AGOV community governance tokens at a rate of roughly 0.00136986301 AGOV per day per ACOM staking estimated to remain staking over the next 2 years of distribution before supply runs out.
            </span>
            &nbsp;<br></br>
            &nbsp;<br></br>
          </div>
        </div>
        <div className="col" >
          <label className="lowerBold sextext">
            Ethereum Price in USD:
          </label>
          <br></br>
          <span id="totalEthPrice" className="totalEthPrice">&nbsp;
          Connecting to API
          </ span>
        </ div>
      </div>
    );
  }
}

export default Main;
