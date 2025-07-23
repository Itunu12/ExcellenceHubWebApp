// Upload Management Functions

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("upload-form")
  const fileUploadArea = document.getElementById("file-upload-area")
  const fileInput = document.getElementById("resource-file")
  const fileInfo = document.getElementById("file-info")

  if (uploadForm) {
    uploadForm.addEventListener("submit", handleUpload)
  }

  if (fileUploadArea && fileInput) {
    initializeFileUpload()
  }
})

function initializeFileUpload() {
  const fileUploadArea = document.getElementById("file-upload-area")
  const fileInput = document.getElementById("resource-file")
  const fileInfo = document.getElementById("file-info")
  const fileName = document.getElementById("file-name")
  const fileSize = document.getElementById("file-size")

  // Click to upload
  fileUploadArea.addEventListener("click", () => {
    fileInput.click()
  })

  // Drag and drop
  fileUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    fileUploadArea.style.borderColor = "var(--primary-color)"
    fileUploadArea.style.background = "var(--bg-secondary)"
  })

  fileUploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    fileUploadArea.style.borderColor = "var(--text-light)"
    fileUploadArea.style.background = "transparent"
  })

  fileUploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    fileUploadArea.style.borderColor = "var(--text-light)"
    fileUploadArea.style.background = "transparent"

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  })

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0])
    }
  })

  function handleFileSelection(file) {
    // Validate file type
    const allowedTypes = [".pdf", ".doc", ".docx"]
    const fileExtension = "." + file.name.split(".").pop().toLowerCase()

    if (!allowedTypes.includes(fileExtension)) {
      alert("Please select a PDF, DOC, or DOCX file.")
      return
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024 // 50MB in bytes
    if (file.size > maxSize) {
      alert("File size must be less than 50MB.")
      return
    }

    // Update UI
    fileName.textContent = file.name
    fileSize.textContent = formatFileSize(file.size)
    fileInfo.classList.remove("hidden")

    // Update file input
    const dt = new DataTransfer()
    dt.items.add(file)
    fileInput.files = dt.files
  }
}

function handleUpload(e) {
  e.preventDefault()

  if (!currentUser) {
    showModal("loginModal")
    return
  }

  // Get form data
  const formData = new FormData(e.target)
  const uploadData = {
    title: formData.get("resource-title") || document.getElementById("resource-title").value,
    description: formData.get("resource-description") || document.getElementById("resource-description").value,
    category: formData.get("resource-category") || document.getElementById("resource-category").value,
    university: formData.get("resource-university") || document.getElementById("resource-university").value,
    course: formData.get("resource-course") || document.getElementById("resource-course").value,
    level: formData.get("resource-level") || document.getElementById("resource-level").value,
    price: Number.parseFloat(formData.get("resource-price") || document.getElementById("resource-price").value) || 0,
    file: formData.get("resource-file") || document.getElementById("resource-file").files[0],
  }

  // Validation
  if (
    !uploadData.title ||
    !uploadData.description ||
    !uploadData.category ||
    !uploadData.university ||
    !uploadData.course ||
    !uploadData.level ||
    !uploadData.file
  ) {
    alert("Please fill in all required fields and select a file.")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...'
  submitBtn.disabled = true

  // Simulate upload process
  setTimeout(() => {
    // Create new resource
    const newResource = {
      id: Date.now(),
      title: uploadData.title,
      description: uploadData.description,
      category: uploadData.category,
      university: uploadData.university,
      course: uploadData.course,
      level: uploadData.level,
      price: uploadData.price,
      downloads: 0,
      fileSize: formatFileSize(uploadData.file.size),
      uploadedBy: `${currentUser.firstName} ${currentUser.lastName}`,
      uploadedAt: new Date(),
      approved: false, // Requires admin approval
    }

    // Add to resources (in a real app, this would be sent to server)
    resources.unshift(newResource)

    // Save user's uploads to localStorage
    const userUploads = JSON.parse(localStorage.getItem("studyhub_user_uploads") || "[]")
    userUploads.unshift(newResource)
    localStorage.setItem("studyhub_user_uploads", JSON.stringify(userUploads))

    // Reset form
    e.target.reset()
    document.getElementById("file-info").classList.add("hidden")

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Show success message
    showSuccess(
      "Upload Successful!",
      "Your resource has been uploaded successfully! It will be reviewed and published within 24 hours.",
    )

    // Update dashboard if visible
    if (currentSection === "dashboard") {
      loadDashboard()
    }
  }, 3000)
}

function loadDashboard() {
  if (!currentUser) {
    showSection("home")
    return
  }

  // Load user's uploads
  const userUploads = JSON.parse(localStorage.getItem("studyhub_user_uploads") || "[]")

  // Update dashboard stats
  updateDashboardStats(userUploads)

  // Load recent uploads
  loadRecentUploads(userUploads)
}

function updateDashboardStats(userUploads) {
  const totalUploads = userUploads.length
  const totalDownloads = userUploads.reduce((sum, upload) => sum + upload.downloads, 0)
  const totalEarnings = userUploads.reduce((sum, upload) => sum + upload.price * upload.downloads * 0.7, 0)
  const pendingApproval = userUploads.filter((upload) => !upload.approved).length

  // Update UI
  document.getElementById("total-uploads").textContent = totalUploads
  document.getElementById("total-downloads").textContent = totalDownloads
  document.getElementById("total-earnings").textContent = `₦${totalEarnings.toLocaleString()}`
  document.getElementById("pending-approval").textContent = pendingApproval
}

function loadRecentUploads(userUploads) {
  const recentUploadsContainer = document.getElementById("recent-uploads")
  if (!recentUploadsContainer) return

  if (userUploads.length === 0) {
    recentUploadsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-upload"></i>
                <h4>No uploads yet</h4>
                <p>Start sharing your study materials and earn from your knowledge.</p>
                <button class="btn btn-primary" onclick="showUpload()">
                    <i class="fas fa-upload"></i>
                    Upload Your First Resource
                </button>
            </div>
        `
    return
  }

  const recentUploads = userUploads.slice(0, 5)
  recentUploadsContainer.innerHTML = recentUploads
    .map(
      (upload) => `
        <div class="upload-item">
            <div class="upload-info">
                <h4>${upload.title}</h4>
                <div class="upload-meta">
                    <span>${getCategoryDisplayName(upload.category)}</span>
                    <span>₦${upload.price}</span>
                    <span>${upload.downloads} downloads</span>
                </div>
            </div>
            <div class="upload-status">
                <span class="badge ${upload.approved ? "badge-success" : "badge-warning"}">
                    ${upload.approved ? "Approved" : "Pending"}
                </span>
            </div>
        </div>
    `,
    )
    .join("")

  if (userUploads.length > 5) {
    recentUploadsContainer.innerHTML += `
            <div class="text-center" style="margin-top: 1rem;">
                <button class="btn btn-outline" onclick="showAllUploads()">
                    View All Uploads
                </button>
            </div>
        `
  }
}

function showAllUploads() {
  // In a real app, this would navigate to a dedicated uploads page
  alert("All uploads page would be implemented here")
}

function deleteUpload(uploadId) {
    const confirmDelete = confirm('Are you sure you want to delete this upload?');
    if (!confirmDelete) return;
    
    // Remove from resources
    resources = resources.filter(resource => resource.id !== uploadId);
    
    // Remove from user uploads
    const userUploads = JSON.parse(localStorage.getItem('studyhub_user_uploads') || '[]');
    const updatedUploads = userUploads.filter(upload => upload.id !== uploadId);
    localStorage.setItem('studyhub_user_uploads', JSON.stringify(updatedUploads));
    
    // Reload dashboard
    loadDashboard();
    
    showSuccess('Upload Deleted', \'Your upload has\
