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
