"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { Home, Brain, Activity, FileText, User, Settings, Menu, X, LogOut, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function AppSidebar() {
  const pathname = usePathname()
  const { openMobile, setOpenMobile, isMobile } = useSidebar()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Mental Health",
      icon: Brain,
      href: "/mental-health",
    },
    {
      title: "Symptom Checker",
      icon: Activity,
      href: "/symptom-checker",
    },
    {
      title: "Health Records",
      icon: FileText,
      href: "/health-records",
    },
    {
      title: "Doctor Portal",
      icon: User,
      href: "/doctor-portal",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold gradient-text">HealthCare</h2>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setOpenMobile(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto py-4">
                <nav className="space-y-1 px-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">Patient</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
      <div className="flex flex-col flex-grow border-r bg-card">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold gradient-text">HealthCare</h1>
          </Link>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Patient</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
