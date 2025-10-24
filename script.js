"use strict";

/******** mobile nav *********/

const btnNavEl = document.querySelector(".button-mobile-nav");

const headerEl = document.querySelector(".header-section");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

/********* scroll *********/

const allLinks = document.querySelectorAll("a");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();
    }

    if (href.startsWith("#")) {
      console.log(href);
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("nav-items"))
      headerEl.classList.toggle("nav-open");
  });
});

/******** sticky *********/

const heroSectionEl = document.querySelector(".sectionhero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

obs.observe(heroSectionEl);

/******** form *********/

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      ashnayi: document.getElementById("ashnayi").value,
      message: "sent",
      to_name: "sina gholami",
    };

    emailjs.send("service_03dev5j", "template_fawblyv", formData).then(
      function (response) {
        alert("فرم با موفقیت ارسال شد");
        console.log("success!", response.status, response.text);
      },
      function (error) {
        alert("ارسال فرم با خطا مواجه شد");
        console.log("failed...", error);
      }
    );
  });

/******** Gallery Functionality *********/

// Gallery images array
const galleryImages = [
  "images/gallery-images/photo_2025-10-24 22.27.52.webp",
  "images/gallery-images/photo_2025-10-24 22.27.55.webp",
  "images/gallery-images/photo_2025-10-24 22.27.57.webp",
  "images/gallery-images/photo_2025-10-24 22.27.59.webp",
  "images/gallery-images/photo_2025-10-24 22.28.01.webp",
  "images/gallery-images/photo_2025-10-24 22.28.05.webp",
  "images/gallery-images/photo_2025-10-24 22.28.09.webp",
  "images/gallery-images/photo_2025-10-24 22.28.11.webp",
  "images/gallery-images/photo_2025-10-24 22.28.13.webp",
  "images/gallery-images/photo_2025-10-24 22.28.15.webp",
  "images/gallery-images/photo_2025-10-24 22.28.17.webp",
  "images/gallery-images/photo_2025-10-24 22.28.19.webp",
  "images/gallery-images/photo_2025-10-24 22.28.21.webp",
  "images/gallery-images/photo_2025-10-24 22.28.23.webp",
  "images/gallery-images/photo_2025-10-24 22.28.25.webp",
  "images/gallery-images/photo_2025-10-24 22.28.27.webp",
];

let currentImageIndex = 0;
const galleryModal = document.getElementById("galleryModal");
const gallerySlide = document.getElementById("gallerySlide");
const galleryThumbnails = document.getElementById("galleryThumbnails");
const currentImageSpan = document.getElementById("currentImage");
const totalImagesSpan = document.getElementById("totalImages");
const closeGallery = document.getElementById("closeGallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const viewAllBtn = document.querySelector(".view-all-btn");

// Initialize gallery
function initGallery() {
  // Set total images count
  totalImagesSpan.textContent = galleryImages.length;

  // Create thumbnails
  createThumbnails();

  // Add event listeners
  addGalleryEventListeners();
}

// Create thumbnail images
function createThumbnails() {
  galleryThumbnails.innerHTML = "";

  galleryImages.forEach((imageSrc, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    if (index === 0) thumbnail.classList.add("active");

    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "نمونه کار سمپاشی";

    thumbnail.appendChild(img);
    thumbnail.addEventListener("click", () => goToImage(index));

    galleryThumbnails.appendChild(thumbnail);
  });
}

// Add event listeners
function addGalleryEventListeners() {
  // View all button
  viewAllBtn.addEventListener("click", openGallery);

  // Close gallery
  closeGallery.addEventListener("click", closeGalleryModal);

  // Navigation buttons
  prevBtn.addEventListener("click", previousImage);
  nextBtn.addEventListener("click", nextImage);

  // Preview items click
  document.querySelectorAll(".gallery-preview-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      currentImageIndex = index;
      openGallery();
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (galleryModal.classList.contains("active")) {
      if (e.key === "Escape") {
        closeGalleryModal();
      } else if (e.key === "ArrowLeft") {
        previousImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    }
  });

  // Click outside to close
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });
}

// Open gallery
function openGallery() {
  galleryModal.classList.add("active");
  updateGalleryDisplay();
  document.body.style.overflow = "hidden";
}

// Close gallery
function closeGalleryModal() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Go to specific image
function goToImage(index) {
  currentImageIndex = index;
  updateGalleryDisplay();
}

// Previous image
function previousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryDisplay();
}

// Next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateGalleryDisplay();
}

// Update gallery display
function updateGalleryDisplay() {
  // Update main image
  gallerySlide.src = galleryImages[currentImageIndex];

  // Update counter
  currentImageSpan.textContent = currentImageIndex + 1;

  // Update active thumbnail
  document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentImageIndex);
  });

  // Scroll to active thumbnail
  const activeThumbnail = document.querySelector(".thumbnail.active");
  if (activeThumbnail) {
    activeThumbnail.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

gallerySlide.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

gallerySlide.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      nextImage();
    } else {
      // Swipe right - previous image
      previousImage();
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", initGallery);
