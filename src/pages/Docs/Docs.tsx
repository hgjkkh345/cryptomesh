import React from "react"

import srcPath from "assets/pdfs/arclaim.pdf"

export const Docs = (): JSX.Element => {
  return (
    <div className="docs">
      <embed src={srcPath} />
    </div>
  )
}
