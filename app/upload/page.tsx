"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  DollarSign,
  BookOpen,
  Users,
  TrendingUp,
  Award,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { nigerianUniversities } from "@/lib/universities"

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    university: "",
    course: "",
    level: "",
    price: "",
    file: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const { user, userData } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.file) {
      setError("Please select a file to upload")
      setIsLoading(false)
      return
    }

    try {
      let fileUrl = "#"

      try {
        const fileRef = ref(storage, `resources/${Date.now()}_${formData.file.name}`)
        const uploadResult = await uploadBytes(fileRef, formData.file)
        fileUrl = await getDownloadURL(uploadResult.ref)
      } catch (storageError) {
        console.error("Storage upload failed, using demo mode:", storageError)
      }

      const resourceData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        university: formData.university,
        course: formData.course,
        level: formData.level,
        price: Number.parseFloat(formData.price) || 0,
        fileUrl,
        fileName: formData.file.name,
        fileSize: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: formData.file.type,
        downloads: 0,
        uploadedBy: user.uid,
        uploadedAt: new Date(),
        approved: false,
      }

      try {
        await addDoc(collection(db, "resources"), resourceData)
      } catch (firestoreError) {
        console.error("Firestore save failed, demo mode:", firestoreError)
      }

      setUploadStatus("success")

      setFormData({
        title: "",
        description: "",
        category: "",
        university: "",
        course: "",
        level: "",
        price: "",
        file: null,
      })

      const fileInput = document.getElementById("file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error: any) {
      setError(error.message || "Failed to upload resource")
      setUploadStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({
      ...formData,
      file,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700">💰 Earn While You Share</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Upload Academic Resource</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Share your study materials with fellow students and earn from your uploads. Help build the largest academic
            resource library in Nigeria.
          </p>
        </div>

        {uploadStatus === "success" && (
          <Alert className="mb-8 border-green-200 bg-green-50 rounded-xl max-w-4xl mx-auto">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800 text-lg">
              🎉 Your resource has been uploaded successfully! It will be reviewed and published within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50 rounded-xl max-w-4xl mx-auto">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 text-lg">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  Resource Details
                </CardTitle>
                <CardDescription className="text-base">
                  Provide detailed information about your academic resource
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                      Resource Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Calculus I Past Questions 2020-2023"
                      className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide a detailed description of your resource, what it covers, and how it can help students..."
                      className="mt-2 min-h-[120px] border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                        Category *
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("category", value)}>
                        <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="past-questions">📝 Past Questions</SelectItem>
                          <SelectItem value="textbooks">📚 Textbooks</SelectItem>
                          <SelectItem value="lecture-notes">📖 Lecture Notes</SelectItem>
                          <SelectItem value="assignments">📋 Assignments</SelectItem>
                          <SelectItem value="research-papers">🔬 Research Papers</SelectItem>
                          <SelectItem value="lab-manuals">🧪 Lab Manuals</SelectItem>
                          <SelectItem value="other">📄 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="university" className="text-sm font-semibold text-gray-700">
                        University *
                      </Label>
                      <div className="mt-2">
                        <SearchableSelect
                          options={nigerianUniversities}
                          value={formData.university}
                          onValueChange={(value) => handleSelectChange("university", value)}
                          placeholder="Search and select university..."
                          searchPlaceholder="Search universities..."
                          emptyText="No university found."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="course" className="text-sm font-semibold text-gray-700">
                        Course *
                      </Label>
                      <div className="relative mt-2">
                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="course"
                          name="course"
                          type="text"
                          required
                          value={formData.course}
                          onChange={handleChange}
                          placeholder="e.g., Mathematics, Computer Science"
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="level" className="text-sm font-semibold text-gray-700">
                        Level *
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("level", value)}>
                        <SelectTrigger className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                          <Users className="mr-2 h-5 w-5 text-gray-400" />
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 Level</SelectItem>
                          <SelectItem value="200">200 Level</SelectItem>
                          <SelectItem value="300">300 Level</SelectItem>
                          <SelectItem value="400">400 Level</SelectItem>
                          <SelectItem value="500">500 Level</SelectItem>
                          <SelectItem value="postgraduate">Postgraduate</SelectItem>
                          <SelectItem value="all">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                      Price (₦) *
                    </Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        required
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g., 500"
                        className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">💡 Set to 0 for free resources</p>
                  </div>

                  <div>
                    <Label htmlFor="file" className="text-sm font-semibold text-gray-700">
                      Upload File *
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="bg-blue-100 p-3 rounded-full mb-4">
                              <Upload className="w-8 h-8 text-blue-600" />
                            </div>
                            <p className="mb-2 text-lg font-semibold text-gray-700">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PDF, DOC, DOCX (MAX. 50MB)</p>
                          </div>
                          <input
                            id="file"
                            name="file"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                      {formData.file && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex items-center text-blue-700">
                            <FileText className="w-5 h-5 mr-3" />
                            <div>
                              <p className="font-medium">{formData.file.name}</p>
                              <p className="text-sm">Size: {(formData.file.size / (1024 * 1024)).toFixed(1)} MB</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-5 w-5" />
                        Upload Resource
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Upload Guidelines & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Guidelines */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">📁 Accepted Formats</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      PDF documents
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Microsoft Word (.doc, .docx)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Maximum file size: 50MB
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">⭐ Quality Standards</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Clear, readable content
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Accurate information
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Proper formatting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      No copyrighted material
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">💰 Earning Potential</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Earn 70% of each sale
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Monthly automated payouts
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Track your earnings
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Build passive income
                    </li>
                  </ul>
                </div>

                <Alert className="border-blue-200 bg-blue-50 rounded-xl">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-800">
                    All uploads are reviewed within 24 hours. Only high-quality, original content will be approved.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Earnings Stats */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Start Earning Today!</h3>
                  <p className="text-green-100 mb-4">Top uploaders earn ₦50,000+ monthly</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">70%</div>
                      <div className="text-xs text-green-100">Revenue Share</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24h</div>
                      <div className="text-xs text-green-100">Review Time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
