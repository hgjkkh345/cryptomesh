import React from "react"

import { ReactComponent as Person } from "assets/icons/guy.svg"
import "./RefWorks.scss"

export const RefWorks = (): JSX.Element => {
  const onScroll = () => {
    window.scrollTo({
      top: 10000,
      behavior: "smooth",
    })
  }

  return (
    <div className="ref-works" id="work">
      <h3 className="ref-works-title">How does it work</h3>
      <p className="ref-works-desc">
        Each category specifies how much of the Cryptomesh.io commission you are eligible to get.
      </p>
      <div className="ref-works-content">
        <div className="ref-works-content-header">
          <div className="ref-works-content-header-block">Number of referrals</div>
          <div className="ref-works-content-header-block">Referral bonus</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">3</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(3).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">3% of Cryptomesh.io&apos;s commission</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">5</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(5).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">5% of Cryptomesh.io&apos;s commission</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">10</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(10).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">8% of Cryptomesh.io&apos;s commission</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">20</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(20).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">10% of Cryptomesh.io&apos;s commission</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">25</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(25).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">12% of Cryptomesh.io&apos;s commission</div>
        </div>
        <div className="ref-works-content-item">
          <div className="ref-works-content-item-left">
            <div className="ref-works-content-item-left-number">30</div>
            <div className="ref-works-content-item-left-users">
              {Array.from(Array(30).keys()).map((i, index) => (
                <div className="ref-works-content-item-left-person" key={index}>
                  <Person />
                </div>
              ))}
            </div>
          </div>
          <div className="ref-works-content-item-border" />
          <div className="ref-works-content-item-right">15% of Cryptomesh.io&apos;s commission</div>
        </div>
      </div>
      <p className="ref-works-p">
        Suppose you refer 30 friends who allocate a total of 100 ETH into staking. Based on 20% APR blockchain rewards
        and 15% commission, your referral bonus per annum is therefore 3 ETH (100 * 20% * 15%).
      </p>
      <h3 className="ref-works-title-2">Your referral bonus is calculated by</h3>
      <ul className="ref-works-ul">
        <li>The liquidity profit Cryptomesh.io receive from your referral (Total Referral Commission)</li>
        <li>The total number of friends you&apos;ve referred to Cryptomesh.io (Referral Badges)</li>
        <li> $10 bonus per successful referral (*T&Cs apply)</li>
      </ul>
      <h3 className="ref-works-title-2 big">Payout</h3>
      <p className="ref-works-p small">
        The bonus is paid out every Monday, based on your referrals' assets and referral progress badges. The bonus payouts are in the coins that your referred friend is earning from. One exception is Liquidity Mining, where we assess the total value in DFI, so the payouts will also be in DFI.
      </p>
      <h3 className="ref-works-title-2">How do I join the Cryptomesh.io referral program?</h3>
      <p className="ref-works-p small">
        Anyone who has a verified Cake DeFi account is eligible to join our referral program and earn rewards.
        <br />
        The number of successful referral is determined by the number of referred accounts that have USD 50 active funds or above.
        <br />
        For more information on how referral rewards are calculated, please see{" "}
        <button onClick={onScroll}>this FAQ.</button>
      </p>
    </div>
  )
}
