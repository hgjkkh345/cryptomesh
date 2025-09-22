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

import "./SwapChartUsers.scss"

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

export const SwapChartUsers = ({ total }: Props): JSX.Element => {
  const labels = ['Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24','Jul 24','Aug 24','Sep 24','Oct 24','Nov 24','Dec 24','Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25'].reverse()

  const [data, setData] = useState<any>({
    labels,
    datasets: [
      {
        lineTension: 0.4,
        data: [3, 4, 6, 10, 12, 423, 34, 234, 245, 523, 653, 673, 42, 345, 235, 674, 1004, 1228, 1451],
        borderColor: "#69925f",
        fontColor: "#fff",
        backgroundColor: "#69925f",
      },
    ],
  })

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          // label: 'ETH',
          lineTension: 0.4,
          data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
          borderColor: "#69925f",
          color: "#fff",
          fontColor: "#fff",
          backgroundColor: "#69925f",
          fill: true,
          // stack: 'Stack 0',
        },
        // {
        //   label: 'USDT',
        //   lineTension: 0.4,
        //   data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
        //   borderColor: "#04975B",
        //   color: "#fff",
        //   fontColor: "#fff",
        //   backgroundColor: "#04975B",
        //   fill: true,
        //   stack: 'Stack 0',
        // },
        // {
        //   label: 'USDC',
        //   lineTension: 0.4,
        //   data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
        //   borderColor: "#96bedc",
        //   color: "#fff",
        //   fontColor: "#fff",
        //   backgroundColor: "#96bedc",
        //   fill: true,
        //   stack: 'Stack 0',
        // },
        // {
        //   label: 'LINK',
        //   lineTension: 0.4,
        //   data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
        //   borderColor: "#96BEDC",
        //   color: "#fff",
        //   fontColor: "#fff",
        //   backgroundColor: "#96BEDC",
        //   fill: true,
        //   stack: 'Stack 0',
        // },
        // {
        //   label: 'UNI',
        //   lineTension: 0.4,
        //   data: generateLabelsForWbtc().map(i => randomNumber(0, total)).concat([total]).sort((a, b) => Number(b) - Number(a)),
        //   borderColor: "#AE463E",
        //   color: "#fff",
        //   fontColor: "#fff",
        //   backgroundColor: "#AE463E",
        //   fill: true,
        //   stack: 'Stack 0',
        // },
      ],
    })
  }, [total])

  return (
    <div className="swap-chart">
      <div className="swap-chart-content">
        <div className="swap-chart-content-title">Monthly User Growth</div>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
