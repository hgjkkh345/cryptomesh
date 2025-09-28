import React from "react"

import srcPath from "assets/pdfs/cryptomesh-pdf1.pdf"

export const Docs = (): JSX.Element => {
  return (
    <div className="docs">
      <embed src={srcPath} />
    </div>
  )
}
