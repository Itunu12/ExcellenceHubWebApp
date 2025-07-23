"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Download, Star, ArrowRight, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description:
      "Access thousands of past questions, lecture notes, textbooks, and study guides from top Nigerian universities.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of students sharing knowledge and helping each other succeed academically.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Download,
    title: "Easy Downloads",
    description: "Download resources instantly in various formats. Access your materials offline anytime, anywhere.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All resources are verified and curated to ensure accuracy and relevance to your curriculum.",
    color: "bg-orange-100 text-orange-600",
  },
]

const stats = [
  { label: "Active Students", value: "50,000+", icon: Users },
  { label: "Universities", value: "200+", icon: BookOpen },
  { label: "Resources", value: "10,000+", icon: Download },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
]

const testimonials = [
  {
    name: "Adebayo Ogundimu",
    university: "University of Lagos",
    course: "Computer Science",
    text: "StudyHub helped me access past questions that were crucial for my final exams. The quality of resources is outstanding!",
    rating: 5,
  },
  {
    name: "Fatima Mohammed",
    university: "Ahmadu Bello University",
    course: "Medicine",
    text: "The lecture notes and textbooks available here saved me countless hours of research. Highly recommended!",
    rating: 5,
  },
  {
    name: "Chinedu Okwu",
    university: "University of Nigeria, Nsukka",
    course: "Engineering",
    text: "As a final year student, StudyHub's resources were invaluable for my project research and exam preparation.",
    rating: 5,
  },
]

export default function HomePage() {
  const { userData, isDevelopment } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {isDevelopment && (
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-100 border-yellow-400/30">
                🚀 Demo Mode - No Setup Required
              </Badge>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Access premium study resources, past questions, and educational materials from top Nigerian universities.
              Join thousands of students achieving their academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {userData ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  Browse Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">✨ Why Choose StudyHub</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive educational resources and tools designed specifically for Nigerian students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">💬 Student Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Students Say About Us</h2>
            <p className="text-xl text-gray-600">Join thousands of successful students who trust StudyHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.course}</div>
                    <div className="text-sm text-blue-600">{testimonial.university}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            Join StudyHub today and get instant access to premium educational resources that will transform your
            academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {userData ? (
              <Link href="/resources">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Browse Resources
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pay">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                  >
                    View Pricing
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
