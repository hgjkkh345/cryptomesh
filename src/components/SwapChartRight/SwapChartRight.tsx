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

import "./SwapChartRight.scss"
import {getChainId} from "@wagmi/core";
import {config} from "../../index";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      // staked: true,
      reverse: true,
      ticks: {
        color: "white", // not 'fontColor:' anymore
        // fontSize: 18,
      }
    },
    y: {
      // staked: true,
      ticks: {
        color: "white", // not 'fontColor:' anymore
        // fontSize: 18,
      }
    },
  },
}

type Props = {
  total: number
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

const generateLabelsForWbtc = () => {
  // const howManyDaysToDisplay = new Date().getDate()

  return Array.from(Array(20).keys()).map(i => (i + 16).toString())
}

export const SwapChartRight = ({ total }: Props): JSX.Element => {
  const chainId = getChainId(config)
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
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#F4F4F4",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#F4F4F4",
          fill: true,
        },
      ],
    })
  }, [total])

  return (
    <div className="swap-chart">
      <div className="swap-chart-content">
        <div className="swap-chart-content-title">{(chainId === 1 || !chainId) && 'Ethereum '}
          {chainId === 56 && 'Binance Smart Chain '}
          {chainId === 10 && 'Optimism '}
          {chainId === 250 && 'Fantom '}
          {chainId === 42161 && 'Arbitrum One '}
          {chainId === 137 && 'Polygon '}
          {chainId === 8453 && 'Base '}
          {chainId === 169 && 'Manta '}
          {chainId === 43114 && 'Avalanche '} Total Value Locked</div>
        <div className="swap-chart-content-desc">{new Date().toLocaleDateString()}</div>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
