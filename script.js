/* ==========================================================================
   Configuration & State
   ========================================================================== */

// Default configuration
const defaultConfig = {
  site_title: "Angelina D'Amico",
  tagline: "Crafting Digital Experiences That Empower & Inspire",
  about_summary: "I am pursuing a Bachelor's degree in Digital Media at Arizona State University, where I am developing a strong foundation in creative design and digital communication. I am passionate about leveraging creativity and innovative media solutions to support and empower others in achieving their goals.",
  contact_email: "navetta04@gmail.com",
  background_color: "#FAFAFA",
  surface_color: "#FFFFFF",
  text_color: "#1A1A1A",
  primary_color: "#2D3436",
  accent_color: "#E17055"
};

// Current page state
let currentPage = 'home';

/* ==========================================================================
   Navigation Functions
   ========================================================================== */

/**
 * Navigate to a specific page
 * @param {string} page - The page identifier to navigate to
 */
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = page;
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === page || 
          (page.startsWith('project-') && link.dataset.page === 'home')) {
        if (link.dataset.page === 'home' && !page.startsWith('project-')) {
          link.classList.add('active');
        } else if (link.dataset.page === page) {
          link.classList.add('active');
        }
      }
    });
    
    // Scroll to top
    document.querySelector('.app-wrapper').scrollTo(0, 0);
  }
}

/* ==========================================================================
   Element SDK Integration
   ========================================================================== */

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      // Update nav title
      const navTitle = document.getElementById('nav-title');
      if (navTitle) navTitle.textContent = config.site_title || defaultConfig.site_title;

      // Update hero tagline
      const heroTagline = document.getElementById('hero-tagline');
      if (heroTagline) heroTagline.textContent = config.tagline || defaultConfig.tagline;

      // Update about text
      const aboutText = document.getElementById('about-text');
      if (aboutText) aboutText.textContent = config.about_summary || defaultConfig.about_summary;

      // Update contact email
      const contactEmailLink = document.getElementById('contact-email-link');
      const contactEmailText = document.getElementById('contact-email-text');
      const email = config.contact_email || defaultConfig.contact_email;
      if (contactEmailLink) contactEmailLink.href = `mailto:${email}`;
      if (contactEmailText) contactEmailText.textContent = email;

      // Update colors
      const root = document.documentElement;
      root.style.setProperty('--color-background', config.background_color || defaultConfig.background_color);
      root.style.setProperty('--color-surface', config.surface_color || defaultConfig.surface_color);
      root.style.setProperty('--color-text', config.text_color || defaultConfig.text_color);
      root.style.setProperty('--color-primary', config.primary_color || defaultConfig.primary_color);
      root.style.setProperty('--color-accent', config.accent_color || defaultConfig.accent_color);
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => window.elementSdk.setConfig({ background_color: value })
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => window.elementSdk.setConfig({ surface_color: value })
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => window.elementSdk.setConfig({ text_color: value })
        },
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => window.elementSdk.setConfig({ primary_color: value })
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => window.elementSdk.setConfig({ accent_color: value })
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    }),
    mapToEditPanelValues: (config) => new Map([
      ["site_title", config.site_title || defaultConfig.site_title],
      ["tagline", config.tagline || defaultConfig.tagline],
      ["about_summary", config.about_summary || defaultConfig.about_summary],
      ["contact_email", config.contact_email || defaultConfig.contact_email]
    ])
  });
}

/* ==========================================================================
   Initialization
   ========================================================================== */

// Set initial active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
  const homeNavLink = document.querySelector('.nav-link[data-page="home"]');
  if (homeNavLink) {
    homeNavLink.classList.add('active');
  }
});
