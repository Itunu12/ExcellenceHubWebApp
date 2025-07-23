// Authentication Functions

let currentUser = null
function updateUIForLoggedInUser() {
  // Placeholder for updating UI for logged-in user
  console.log("UI updated for logged-in user")
}

function closeModal(modalId) {
  // Placeholder for closing modal
  console.log(`Modal ${modalId} closed`)
}

function showSuccess(title, message) {
  // Placeholder for showing success message
  console.log(`${title}: ${message}`)
}

function showSection(sectionId) {
  // Placeholder for showing section
  console.log(`Section ${sectionId} shown`)
}

// Login Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
})

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Signing in..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login

    const user = {
      id: Date.now(),
      email: email,
      firstName: "Demo",
      lastName: "User",
      university: "unilag",
      course: "Computer Science",
      level: "300",
    }

    // Save user to localStorage
    localStorage.setItem("studyhub_user", JSON.stringify(user))
    currentUser = user

    // Update UI
    updateUIForLoggedInUser()

    // Close modal
    closeModal("loginModal")

    // Show success message
    showSuccess("Welcome Back!", `Hello ${user.firstName}, you have successfully signed in.`)

    // Reset form
    e.target.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

function handleRegister(e) {
  e.preventDefault()

  const firstName = document.getElementById("register-firstname").value
  const lastName = document.getElementById("register-lastname").value
  const email = document.getElementById("register-email").value
  const university = document.getElementById("register-university").value
  const course = document.getElementById("register-course").value
  const level = document.getElementById("register-level").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value

  // Validation
  if (!firstName || !lastName || !email || !university || !course || !level || !password || !confirmPassword) {
    alert("Please fill in all fields")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Creating account..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful registration

    const user = {
      id: Date.now(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      university: university,
      course: course,
      level: level,
    }

    // Save user to localStorage
    localStorage.setItem("studyhub_user", JSON.stringify(user))
    currentUser = user

    // Update UI
    updateUIForLoggedInUser()

    // Close modal
    closeModal("registerModal")

    // Show success message
    showSuccess(
      "Account Created!",
      `Welcome to StudyHub, ${user.firstName}! Your account has been created successfully.`,
    )

    // Reset form
    e.target.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

// Social Login Functions (for future implementation)
function loginWithGoogle() {
  // Placeholder for Google OAuth integration
  alert("Google login will be implemented with actual OAuth integration")
}

function loginWithFacebook() {
  // Placeholder for Facebook OAuth integration
  alert("Facebook login will be implemented with actual OAuth integration")
}

// Password Reset Function
function resetPassword(email) {
  if (!email) {
    alert("Please enter your email address")
    return
  }

  // Simulate password reset email
  setTimeout(() => {
    showSuccess("Password Reset", "If an account with that email exists, we have sent you a password reset link.")
  }, 1000)
}

// Email Verification Function
function sendVerificationEmail() {
  if (!currentUser) {
    return
  }

  // Simulate sending verification email
  setTimeout(() => {
    showSuccess("Verification Email Sent", "Please check your email and click the verification link.")
  }, 1000)
}

// Update Profile Function
function updateProfile(profileData) {
  if (!currentUser) {
    return
  }

  // Update current user data
  currentUser = { ...currentUser, ...profileData }

  // Save to localStorage
  localStorage.setItem("studyhub_user", JSON.stringify(currentUser))

  // Update UI
  updateUIForLoggedInUser()

  showSuccess("Profile Updated", "Your profile has been updated successfully.")
}

// Delete Account Function
function deleteAccount() {
  if (!currentUser) {
    return
  }

  const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.")

  if (confirmDelete) {
    // Clear user data
    localStorage.removeItem("studyhub_user")
    currentUser = null

    // Update UI
    const navAuth = document.getElementById("nav-auth")
    const navUser = document.getElementById("nav-user")

    if (navAuth && navUser) {
      navAuth.classList.remove("hidden")
      navUser.classList.add("hidden")
    }

    // Redirect to home
    showSection("home")

    showSuccess("Account Deleted", "Your account has been deleted successfully.")
  }
}
