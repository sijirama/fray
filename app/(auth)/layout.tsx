import { ReactNode } from "react"

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default Layout
