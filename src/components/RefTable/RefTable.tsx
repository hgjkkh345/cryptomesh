import React, { useState } from "react"

import "./RefTable.scss"
import { SimpleButton } from "../SimpleButton"
import { refData } from "./data"

export const RefTable = (): JSX.Element => {
  const dataSorted = refData.sort((a, b) => b.money - a.money)
  const smallData = dataSorted.slice(0, 10)
  const [open, setOpen] = useState(false)

  const toggleTable = () => setOpen(!open)

  return (
    <div className="ref-table">
      <div className="ref-table-content">
        <h2 className="ref-table-title">Leaderboard</h2>
        <div className="ref-table-content-scroll">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Referrer</th>
                <th className="right">Referrals</th>
                <th className="right">Earnings USD</th>
              </tr>
            </thead>
            <tbody>
              {(open ? dataSorted : smallData).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.account}</td>
                  <td className="right">{item.referrals.toFixed(0)}</td>
                  <td className="right">{item.money.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SimpleButton text={open ? "Hide" : "Show More"} variant="border" onClick={toggleTable} />
      </div>
    </div>
  )
}
