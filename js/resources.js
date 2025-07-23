// Resources Management Functions

let currentPage = 1
const resourcesPerPage = 10
let filteredResources = []
const resources = [] // Declare resources variable
const currentUser = null // Declare currentUser variable

function loadResources() {
  const resourcesGrid = document.getElementById("resources-grid")
  if (!resourcesGrid) return

  // Clear existing resources
  resourcesGrid.innerHTML = ""

  // Calculate pagination
  const startIndex = (currentPage - 1) * resourcesPerPage
  const endIndex = startIndex + resourcesPerPage
  const paginatedResources = filteredResources.slice(startIndex, endIndex)

  // Render resources
  paginatedResources.forEach((resource) => {
    const resourceCard = createResourceCard(resource)
    resourcesGrid.appendChild(resourceCard)
  })

  // Update load more button
  updateLoadMoreButton()

  // Show empty state if no resources
  if (filteredResources.length === 0) {
    showEmptyResourcesState()
  }
}

function createResourceCard(resource) {
  const card = document.createElement("div")
  card.className = "resource-card"

  const isPremium = resource.price > 0
  const categoryDisplay = getCategoryDisplayName(resource.category)
  const priceDisplay = formatPrice(resource.price)

  card.innerHTML = `
        <div class="resource-header">
            <div class="resource-meta">
                <i class="fas fa-file-pdf"></i>
                <span class="badge">${categoryDisplay}</span>
                ${isPremium ? '<span class="badge badge-premium"><i class="fas fa-lock"></i> Premium</span>' : ""}
            </div>
            <h3 class="resource-title">${resource.title}</h3>
            <p class="resource-description">${resource.description}</p>
        </div>
        <div class="resource-body">
            <div class="resource-info">
                <span>${resource.course}</span>
                <span>${resource.level} Level</span>
            </div>
            <div class="resource-stats">
                <span><i class="fas fa-download"></i> ${resource.downloads} downloads</span>
                <span><i class="fas fa-file"></i> ${resource.fileSize}</span>
                <span class="resource-price">${priceDisplay}</span>
            </div>
            <button class="btn ${isPremium ? "btn-outline" : "btn-primary"} btn-full" onclick="downloadResource(${resource.id})">
                <i class="fas fa-${isPremium ? "lock" : "download"}"></i>
                ${isPremium ? "Buy & Download" : "Download Free"}
            </button>
        </div>
    `

  return card
}

function filterResources() {
  const searchTerm = document.getElementById("resource-search").value.toLowerCase()
  const categoryFilter = document.getElementById("category-filter").value

  filteredResources = resources.filter((resource) => {
    const matchesSearch =
      !searchTerm ||
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.course.toLowerCase().includes(searchTerm)

    const matchesCategory = !categoryFilter || resource.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Reset pagination
  currentPage = 1

  // Reload resources
  loadResources()
}

function loadMoreResources() {
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage)

  if (currentPage < totalPages) {
    currentPage++
    loadResources()
  }
}

function updateLoadMoreButton() {
  const loadMoreBtn = document.getElementById("load-more-btn")
  if (!loadMoreBtn) return

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage)
  const hasMore = currentPage < totalPages

  if (hasMore) {
    loadMoreBtn.style.display = "inline-flex"
    loadMoreBtn.textContent = "Load More Resources"
  } else {
    loadMoreBtn.style.display = "none"
  }
}

function showEmptyResourcesState() {
  const resourcesGrid = document.getElementById("resources-grid")
  if (!resourcesGrid) return

  resourcesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-search"></i>
            <h4>No resources found</h4>
            <p>Try adjusting your search terms or filters.</p>
            <button class="btn btn-primary" onclick="resetResourceFilters()">
                Reset Filters
            </button>
        </div>
    `
}

function resetResourceFilters() {
  document.getElementById("resource-search").value = ""
  document.getElementById("category-filter").value = ""
  filteredResources = [...resources]
  currentPage = 1
  loadResources()
}

function downloadResource(resourceId) {
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) return

  if (resource.price > 0 && !currentUser) {
    alert("Please sign in to download premium resources")
    showModal("loginModal")
    return
  }

  if (resource.price > 0) {
    // Redirect to payment for premium resources
    const confirmPurchase = confirm(
      `This resource costs ${formatPrice(resource.price)}. You will be redirected to Paystack for secure payment. Continue?`,
    )

    if (confirmPurchase) {
      // In a real app, this would redirect to Paystack
      showSuccess("Payment Required", `Redirecting to Paystack for payment of ${formatPrice(resource.price)}...`)
    }
    return
  }

  // For free resources, simulate download
  showLoading()

  setTimeout(() => {
    hideLoading()

    // Increment download count
    resource.downloads++

    // Update the resource card
    loadResources()

    // Show success message
    showSuccess(
      "Download Started",
      `${resource.title} is now downloading. The file will be saved to your downloads folder.`,
    )

    // In a real app, this would trigger the actual file download
    // window.open(resource.fileUrl, '_blank');
  }, 1500)
}

function addToFavorites(resourceId) {
  if (!currentUser) {
    showModal("loginModal")
    return
  }

  // Get current favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("studyhub_favorites") || "[]")

  if (!favorites.includes(resourceId)) {
    favorites.push(resourceId)
    localStorage.setItem("studyhub_favorites", JSON.stringify(favorites))
    showSuccess("Added to Favorites", "Resource has been added to your favorites.")
  } else {
    showSuccess("Already in Favorites", "This resource is already in your favorites.")
  }
}

function removeFromFavorites(resourceId) {
  const favorites = JSON.parse(localStorage.getItem("studyhub_favorites") || "[]")
  const updatedFavorites = favorites.filter((id) => id !== resourceId)
  localStorage.setItem("studyhub_favorites", JSON.stringify(updatedFavorites))
  showSuccess("Removed from Favorites", "Resource has been removed from your favorites.")
}

function getFavoriteResources() {
  if (!currentUser) return []

  const favorites = JSON.parse(localStorage.getItem("studyhub_favorites") || "[]")
  return resources.filter((resource) => favorites.includes(resource.id))
}

function shareResource(resourceId) {
  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) return

  if (navigator.share) {
    navigator.share({
      title: resource.title,
      text: resource.description,
      url: window.location.href,
    })
  } else {
    // Fallback: copy to clipboard
    const shareUrl = `${window.location.origin}?resource=${resourceId}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      showSuccess("Link Copied", "Resource link has been copied to your clipboard.")
    })
  }
}

function reportResource(resourceId) {
  if (!currentUser) {
    showModal("loginModal")
    return
  }

  const reason = prompt("Please provide a reason for reporting this resource:")
  if (reason) {
    // In a real app, this would send a report to the server
    showSuccess("Report Submitted", "Thank you for your report. We will review this resource.")
  }
}

// Search suggestions
function initializeSearchSuggestions() {
  const searchInput = document.getElementById("resource-search")
  if (!searchInput) return

  const suggestions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Engineering",
    "Business Administration",
    "Economics",
    "Psychology",
    "Past Questions",
    "Textbooks",
    "Lecture Notes",
    "Lab Manual",
  ]

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase()
    if (value.length < 2) return

    const matches = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value))

    // Show suggestions (implementation would depend on UI design)
    console.log("Search suggestions:", matches)
  })
}

// Initialize search suggestions when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSearchSuggestions)

// Declare functions used in the code
function getCategoryDisplayName(category) {
  // Implementation for getCategoryDisplayName
  return category
}

function formatPrice(price) {
  // Implementation for formatPrice
  return price > 0 ? `$${price}` : "Free"
}

function showModal(modalId) {
  // Implementation for showModal
  console.log(`Show modal: ${modalId}`)
}

function showSuccess(title, message) {
  // Implementation for showSuccess
  console.log(`${title}: ${message}`)
}

function showLoading() {
  // Implementation for showLoading
  console.log("Loading...")
}

function hideLoading() {
  // Implementation for hideLoading
  console.log("Loading hidden")
}
