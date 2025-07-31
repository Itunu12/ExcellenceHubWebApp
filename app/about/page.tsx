import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Star,
  GraduationCap,
  Target,
  Heart,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description:
        "Access thousands of past questions, textbooks, lecture notes, and study materials from top Nigerian universities.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "All payments are processed securely through Paystack, and your downloads are available instantly after purchase.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Built by students, for students. Upload your own materials and earn from helping fellow students succeed.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Study anytime, anywhere. All your purchased resources are available for lifetime access on any device.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const stats = [
    { number: "100+", label: "Active Students", icon: Users },
    { number: "50+", label: "Study Resources", icon: BookOpen },
    { number: "15+", label: "Universities Covered", icon: GraduationCap },
    { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      university: "University of Lagos",
      course: "Computer Science",
      rating: 5,
      text: "StudyHub helped me access past questions that were crucial for my exams. The quality is excellent and the prices are very affordable.",
      avatar: "/placeholder.svg?height=60&width=60&text=AJ",
    },
    {
      name: "Fatima Mohammed",
      university: "Ahmadu Bello University",
      course: "Medicine",
      rating: 5,
      text: "I've uploaded several of my study materials and earned enough to cover my textbook expenses. It's a win-win platform!",
      avatar: "/placeholder.svg?height=60&width=60&text=FM",
    },
    {
      name: "Chinedu Okafor",
      university: "University of Nigeria, Nsukka",
      course: "Engineering",
      rating: 5,
      text: "The lecture notes I found here were better than what we got in class. Highly recommend to all university students.",
      avatar: "/placeholder.svg?height=60&width=60&text=CO",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, from content curation to user experience.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "We believe in the power of students helping students and building a supportive learning community.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously innovate to provide better tools and resources for academic success.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🚀 Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About StudyHub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to democratize access to quality educational
              resources for university students across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700">
                🎯 Our Mission
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Student Success
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                StudyHub was created to solve a common problem faced by
                university students across Nigeria - the difficulty in accessing
                quality study materials, past questions, and academic resources.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that every student deserves access to the resources
                they need to excel academically, regardless of their location or
                financial situation. That's why we've created a platform where
                students can easily find, purchase, and share academic
                materials.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    Affordable pricing for all students
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    Quality-assured content
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">
                    Supporting student entrepreneurs
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Why Choose StudyHub?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Star className="h-6 w-6 mr-4 text-yellow-300" />
                  <span className="text-lg">
                    Curated by top students and educators
                  </span>
                </li>
                <li className="flex items-center">
                  <Star className="h-6 w-6 mr-4 text-yellow-300" />
                  <span className="text-lg">Instant access after payment</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-6 w-6 mr-4 text-yellow-300" />
                  <span className="text-lg">Mobile-friendly platform</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-6 w-6 mr-4 text-yellow-300" />
                  <span className="text-lg">24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              ✨ Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Academic Success
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools and resources in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2"
                >
                  <CardHeader>
                    <div
                      className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">
              📊 Our Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              StudyHub by the Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of students who trust StudyHub
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              💎 Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2"
                >
                  <CardContent className="pt-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">
              ⭐ Student Reviews
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardContent className="pt-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.course}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.university}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How StudyHub Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to access premium academic resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Browse & Search</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Explore our extensive library of study materials, past
                questions, and textbooks from various universities and courses.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Purchase Securely</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Pay safely using our Paystack integration with support for
                cards, bank transfers, and mobile money.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Download & Study</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get instant access to your purchased materials and download them
                for offline study anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who are already using StudyHub to achieve
            academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
