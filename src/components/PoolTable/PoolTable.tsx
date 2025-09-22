import React, { useState } from "react"

import "./PoolTable.scss"
import { moneyFormatter, routes } from "../../utils"
import { useNavigate, useSearchParams } from "react-router-dom"

type Props = {
  getTvl: (token: string) => void
  poolData: any
  isStaked?: boolean
}

export const PoolTable = ({ getTvl, poolData, isStaked }: Props): JSX.Element => {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  return (
    <div className="pool-table">
      <div className="pool-table-content">
        <div className="pool-table-content-scroll">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Network</th>
                <th>Periodic % Profit</th>
                <th className="right">{isStaked ? "Staked" : "Total Value Locked"}</th>
              </tr>
            </thead>
            <tbody>
              {(open ? poolData : poolData.slice(0, 8)).map((i, index) => (
                <tr onClick={() => navigate(`${routes.farms}?token=${i.token}&${search.toString()}`)} key={index}>
                  <td className="pool-table-content-item">
                    <img src={i.icon} alt="token" /> {i.token}
                  </td>
                  <td>{i.network}</td>
                  <td>Up to {i.percents[4] || i.percents[3]}%</td>
                  {/*@ts-ignore*/}
                  <td className="right">{moneyFormatter.format(getTvl(i.token) || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/*<SimpleButton onClick={toggleOpen} text={open ? "Hide" : "Show More"} variant="border" />*/}
      </div>
    </div>
  )
}
