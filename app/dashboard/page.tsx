import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { MentalHealthCard } from "@/components/dashboard/mental-health-card"
import { PhysicalHealthCard } from "@/components/dashboard/physical-health-card"
import { QuickActionsBar } from "@/components/dashboard/quick-actions-bar"
import { RecentActivityFeed } from "@/components/dashboard/recent-activity-feed"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <DashboardHero />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MentalHealthCard />
        <PhysicalHealthCard />
      </div>

      <QuickActionsBar />

      <RecentActivityFeed />
    </div>
  )
}
