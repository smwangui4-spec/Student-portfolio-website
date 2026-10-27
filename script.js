const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector("#contact-form");

if (menuToggle && siteNav) {
  const setNavigationOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    siteNav.classList.toggle("is-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (
      event.target.closest(".site-nav a") ||
      (!siteNav.contains(event.target) && !menuToggle.contains(event.target))
    ) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setNavigationOpen(false);
      menuToggle.focus();
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${isLight ? "dark" : "light"} theme`
    );
    themeToggle.innerHTML = `<span aria-hidden="true">◐</span> ${isLight ? "Dark" : "Light"} theme`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      isLight ? "#f4f7f3" : "#0b0f12"
    );
  });
}

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 500;
  };

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
}

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof message !== "string"
    ) {
      return;
    }

    const body = [
      `Full name: ${name}`,
      `Email address: ${email}`,
      `Phone number: ${phone || "Not provided"}`,
      "",
      message
    ].join("\n");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:samimwash46@gmail.com?subject=${subject}&body=${encodedBody}`;
  });
}
