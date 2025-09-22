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
import { Line } from "react-chartjs-2"

import "./SwapChartPools.scss"
import { moneyFormatter } from "../../utils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

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
}

type Props = {
  poolsTotalTvl: number
  isWbtcSecond?: boolean
}

export const SwapChartPools = ({ poolsTotalTvl, isWbtcSecond }: Props): JSX.Element => {
  const [tab, setTab] = useState("liquidity")
  const labels = ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30"]
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

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }

  const generateLabelsForWbtc = () => {
    const currentDay = new Date().getUTCDate();

    const howManyDaysToDisplay = currentDay - 15

    return Array.from(Array(howManyDaysToDisplay).keys()).map(i => (i + 16).toString())
  }

  useEffect(() => {
    if (poolsTotalTvl > 0) {
      if (isWbtcSecond) {
        const fakeData = generateLabelsForWbtc().map(i => randomNumber(0, poolsTotalTvl))
        fakeData.pop()
        fakeData.push(poolsTotalTvl)
        setData({
          labels: generateLabelsForWbtc(),
          datasets: [
            {
              lineTension: 0.4,
              fill: true,
              reverse: true,
              data: fakeData.sort((a, b) => Number(a) - Number(b)),
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
      } else {
        const fakeData = labels.map(i => randomNumber(0, poolsTotalTvl))
        fakeData.pop()
        fakeData.push(poolsTotalTvl)
        setData({
          labels,
          datasets: [
            {
              lineTension: 0.4,
              fill: true,
              reverse: true,
              data: fakeData.sort((a, b) => Number(a) - Number(b)),
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
      }
    }
  }, [poolsTotalTvl])

  return (
    <div className="swap-chart-token">
      <div className="swap-chart-token-content">
        <div className="swap-chart-token-header">
          <div>
            <div className="swap-chart-token-header-title">{moneyFormatter.format(poolsTotalTvl)}</div>
            <div className="swap-chart-token-header-date">{new Date().toLocaleString()}</div>
          </div>
          {/*<div className="swap-chart-token-tabs">*/}
          {/*  <button*/}
          {/*    onClick={() => setTab("liquidity")}*/}
          {/*    className={cn("swap-chart-token-tabs-item", {*/}
          {/*      active: tab === "liquidity",*/}
          {/*    })}*/}
          {/*  >*/}
          {/*    Liquidity*/}
          {/*  </button>*/}
          {/*  <button*/}
          {/*    onClick={() => setTab("fees")}*/}
          {/*    className={cn("swap-chart-token-tabs-item", {*/}
          {/*      active: tab === "fees",*/}
          {/*    })}*/}
          {/*  >*/}
          {/*    Fees*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
        {tab === "liquidity" && <Line options={optionsTwo} data={data} />}
      </div>
    </div>
  )
}
