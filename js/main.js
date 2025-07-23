// Global Variables
let currentUser = null
let currentSection = "home"
let resources = []
let filteredResources = []
const currentPage = 1
const resourcesPerPage = 9

// Sample Resources Data
const sampleResources = [
  {
    id: 1,
    title: "Mathematics 101 - Past Questions (2020-2023)",
    description:
      "Complete collection of past examination questions with detailed solutions and marking schemes for Mathematics 101.",
    category: "past-questions",
    university: "unilag",
    course: "Mathematics",
    level: "100",
    price: 0,
    downloads: 1250,
    fileSize: "2.5 MB",
    uploadedBy: "John Doe",
    uploadedAt: new Date("2024-01-15"),
    approved: true,
  },
  {
    id: 2,
    title: "Organic Chemistry Textbook - 5th Edition",
    description: "Comprehensive textbook covering all aspects of organic chemistry with examples and exercises.",
    category: "textbooks",
    university: "ui",
    course: "Chemistry",
    level: "200",
    price: 2500,
    downloads: 890,
    fileSize: "45.2 MB",
    uploadedBy: "Jane Smith",
    uploadedAt: new Date("2024-01-10"),
    approved: true,
  },
  {
    id: 3,
    title: "Computer Science Lecture Notes - Data Structures",
    description: "Complete lecture notes covering arrays, linked lists, stacks, queues, trees, and graphs.",
    category: "lecture-notes",
    university: "oau",
    course: "Computer Science",
    level: "200",
    price: 1500,
    downloads: 2100,
    fileSize: "8.1 MB",
    uploadedBy: "Mike Johnson",
    uploadedAt: new Date("2024-01-08"),
    approved: true,
  },
  {
    id: 4,
    title: "Physics Past Questions Collection (2018-2023)",
    description: "Five years of physics examination questions with step-by-step solutions and explanations.",
    category: "past-questions",
    university: "uniben",
    course: "Physics",
    level: "100",
    price: 0,
    downloads: 1800,
    fileSize: "3.1 MB",
    uploadedBy: "Sarah Wilson",
    uploadedAt: new Date("2024-01-05"),
    approved: true,
  },
  {
    id: 5,
    title: "Research Methodology Handbook",
    description: "Complete guide to academic research, thesis writing, and proper citation methods.",
    category: "research-papers",
    university: "abu",
    course: "General Studies",
    level: "all",
    price: 0,
    downloads: 950,
    fileSize: "1.8 MB",
    uploadedBy: "David Brown",
    uploadedAt: new Date("2024-01-03"),
    approved: true,
  },
  {
    id: 6,
    title: "Advanced Statistics Textbook with SPSS Guide",
    description: "Comprehensive statistics textbook with practical SPSS tutorials and real-world examples.",
    category: "textbooks",
    university: "unn",
    course: "Statistics",
    level: "300",
    price: 3000,
    downloads: 720,
    fileSize: "28.5 MB",
    uploadedBy: "Lisa Davis",
    uploadedAt: new Date("2024-01-01"),
    approved: true,
  },
  {
    id: 7,
    title: "Engineering Mathematics - Calculus and Linear Algebra",
    description:
      "Essential mathematics for engineering students covering calculus, linear algebra, and differential equations.",
    category: "textbooks",
    university: "abu",
    course: "Engineering",
    level: "200",
    price: 2000,
    downloads: 1450,
    fileSize: "15.3 MB",
    uploadedBy: "Robert Taylor",
    uploadedAt: new Date("2023-12-28"),
    approved: true,
  },
  {
    id: 8,
    title: "Business Administration Case Studies",
    description: "Real-world business case studies with analysis and solutions for business students.",
    category: "assignments",
    university: "covenant",
    course: "Business Administration",
    level: "300",
    price: 1200,
    downloads: 680,
    fileSize: "6.7 MB",
    uploadedBy: "Emily Clark",
    uploadedAt: new Date("2023-12-25"),
    approved: true,
  },
  {
    id: 9,
    title: "Biology Lab Manual - Practical Experiments",
    description: "Complete laboratory manual with step-by-step procedures for biology practical experiments.",
    category: "lab-manuals",
    university: "ui",
    course: "Biology",
    level: "100",
    price: 800,
    downloads: 920,
    fileSize: "4.2 MB",
    uploadedBy: "James Wilson",
    uploadedAt: new Date("2023-12-20"),
    approved: true,
  },
]

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Load resources
  resources = [...sampleResources]
  filteredResources = [...resources]

  // Check for saved user session
  checkUserSession()

  // Initialize navigation
  initializeNavigation()

  // Initialize stats animation
  initializeStatsAnimation()

  // Load initial resources
  loadResources()

  // Initialize event listeners
  initializeEventListeners()
}

function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("href").substring(1)
      showSection(section)

      // Close mobile menu
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // User dropdown
  const userBtn = document.getElementById("user-btn")
  const userDropdown = document.getElementById("user-dropdown")

  if (userBtn && userDropdown) {
    userBtn.addEventListener("click", () => {
      userDropdown.classList.toggle("show")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target)) {
        userDropdown.classList.remove("show")
      }
    })
  }
}

function initializeStatsAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateStats = () => {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateStat = () => {
        if (current < target) {
          current += increment
          stat.textContent = Math.floor(current).toLocaleString()
          setTimeout(updateStat, 20)
        } else {
          stat.textContent = target.toLocaleString()
        }
      }

      updateStat()
    })
  }

  // Trigger animation when stats section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats()
        observer.unobserve(entry.target)
      }
    })
  })

  const statsSection = document.querySelector(".stats-section")
  if (statsSection) {
    observer.observe(statsSection)
  }
}

function initializeEventListeners() {
  // Modal close buttons
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      closeModal(modal.id)
    })
  })

  // Close modals when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this.id)
      }
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
}

// Navigation Functions
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll("main > section").forEach((section) => {
    section.classList.add("hidden")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.remove("hidden")
    currentSection = sectionId

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active")
      }
    })

    // Load section-specific content
    if (sectionId === "resources") {
      loadResources()
    } else if (sectionId === "dashboard") {
      loadDashboard()
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

function showDashboard() {
  if (!currentUser) {
    showModal("loginModal")
    return
  }
  showSection("dashboard")
}

function showUpload() {
  if (!currentUser) {
    showModal("loginModal")
    return
  }
  showSection("upload")
}

// Modal Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function showSuccess(title, message) {
  document.getElementById("success-title").textContent = title
  document.getElementById("success-message").textContent = message
  showModal("successModal")
}

// User Session Functions
function checkUserSession() {
  const savedUser = localStorage.getItem("studyhub_user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUIForLoggedInUser()
  }
}

function updateUIForLoggedInUser() {
  const navAuth = document.getElementById("nav-auth")
  const navUser = document.getElementById("nav-user")
  const userName = document.getElementById("user-name")
  const dashboardUserName = document.getElementById("dashboard-user-name")

  if (navAuth && navUser && userName) {
    navAuth.classList.add("hidden")
    navUser.classList.remove("hidden")
    userName.textContent = currentUser.firstName || "User"

    if (dashboardUserName) {
      dashboardUserName.textContent = currentUser.firstName || "Student"
    }
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("studyhub_user")

  const navAuth = document.getElementById("nav-auth")
  const navUser = document.getElementById("nav-user")

  if (navAuth && navUser) {
    navAuth.classList.remove("hidden")
    navUser.classList.add("hidden")
  }

  showSection("home")
  showSuccess("Logged Out", "You have been successfully logged out.")
}

// Pricing Functions
function selectPlan(planName, price) {
  if (!currentUser) {
    showModal("loginModal")
    return
  }

  // Simulate payment process
  const confirmPayment = confirm(
    `You are about to purchase the ${planName} plan for ₦${price.toLocaleString()}. This will redirect you to Paystack for secure payment. Continue?`,
  )

  if (confirmPayment) {
    // In a real application, this would redirect to Paystack
    showSuccess(
      "Payment Initiated",
      `Redirecting to Paystack for ${planName} plan payment of ₦${price.toLocaleString()}...`,
    )
  }
}

// Utility Functions
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function formatPrice(price) {
  return price === 0 ? "Free" : `₦${price.toLocaleString()}`
}

function getCategoryDisplayName(category) {
  const categoryMap = {
    "past-questions": "Past Questions",
    textbooks: "Textbooks",
    "lecture-notes": "Lecture Notes",
    assignments: "Assignments",
    "research-papers": "Research Papers",
    "lab-manuals": "Lab Manuals",
    other: "Other",
  }
  return categoryMap[category] || category
}

function getUniversityDisplayName(universityCode) {
  const universityMap = {
    unilag: "University of Lagos (UNILAG)",
    ui: "University of Ibadan (UI)",
    oau: "Obafemi Awolowo University (OAU)",
    uniben: "University of Benin (UNIBEN)",
    abu: "Ahmadu Bello University (ABU)",
    unn: "University of Nigeria, Nsukka (UNN)",
    covenant: "Covenant University",
    other: "Other",
  }
  return universityMap[universityCode] || universityCode
}

// Loading Functions
function showLoading() {
  const loadingOverlay = document.createElement("div")
  loadingOverlay.className = "loading-overlay"
  loadingOverlay.id = "loading-overlay"
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'
  document.body.appendChild(loadingOverlay)
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    loadingOverlay.remove()
  }
}

function loadResources() {
  // Placeholder function for loading resources
  console.log("Loading resources...")
}

function loadDashboard() {
  // Placeholder function for loading dashboard
  console.log("Loading dashboard...")
}
