// Clears the app's localStorage once per deploy. Runs on import, so it must be
// the first import in index.tsx: wagmi reads its wallet state when it is created.
const BUILD_ID_KEY = "app_build_id"

// Wallet state (wagmi, Web3Modal/AppKit, WalletConnect) is kept so connected wallets stay connected.
const KEEP_PREFIXES = ["wagmi", "W3M", "@w3m", "@appkit", "wc@", "WALLETCONNECT"]

export const resetStorageOnNewBuild = () => {
  try {
    const buildId = process.env.REACT_APP_BUILD_ID
    // No build id (dev server) or same build as last visit: nothing to do
    if (!buildId || localStorage.getItem(BUILD_ID_KEY) === buildId) return

    const doomed: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key !== BUILD_ID_KEY && !KEEP_PREFIXES.some((prefix) => key.startsWith(prefix))) {
        doomed.push(key)
      }
    }
    doomed.forEach((key) => localStorage.removeItem(key))
    localStorage.setItem(BUILD_ID_KEY, buildId)
  } catch {
    // storage blocked (private mode, site data disabled): carry on without a reset
  }
}

resetStorageOnNewBuild()
