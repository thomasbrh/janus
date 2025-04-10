"use strict";

// chatGPT a beaucoup été pour rendre ce code fonctionnel

document.addEventListener("DOMContentLoaded", function () {
    
    // Navigation active.

    const handleActiveLinks = (menuSelector) => {
        const navLinks = document.querySelectorAll(`${menuSelector} a`);
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || currentPath.startsWith(linkPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Pour les menus principaux
    handleActiveLinks('.menu');
    // Pour le menu "Appréciations"
    handleActiveLinks('.menu--appreciations');
    });

    
    // Gestion du menu burger.
    function toggleMenu(menuSelector) {
        const menu = document.querySelector(menuSelector);
        if (menu) {
            menu.classList.toggle("burger--open");
        }
    }

    const menuBtn = document.querySelector(".burger-button");
    if (menuBtn && document.querySelector(".menu")) {
        menuBtn.addEventListener("click", () => toggleMenu(".menu"));
    }

    const appreciationMenuBtn = document.querySelector(".menu--appreciations .burger-button");
    if (appreciationMenuBtn && document.querySelector(".menu--appreciations")) {
        appreciationMenuBtn.addEventListener("click", () => toggleMenu(".menu--appreciations"));
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            document.querySelectorAll(".burger--open").forEach(menu => {
                menu.classList.remove("burger--open");
            });
        }
    });

    //Navigation par ancres.
    const sections = document.querySelectorAll("section[id], header[id], footer[id]");
    const anchorLinks = document.querySelectorAll(".anchor-navigation__el a");

    if (sections.length > 0 && anchorLinks.length > 0) {
        const setActiveAnchor = (id) => {
            anchorLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`.anchor-navigation__el a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveAnchor(entry.target.id);
                    }
                });
            },
            {
                root: null,
                threshold: 0.1, // Section détectée dès 10% visible
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    // Gestion du mode sombre/claire.
    const toggleDarkMode = () => {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);

        document.querySelectorAll("[data-dark][data-light]").forEach(img => {
            img.src = newTheme === "dark" ? img.dataset.dark : img.dataset.light;
        });
    };

    const darkModeBtn = document.querySelector(".btn--darkmode");
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", toggleDarkMode);
    }