"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, CreditCard, Zap, Crown, Users, BookOpen, Download, Award, Sparkles } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const plans = [
  {
    name: "Basic",
    price: "₦2,500",
    period: "/month",
    description: "Perfect for getting started with premium content",
    features: [
      "Access to 50+ premium resources",
      "Basic skill programs",
      "Email support",
      "Mobile app access",
      "Download up to 10 resources/month",
      "Standard quality materials",
    ],
    popular: false,
    buttonText: "Start Basic Plan",
    color: "from-blue-500 to-cyan-500",
    icon: BookOpen,
  },
  {
    name: "Pro",
    price: "₦5,000",
    period: "/month",
    description: "Most popular choice for serious students",
    features: [
      "Access to 200+ premium resources",
      "All skill programs included",
      "Priority email & chat support",
      "Mobile & desktop app access",
      "Unlimited downloads",
      "Live webinars & workshops",
      "Certificate of completion",
      "HD quality materials",
    ],
    popular: true,
    buttonText: "Start Pro Plan",
    color: "from-purple-500 to-pink-500",
    icon: Crown,
  },
  {
    name: "Premium",
    price: "₦8,500",
    period: "/month",
    description: "Complete access with personalized mentorship",
    features: [
      "Access to all premium resources",
      "All skill programs + exclusive content",
      "24/7 priority support",
      "All platform features",
      "Unlimited everything",
      "1-on-1 mentorship sessions",
      "Career guidance & job placement",
      "Custom learning paths",
      "4K quality materials",
    ],
    popular: false,
    buttonText: "Start Premium Plan",
    color: "from-orange-500 to-red-500",
    icon: Sparkles,
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your payment information is encrypted and secure with Paystack's industry-leading security.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Get immediate access to premium content as soon as your payment is processed.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Crown,
    title: "Premium Quality",
    description: "All premium content is carefully curated and regularly updated by industry experts.",
    color: "bg-purple-100 text-purple-600",
  },
]

export default function PayPage() {
  const handlePaystackPayment = (planName: string, amount: string) => {
    alert(`Redirecting to Paystack for ${planName} plan payment of ${amount}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🚀 Unlock Your Potential</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Unlock Premium Content</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect plan to access exclusive study resources, advanced skill programs, and premium features
              designed to accelerate your academic success.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">💰 Best Value Plans</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All plans include access to our core features. Upgrade anytime to unlock more resources and benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={index}
                  className={`relative hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 ${
                    plan.popular ? "ring-4 ring-purple-500/20 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 shadow-lg">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 relative">
                    <div
                      className={`bg-gradient-to-r ${plan.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold mb-4">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 text-lg">{plan.period}</span>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      }`}
                      onClick={() => handlePaystackPayment(plan.name, plan.price)}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">✨ Premium Benefits</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Premium?</h2>
            <p className="text-xl text-gray-600">Experience the benefits of premium membership</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2"
                >
                  <CardContent className="pt-8">
                    <div
                      className={`${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700">🔒 Secure Payment</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Secure Payment with Paystack</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            We use Paystack to ensure your payments are secure and processed instantly. Pay with your debit card, bank
            transfer, or mobile money.
          </p>

          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200/50">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-8 w-8 text-white mx-auto" />
                </div>
                <span className="text-sm font-medium text-gray-600">Debit Cards</span>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white mx-auto" />
                </div>
                <span className="text-sm font-medium text-gray-600">Bank Transfer</span>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white mx-auto" />
                </div>
                <span className="text-sm font-medium text-gray-600">Mobile Money</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-500" />
              <span>SSL encrypted and PCI compliant</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
              <span>No hidden fees or charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">❓ Got Questions?</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  Can I cancel my subscription anytime?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Yes, you can cancel your subscription at any time. You'll continue to have access to premium features
                  until the end of your current billing period. No questions asked!
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  Do you offer student discounts?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Yes! We offer special student pricing and bulk discounts for study groups. Contact our support team
                  with your student ID for discount eligibility and group rates.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  What payment methods do you accept?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  We accept all major debit cards, bank transfers, and mobile money payments through our secure Paystack
                  integration. All transactions are encrypted and secure.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <Download className="h-5 w-5 text-orange-600" />
                  </div>
                  Can I download resources for offline use?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  All purchased resources can be downloaded and accessed offline. You have lifetime access to your
                  purchases and can re-download them anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
