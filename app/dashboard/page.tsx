"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Download, Upload, TrendingUp, Clock, Star, Users, Award } from "lucide-react"

export default function DashboardPage() {
  const { userData, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalDownloads: 0,
    resourcesUploaded: 0,
    studyStreak: 0,
    pointsEarned: 0,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recommendedResources, setRecommendedResources] = useState<any[]>([])

  useEffect(() => {
    if (!loading && !userData) {
      router.push("/login")
      return
    }

    // Simulate loading user stats
    const timer = setTimeout(() => {
      setStats({
        totalDownloads: 47,
        resourcesUploaded: 3,
        studyStreak: 12,
        pointsEarned: 1250,
      })

      setRecentActivity([
        {
          id: 1,
          type: "download",
          title: "Engineering Mathematics Past Questions",
          university: "University of Lagos",
          time: "2 hours ago",
        },
        {
          id: 2,
          type: "upload",
          title: "Computer Science 300L Notes",
          university: "University of Nigeria, Nsukka",
          time: "1 day ago",
        },
        {
          id: 3,
          type: "download",
          title: "Organic Chemistry Textbook",
          university: "Obafemi Awolowo University",
          time: "2 days ago",
        },
      ])

      setRecommendedResources([
        {
          id: 1,
          title: "Advanced Calculus Past Questions",
          university: "University of Ibadan",
          subject: "Mathematics",
          downloads: 234,
          rating: 4.8,
        },
        {
          id: 2,
          title: "Data Structures and Algorithms",
          university: "University of Lagos",
          subject: "Computer Science",
          downloads: 189,
          rating: 4.9,
        },
        {
          id: 3,
          title: "Microeconomics Theory Notes",
          university: "Ahmadu Bello University",
          subject: "Economics",
          downloads: 156,
          rating: 4.7,
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [userData, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your studies today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources Uploaded</CardTitle>
              <Upload className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resourcesUploaded}</div>
              <p className="text-xs text-muted-foreground">+1 this week</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.studyStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pointsEarned}</div>
              <p className="text-xs text-muted-foreground">Earn more by uploading</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest downloads and uploads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                      <div
                        className={`p-2 rounded-full ${activity.type === "download" ? "bg-blue-100" : "bg-green-100"}`}
                      >
                        {activity.type === "download" ? (
                          <Download
                            className={`h-4 w-4 ${activity.type === "download" ? "text-blue-600" : "text-green-600"}`}
                          />
                        ) : (
                          <Upload className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.university}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/resources">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Resources */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Recommended
                </CardTitle>
                <CardDescription>Resources you might like</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{resource.university}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{resource.subject}</Badge>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="h-3 w-3" />
                          <span>{resource.downloads}</span>
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/resources">
                    <Button variant="outline" className="w-full bg-transparent">
                      Browse All Resources
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/resources">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span>Browse Resources</span>
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Upload className="h-6 w-6" />
                    <span>Upload Resource</span>
                  </Button>
                </Link>
                <Link href="/pay">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Award className="h-6 w-6" />
                    <span>Upgrade Plan</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Progress */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Your learning journey this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Resources Downloaded</span>
                    <span>47/50</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Study Goals</span>
                    <span>8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Contribution Points</span>
                    <span>1250/1500</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
