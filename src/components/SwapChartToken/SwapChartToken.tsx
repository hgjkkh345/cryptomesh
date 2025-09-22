import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement, ScriptableContext,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"

import "./SwapChartToken.scss"
import cn from "classnames"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { moneyFormatter } from "../../utils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

const optionsOne = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {},
    y: {
      display: false,
    },
  },
}

const optionsTwo = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {},
    y: {
      display: false,
    },
  },
  // elements: {
  //   point: {
  //     radius: 0,
  //   },
  // },
}

type Props = {
  tokenId: string
  totalMoney: number
}

export const SwapChartToken = ({ tokenId, totalMoney }: Props): JSX.Element => {
  const [tab, setTab] = useState("liquidity")
  const labels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ]
  const [data, setData] = useState<any>({
    labels,
    datasets: [
      {
        lineTension: 0.4,
        fill: true,
        // label: 'Dataset 1',
        data: [0],
        borderColor: "#58ff44",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -250, 0, 550);
          gradient.addColorStop(0, "rgba(0, 162, 253, 1)");
          gradient.addColorStop(1, "rgba(0, 162, 253, 0)");
          return gradient;
        },

      },
    ],
  })
  const [dataSecond, setDataSecond] = useState<any>({
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: [3, 4, 6, 10, 12, 423, 34, 234, 245, 523, 653, 673, 42, 345, 235, 674],
        backgroundColor: "#58ff44",
      },
    ],
  })
  const [dataThird, setDataThird] = useState<any>({
    labels,
    datasets: [
      {
        lineTension: 0.4,
        fill: true,
        data: [0],
        borderColor: "#58ff44",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -250, 0, 550);
          gradient.addColorStop(0, "rgba(0, 162, 253, 1)");
          gradient.addColorStop(1, "rgba(0, 162, 253, 0)");
          return gradient;
        },

      },
    ],
  })

  useEffect(() => {
    apiCoin.getChart(tokenId).then(r => {
      setData({
        labels,
        datasets: [
          {
            lineTension: 0.4,
            fill: true,
            reverse: true,
            // label: 'Dataset 1',
            data: r.prices,
            borderColor: "#58ff44",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, -250, 0, 550);
              gradient.addColorStop(0, "rgba(0, 162, 253, 1)");
              gradient.addColorStop(1, "rgba(0, 162, 253, 0)");
              return gradient;
            },

          },
        ],
      })
      setDataSecond({
        labels,
        datasets: [
          {
            data: r.market_caps?.map(i => i[1]),
            backgroundColor: "#58ff44",
          },
        ],
      })
      setDataThird({
        labels,
        datasets: [
          {
            lineTension: 0.4,
            fill: true,
            reverse: true,
            data: r.total_volumes,
            borderColor: "#58ff44",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, -250, 0, 550);
              gradient.addColorStop(0, "rgba(0, 162, 253, 1)");
              gradient.addColorStop(1, "rgba(0, 162, 253, 0)");
              return gradient;
            },

          },
        ],
      })
    })
  }, [])

  return (
    <div className="swap-chart-token">
      <div className="swap-chart-token-content">
        <div className="swap-chart-token-header">
          <div>
            <div className="swap-chart-token-header-title">{moneyFormatter.format(totalMoney)}</div>
            <div className="swap-chart-token-header-date">{new Date().toLocaleString()}</div>
          </div>
          <div className="swap-chart-token-tabs">
            <button
              onClick={() => setTab("liquidity")}
              className={cn("swap-chart-token-tabs-item", {
                active: tab === "liquidity",
              })}
            >
              Prices
            </button>
            <button
              onClick={() => setTab("fees")}
              className={cn("swap-chart-token-tabs-item", {
                active: tab === "fees",
              })}
            >
              Market Cap
            </button>
            <button
              onClick={() => setTab("volume")}
              className={cn("swap-chart-token-tabs-item", {
                active: tab === "volume",
              })}
            >
              Volume
            </button>
          </div>
        </div>
        {tab === "fees" && <Bar options={optionsOne} data={dataSecond} />}
        {tab === "liquidity" && <Line options={optionsTwo} data={data} />}
        {tab === "volume" && <Line options={optionsTwo} data={dataThird} />}
      </div>
    </div>
  )
}
