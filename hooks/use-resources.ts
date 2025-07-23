"use client"

import { useState, useEffect } from "react"

interface Resource {
  id: string
  title: string
  type: string
  university: string
  subject: string
  level: string
  year: string
  downloads: number
  rating: number
  isPremium: boolean
  description: string
  fileSize: string
  uploadedBy: string
  uploadDate: string
}

interface University {
  id: string
  name: string
}

interface UseResourcesParams {
  searchTerm?: string
  university?: string
  type?: string
  level?: string
  subject?: string
}

// Mock data for demonstration
const mockResources: Resource[] = [
  {
    id: "1",
    title: "Computer Science 300L Past Questions (2020-2023)",
    type: "Past Questions",
    university: "University of Lagos",
    subject: "Computer Science",
    level: "300 Level",
    year: "2023",
    downloads: 1250,
    rating: 4.8,
    isPremium: true,
    description: "Comprehensive collection of past questions for CS 300L courses",
    fileSize: "2.5 MB",
    uploadedBy: "Dr. Adebayo",
    uploadDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Engineering Mathematics Lecture Notes",
    type: "Lecture Notes",
    university: "University of Ibadan",
    subject: "Mathematics",
    level: "200 Level",
    year: "2023",
    downloads: 890,
    rating: 4.6,
    isPremium: false,
    description: "Complete lecture notes for Engineering Mathematics",
    fileSize: "5.2 MB",
    uploadedBy: "Prof. Okafor",
    uploadDate: "2024-01-10",
  },
  {
    id: "3",
    title: "Organic Chemistry Textbook - Nigerian Edition",
    type: "Textbooks",
    university: "Ahmadu Bello University",
    subject: "Chemistry",
    level: "300 Level",
    year: "2023",
    downloads: 2100,
    rating: 4.9,
    isPremium: true,
    description: "Comprehensive organic chemistry textbook adapted for Nigerian curriculum",
    fileSize: "15.8 MB",
    uploadedBy: "Dr. Fatima",
    uploadDate: "2024-01-08",
  },
  {
    id: "4",
    title: "Business Administration Research Methods",
    type: "Research Papers",
    university: "University of Nigeria, Nsukka",
    subject: "Business Administration",
    level: "400 Level",
    year: "2023",
    downloads: 567,
    rating: 4.4,
    isPremium: false,
    description: "Research methodology guide for business students",
    fileSize: "3.1 MB",
    uploadedBy: "Prof. Emeka",
    uploadDate: "2024-01-05",
  },
  {
    id: "5",
    title: "Physics Study Guide - Mechanics & Thermodynamics",
    type: "Study Guides",
    university: "Obafemi Awolowo University",
    subject: "Physics",
    level: "200 Level",
    year: "2023",
    downloads: 1450,
    rating: 4.7,
    isPremium: true,
    description: "Comprehensive study guide covering mechanics and thermodynamics",
    fileSize: "4.7 MB",
    uploadedBy: "Dr. Adunni",
    uploadDate: "2024-01-03",
  },
  {
    id: "6",
    title: "Medical Anatomy Atlas - Human Body Systems",
    type: "Textbooks",
    university: "University of Ilorin",
    subject: "Medicine",
    level: "100 Level",
    year: "2023",
    downloads: 3200,
    rating: 4.9,
    isPremium: true,
    description: "Detailed anatomical atlas with illustrations",
    fileSize: "25.4 MB",
    uploadedBy: "Dr. Kemi",
    uploadDate: "2024-01-01",
  },
]

const mockUniversities: University[] = [
  { id: "unilag", name: "University of Lagos" },
  { id: "ui", name: "University of Ibadan" },
  { id: "abu", name: "Ahmadu Bello University" },
  { id: "unn", name: "University of Nigeria, Nsukka" },
  { id: "oau", name: "Obafemi Awolowo University" },
  { id: "unilorin", name: "University of Ilorin" },
]

const mockSubjects = [
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Business Administration",
  "Medicine",
  "Engineering",
  "Law",
  "Economics",
  "Biology",
]

export function useResources(params: UseResourcesParams = {}) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filteredResources = [...mockResources]

      // Apply filters
      if (params.searchTerm) {
        filteredResources = filteredResources.filter(
          (resource) =>
            resource.title.toLowerCase().includes(params.searchTerm!.toLowerCase()) ||
            resource.subject.toLowerCase().includes(params.searchTerm!.toLowerCase()) ||
            resource.university.toLowerCase().includes(params.searchTerm!.toLowerCase()),
        )
      }

      if (params.university && params.university !== "all") {
        const universityName = mockUniversities.find((u) => u.id === params.university)?.name
        if (universityName) {
          filteredResources = filteredResources.filter((resource) => resource.university === universityName)
        }
      }

      if (params.type && params.type !== "all") {
        filteredResources = filteredResources.filter(
          (resource) => resource.type.toLowerCase().replace(" ", "-") === params.type,
        )
      }

      if (params.level && params.level !== "all") {
        if (params.level === "postgraduate") {
          filteredResources = filteredResources.filter((resource) =>
            resource.level.toLowerCase().includes("postgraduate"),
          )
        } else {
          filteredResources = filteredResources.filter((resource) => resource.level.includes(`${params.level} Level`))
        }
      }

      if (params.subject && params.subject !== "all") {
        filteredResources = filteredResources.filter((resource) => resource.subject === params.subject)
      }

      setResources(filteredResources)
      setLoading(false)
    }

    fetchResources()
  }, [params.searchTerm, params.university, params.type, params.level, params.subject])

  return {
    resources,
    universities: mockUniversities,
    subjects: mockSubjects,
    loading,
  }
}
