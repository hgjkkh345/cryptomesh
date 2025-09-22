import React from "react"

import "./RefCode.scss"
import { SimpleButton } from "../SimpleButton"
import {copyToClipboard} from "../../utils"
import {IRefUser} from "../../service/api/apiOur";
import {useAccount} from "wagmi";

type Props = {
  users: IRefUser[]
}

export const RefCode = ({ users }: Props): JSX.Element => {
  const { address } = useAccount();

  const getPercent = () => {
    switch (users?.length) {
      case 5:
        return '5'
      case 10:
        return '8'
      case 20:
        return '10'
      case 25:
        return '12'
      case 30:
        return '15'
      default:
        return '3'
    }
  }

  return (
    <div className="ref-code">
      <h2 className="ref-code-title">My referral code</h2>
      <p className="ref-code-subtitle">You may refer your friends to receive more bonuses</p>
      <div className="ref-code-block full">
        <div className="ref-code-block-left">
          <div className="ref-code-block-left-title">Your code</div>
          <div className="ref-code-block-left-value big">
            https://Cryptomesh.io.com/...{`${address?.slice(address?.length - 10, address?.length)}`}
          </div>
        </div>
        <SimpleButton
          onClick={() => {
            copyToClipboard(`https://Cryptomesh.io.com/?ref=${address}` || "")
          }}
          text="Copy"
          variant="colored"
        />
      </div>
      <div className="ref-code-flex">
        <div className="ref-code-block">
          <div className="ref-code-block-left">
            <div className="ref-code-block-left-value">Total invited</div>
            <div className="ref-code-block-left-title">Quantity</div>
          </div>
          <div className="ref-code-block-place">{users?.length}</div>
        </div>
        <div className="ref-code-block">
          <div className="ref-code-block-left">
            <div className="ref-code-block-left-value">Your Bonus</div>
          </div>
          <div className="ref-code-block-desc">{getPercent() || 3}% of Cryptomesh.io&apos;s commission</div>
        </div>
      </div>
      {!!users?.length && (
        <div className="ref-code-block full">
          <div className="ref-code-block-left">
            <div className="ref-code-block-left-title">Your invited users:</div>
            {users?.map((i, index) => (
              <div className="ref-code-block-left-value small-one" key={index}>
                {i.follower}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
