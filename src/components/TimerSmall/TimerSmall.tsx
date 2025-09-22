import { useEffect, useState } from "react"

type Props = {
  time: number
}

export const TimerSmall = ({ time }: Props): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState("")

  var timestamp = time * 1000 - Date.now()
  timestamp /= 1000 // from ms to seconds

  function component(x, v) {
    return Math.floor(x / v)
  }

  useEffect(() => {
    if (time > 0) {
      setInterval(function () {
        // execute code each second

        timestamp-- // decrement timestamp with one second each second

        var days = component(timestamp, 24 * 60 * 60), // calculate days from timestamp
          hours = component(timestamp, 60 * 60) % 24, // hours
          minutes = component(timestamp, 60) % 60, // minutes
          seconds = component(timestamp, 1) % 60 // seconds

        setTimeLeft(
          `${days > 0 ? `${days}d ` : ""}` +
            `${hours > 0 ? `${hours}h ` : ""}` +
            `${minutes > 0 ? `${minutes}m ` : ""}` +
            `${seconds > 0 ? `${seconds}s ` : "0"}`,
        ) // display
      }, 1000)
    }
  }, [time])

  return <div className="text">{timeLeft}</div>
}
