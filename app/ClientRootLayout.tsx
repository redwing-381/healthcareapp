"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </SidebarProvider>
    </ThemeProvider>
  )
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // This is a client component that conditionally renders the sidebar
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
}

// This needs to be a client component to use usePathname
function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  "use client"
  const pathname = usePathname()
  const isLandingPage = pathname === "/"

  if (isLandingPage) {
    // Landing page doesn't have the sidebar
    return <>{children}</>
  }

  // All other pages have the sidebar
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto md:ml-64 pt-16 md:pt-0">{children}</main>
    </div>
  )
}
