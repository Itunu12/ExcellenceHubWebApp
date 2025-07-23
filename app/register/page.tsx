"use client";

import type React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { universities } from "@/lib/universities";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const levels = [
  { value: "100", label: "100 Level" },
  { value: "200", label: "200 Level" },
  { value: "300", label: "300 Level" },
  { value: "400", label: "400 Level" },
  { value: "500", label: "500 Level" },
  { value: "postgraduate", label: "Postgraduate" },
];

const courses = [
  // Computer & IT
  "Computer Science",
  "Information Technology",
  "Cybersecurity",
  "Software Engineering",
  "Data Science",

  // Medical & Health Sciences
  "Medicine and Surgery",
  "Nursing",
  "Pharmacy",
  "Medical Laboratory Science",
  "Anatomy",
  "Physiology",
  "Public Health",
  "Radiography",
  "Dentistry",

  // Law & Social Sciences
  "Law",
  "Political Science",
  "Sociology",
  "Psychology",
  "International Relations",
  "Criminology",

  // Engineering (Expanded)
  "Mechanical Engineering",
  "Electrical and Electronics Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Computer Engineering",
  "Mechatronics Engineering",
  "Petroleum Engineering",
  "Agricultural Engineering",
  "Biomedical Engineering",
  "Structural Engineering",
  "Industrial & Production Engineering",
  "Environmental Engineering",
  "Metallurgical and Materials Engineering",

  // Business & Management
  "Business Administration",
  "Accounting",
  "Economics",
  "Banking and Finance",
  "Marketing",
  "Entrepreneurship",

  // Pure & Applied Sciences
  "Biology",
  "Microbiology",
  "Chemistry",
  "Biochemistry",
  "Physics",
  "Mathematics",
  "Statistics",
  "Geology",

  // Arts & Humanities
  "English Language",
  "Linguistics",
  "History and International Studies",
  "Philosophy",
  "Religious Studies",
  "Theatre Arts",

  // Environmental & Design
  "Architecture",
  "Urban and Regional Planning",
  "Estate Management",
  "Quantity Surveying",
  "Fine and Applied Arts",
  "Geography and Environmental Management",

  // Agriculture
  "Agriculture",
  "Agronomy",
  "Animal Science",
  "Soil Science",
  "Fisheries and Aquaculture",
  "Forestry and Wildlife Management",
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    level: "",
    course: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, isDevelopment } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        university: formData.university,
        level: formData.level,
        course: formData.course,
      });
      toast.success("Signup successful!");
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      firstName: "Demo",
      lastName: "User",
      email: "demo@studyhub.ng",
      password: "demo123",
      confirmPassword: "demo123",
      university: "University of Lagos",
      level: "300",
      course: "Computer Science",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Join StudyHub</CardTitle>
            <CardDescription className="text-base">
              Create your account to access premium study resources
            </CardDescription>
            {isDevelopment && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>Demo Mode:</strong> Fill any details or use demo data
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDemoFill}
                  className="w-full bg-transparent"
                >
                  Fill Demo Data
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Create password"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm password"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Academic Information
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">University</Label>
                  <SearchableSelect
                    options={universities.map((uni) => ({
                      value: uni.name,
                      label: uni.name,
                    }))}
                    value={formData.university}
                    onValueChange={(value) =>
                      handleInputChange("university", value)
                    }
                    placeholder="Select your university"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Level</Label>
                    <SearchableSelect
                      options={levels}
                      value={formData.level}
                      onValueChange={(value) =>
                        handleInputChange("level", value)
                      }
                      placeholder="Select your level"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Course of Study
                    </Label>
                    <SearchableSelect
                      options={courses.map((course) => ({
                        value: course,
                        label: course,
                      }))}
                      value={formData.course}
                      onValueChange={(value) =>
                        handleInputChange("course", value)
                      }
                      placeholder="Select your course"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
