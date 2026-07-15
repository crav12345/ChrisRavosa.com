const navigation = document.querySelector(".site-nav");

if (navigation) {
  const menu = navigation.querySelector(".site-nav-container");
  const dropdowns = [...navigation.querySelectorAll(".nav-dropdown")];
  const mobileNav = window.matchMedia("(max-width: 1180px)");
  const toggle = document.createElement("button");

  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.textContent = "Menu";
  toggle.setAttribute("aria-expanded", "false");

  if (menu) {
    menu.id ||= "primary-navigation";
    toggle.setAttribute("aria-controls", menu.id);
    navigation.prepend(toggle);
    navigation.classList.add("nav-ready");
  }

  const collapseDropdowns = () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-expanded");
      dropdown
        .querySelector(".nav-dropdown-trigger")
        ?.setAttribute("aria-expanded", "false");
    });
  };

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    collapseDropdowns();
  };

  toggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) collapseDropdowns();
  });

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    trigger?.setAttribute("aria-expanded", "false");
    trigger?.addEventListener("click", () => {
      if (!mobileNav.matches) return;

      const willExpand = !dropdown.classList.contains("is-expanded");
      collapseDropdowns();
      dropdown.classList.toggle("is-expanded", willExpand);
      trigger.setAttribute("aria-expanded", String(willExpand));
    });
  });

  navigation.addEventListener("click", (event) => {
    if (mobileNav.matches && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileNav.matches &&
      navigation.classList.contains("is-open")
    ) {
      closeMenu();
      toggle.focus();
    }
  });

  mobileNav.addEventListener("change", closeMenu);
}
