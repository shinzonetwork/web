'use client'
import type React from "react"
import { useState } from "react"
import Sidebar from "@/components/sidebar/sidebar"

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`${isCollapsed ? "lg:pl-20" : "lg:pl-70"}`} style={{ transition: "padding 300ms" }}>
            {children}
        </main>
    </div>
  )
}
