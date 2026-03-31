import React from "react"

import srcPath from "assets/pdfs/audit-cryptomesh.pdf"

export const Audit = (): JSX.Element => {
  return (
    <div className="docs">
      <embed src={srcPath} />
    </div>
  )
}
