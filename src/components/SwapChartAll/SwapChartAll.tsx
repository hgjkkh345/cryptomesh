import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js"
import {Bar} from "react-chartjs-2"

import "./SwapChartRightNew.scss"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as any,
      labels: {
        color: "#fff",
      }
    }
  },
  scales: {
    x: {
      staked: true,
      reverse: true,
      ticks: {
        color: "white", // not 'fontColor:' anymore
        // fontSize: 18,
      }
    },
    y: {
      staked: true,
      ticks: {
        color: "white", // not 'fontColor:' anymore
        // fontSize: 18,
      }
    },
  },
}

type Props = {
  totalEth: number
  totalBnb: number
  totalOpt: number
  totalFan: number
  totalArb: number
  totalAvax: number
  totalBase: number
  totalPol: number
  totalManta: number
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

const generateLabelsForWbtc = () => {
  const howManyDaysToDisplay = 20

  return Array.from(Array(howManyDaysToDisplay).keys()).map(i => (i + 16).toString())
}

export const SwapChartAll = ({ totalEth, totalArb, totalAvax, totalBase, totalBnb, totalFan, totalManta, totalOpt, totalPol }: Props): JSX.Element => {
  const labels = ['Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24','Jul 24','Aug 24','Sep 24','Oct 24','Nov 24','Dec 24','Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25'].reverse()

  const [data, setData] = useState<any>({
    labels,
    datasets: [
      {
        lineTension: 0.4,
        data: [3, 4, 6, 10, 12, 423, 34, 234, 245, 523, 653, 673, 42, 345, 235, 674],
        borderColor: "#96bedc",
        fontColor: "#fff",
        backgroundColor: "#96bedc",
      },
    ],
  })

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Ethereum',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalEth)).concat([totalEth]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#96bedc",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#96bedc",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'BNB Chain',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalBnb)).concat([totalBnb]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#e9d094",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#e9d094",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Optimism',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalOpt)).concat([totalOpt]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#ae463e",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#ae463e",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Arbitrum',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalArb)).concat([totalArb]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#0f90f1",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#0f90f1",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Fantom',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalFan)).concat([totalFan]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#96BEDC",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#96BEDC",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Avalanche',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalAvax)).concat([totalAvax]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#f56868",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#f56868",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Base',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalBase)).concat([totalBase]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#51f2f9",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#51f2f9",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Polygon',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalPol)).concat([totalPol]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#47506a",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#47506a",
          fill: true,
          stack: 'Stack 0',
        },
        {
          label: 'Manta',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, totalManta)).concat([totalManta]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#e090f2",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#e090f2",
          fill: true,
          stack: 'Stack 0',
        },
      ],
    })
  }, [totalManta, totalPol, totalBase, totalAvax, totalFan, totalArb, totalBnb, totalEth, totalOpt])

  return (
    <div className="swap-chart">
      <div className="swap-chart-content">
        <div className="swap-chart-content-title">Aggregate Total Value Locked</div>
        <div className="swap-chart-content-desc">{new Date().toLocaleDateString()}</div>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
