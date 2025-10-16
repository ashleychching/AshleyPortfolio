// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navHeight = document.querySelector(".nav").offsetHeight
      const targetPosition = target.offsetTop - navHeight - 20
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Projects Carousel
const carouselTrack = document.querySelector(".carousel-track")
const prevBtn = document.querySelector(".carousel-btn.prev")
const nextBtn = document.querySelector(".carousel-btn.next")

if (carouselTrack && prevBtn && nextBtn) {
  let currentIndex = 0
  const cards = document.querySelectorAll(".project-card")
  const totalCards = cards.length

  // Calculate how many cards are visible at once
  function getVisibleCards() {
    const width = window.innerWidth
    if (width > 1024) return 4
    if (width > 768) return 3
    if (width > 480) return 2
    return 1
  }

  function updateCarousel() {
    const visibleCards = getVisibleCards()
    const cardWidth = cards[0].offsetWidth
    const gap = 32 // 2rem gap
    const maxIndex = Math.max(0, totalCards - visibleCards)

    // Ensure currentIndex is within bounds
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex))

    const offset = -(currentIndex * (cardWidth + gap))
    carouselTrack.style.transform = `translateX(${offset}px)`

    // Update button states
    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= maxIndex

    prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1"
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0.3" : "1"
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  })

  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards()
    const maxIndex = Math.max(0, totalCards - visibleCards)
    if (currentIndex < maxIndex) {
      currentIndex++
      updateCarousel()
    }
  })

  // Update on window resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      updateCarousel()
    }, 250)
  })

  // Initial update
  updateCarousel()
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe sections for animation
document.querySelectorAll(".content-section, .experience-item, .project-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""
  const navHeight = document.querySelector(".nav").offsetHeight

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navHeight - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.style.opacity = "0.7"
    if (link.getAttribute("href") === `#${current}`) {
      link.style.opacity = "1"
    }
  })
}

window.addEventListener("scroll", updateActiveNav)
updateActiveNav()

// Download resume button (placeholder functionality)
const downloadBtn = document.querySelector(".download-btn")
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    alert("Resume download functionality would be implemented here!")
    // In a real implementation, this would trigger a file download
    // window.location.href = '/path/to/resume.pdf';
  })
}

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "none"
  })
})

// Parallax effect for decorative dots
window.addEventListener("scroll", () => {
  const dots = document.querySelectorAll(".decorative-dots")
  const scrolled = window.pageYOffset

  dots.forEach((dot, index) => {
    const speed = 0.1 + index * 0.05
    const yPos = -(scrolled * speed)
    dot.style.transform = `translateY(${yPos}px)`
  })
})
