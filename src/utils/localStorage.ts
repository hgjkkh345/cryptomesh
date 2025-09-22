export const setToLocalStorage = (itemName: string, data: any) => {
  localStorage.setItem(itemName, JSON.stringify(data))
}

export const getFromLocalStorage = (itemName: string) => {
  if (localStorage.getItem(itemName) === null) {
    return undefined
  }
  return JSON.parse(localStorage.getItem(itemName) || "")
}