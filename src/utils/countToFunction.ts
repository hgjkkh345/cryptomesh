export function animateNumber(callback, from, to, duration) {
  let start = null
  const animate = timestamp => {
    start = start || timestamp
    // @ts-ignore
    const progress = Math.min((timestamp - start) / duration, 1)
    callback(progress * (to - from) + from)
    if (progress < 1) {
      window.requestAnimationFrame(animate)
    }
  }
  window.requestAnimationFrame(animate)
}
