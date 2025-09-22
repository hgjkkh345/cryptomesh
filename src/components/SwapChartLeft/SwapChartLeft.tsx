import React, { useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

import "./SwapChartLeft.scss"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#fff',
      },
    },
    y: {
      display: false,
    },
  },
}

export const SwapChartLeft = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)

  const labels = ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24"]

  const data = {
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: [3, 4, 6, 10, 12, 423, 34, 234, 245, 523, 653, 673, 42, 345, 235, 674],
      },
    ],
  }

  return (
    <div className="swap-chart">
      <div className="swap-chart-content">
        <div className="swap-chart-content-title">Volume 24h</div>
        <div className="swap-chart-content-subtitle">$141.60M</div>
        <div className="swap-chart-content-desc">Apr 24, 2023 (UTC)</div>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
