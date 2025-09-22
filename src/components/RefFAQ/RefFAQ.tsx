import React from "react"

import "./RefFAQ.scss"
import { Collapse } from "../Collapse"

export const RefFAQ = (): JSX.Element => {
  return (
    <div className="ref-faq">
      <h2 className="ref-faq-title">FAQ</h2>
      <div className="ref-faq-content">
        <Collapse
          desc="To join the Cryptomesh.io referral program, simply connect your wallet to Cryptomesh.io. Navigate to the Referral Program section and receive your unique referral link. Share this link with your friends and network to start earning referral rewards."
          title="How do I join the Cryptomesh.io referral program?"
        />
        <Collapse
          desc="No, the referral program is exclusively available to users who are actively staking any currency on the Cryptomesh.io platform. Invitations will only be valid if you are participating in staking; otherwise, they will be considered invalid."
          title="Is the referral program open to anyone?"
        />
        <Collapse
          desc="Your referral rewards will be credited to your Cryptomesh.io account in the same currency as your referred friend's staking interest. Thanks to the power of smart contracts, rewards are available for you to claim on an hourly basis. Simply click to receive your invitation rewards whenever you're ready to claim them."
          title="How do I get paid and how often?"
        />
        <Collapse
          desc="No, there are no limits to how many referrals you can do. You can refer multiple friends to the Cryptomesh.io platform to maximize your referral rewards. Each successfully referred friend who actively stakes on the platform will contribute to your rewards. The more friends you refer, the more you can potentially earn from the referral program. Remember to share your unique referral link with your network and encourage them to join and stake on Cryptomesh.io."
          title="Is there a limit to how many referrals I can earn bonus for?"
        />
        <Collapse
          desc="Unfortunately, if no referral code or link has been used, we cannot credit any referral bonus to your account."
          title="What if my friend forgets to use the referral link or code - can I still get the bonus?"
        />
        <Collapse
          desc="If your referred friend stops staking or withdraws their funds from the Cryptomesh.io platform, your referral rewards associated with that friend's staking activities will cease. To continue earning rewards, encourage your referrals to maintain their staking positions or invite more friends to join and stake on the platform using your unique referral link."
          title="What if my referral stops staking or withdraws their funds?"
        />
      </div>
    </div>
  )
}
