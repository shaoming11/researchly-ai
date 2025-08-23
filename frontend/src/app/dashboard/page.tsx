import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Mic, Mail } from "lucide-react"

const campaigns = [
  {
    name: "Fall 2025 ML Research",
    status: "Completed",
    responses: "14/70",
    followupDate: "Aug 2025",
    statusColor: "bg-green-600"
  },
  {
    name: "Spring 2025 AI Ethics",
    status: "Drafting",
    responses: "8/45",
    followupDate: "Sep 2025",
    statusColor: "bg-yellow-400"
  },
  {
    name: "Fall 2025 Computer Vision",
    status: "Active",
    responses: "22/100",
    followupDate: "Aug 2025",
    statusColor: "bg-blue-400"
  }
]

export default function Dashboard() {
  const actionButtonClass = "bg-black hover:bg-gray-800 text-white h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl text-foreground">Researchly AI</span>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 lg:px-12">
        {/* Hero Section with Action Buttons */}
        <section className="pt-24 pb-32">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Research Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take action on your academic goals with our powerful tools
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-3xl">
              <Button className={`flex-1 ${actionButtonClass}`} asChild>
                <a href="/professors">
                  <Search className="mr-3 h-6 w-6" />
                  Find Professors
                </a>
              </Button>
              <Button className={`flex-1 ${actionButtonClass}`}>
                <Plus className="mr-3 h-6 w-6" />
                Start New Campaign
              </Button>
            </div>
            <div className="w-full max-w-lg">
              <Button className={`w-full ${actionButtonClass}`}>
                <Mic className="mr-3 h-6 w-6" />
                Practice Interview
              </Button>
            </div>
          </div>
        </section>

        {/* Supporting Dashboard Content */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Recent Activity */}
            <Card className="shadow-sm border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full ${campaign.statusColor} mr-2`}></div>
                        <span className="text-sm text-gray-600">{campaign.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{campaign.responses}</div>
                      <div className="text-xs text-gray-500">{campaign.followupDate}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-sm border border-gray-200 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-800">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-black mb-1">23.4%</div>
                  <div className="text-sm text-gray-600">Overall Response Rate</div>
                  <div className="text-xs text-gray-500 mt-1">+2.1% from last month</div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Top Email Types</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Research Collaboration</span>
                      <Badge variant="secondary" className="bg-black/10 text-black text-xs">28%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PhD Inquiry</span>
                      <Badge variant="secondary" className="bg-black/10 text-black text-xs">22%</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Seasonal Trends</h4>
                  <div className="text-sm text-gray-600 mb-2">Fall semester performs best</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Fall: 26%</span>
                    <span>Spring: 21%</span>
                    <span>Summer: 19%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}