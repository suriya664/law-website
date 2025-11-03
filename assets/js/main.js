/**
 * LawFIRM - Main JavaScript File
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ===== Navbar Scroll Effect =====
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }

  // ===== Mobile Menu Active State =====
  function handleMobileMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close mobile menu when clicking a link
        if (window.innerWidth < 992 && navbarCollapse) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });
  }

  // ===== Active Navigation Link =====
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage || 
          link.getAttribute('href') === `./${currentPage}` ||
          link.getAttribute('href') === `../${currentPage}`) {
        link.classList.add('active');
      }
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ===== Counter Animation =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const increment = target / speed;
          let count = 0;

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target + '+';
            }
          };

          updateCount();
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  // ===== Scroll to Top Button =====
  function scrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      width: 50px;
      height: 50px;
      background-color: var(--primary-gold);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseenter', () => {
      scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
      scrollBtn.style.transform = 'scale(1)';
    });
  }

  // ===== Dark Mode Toggle =====
  function darkModeToggle() {
    // Create dark mode toggle button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = 'dark-mode-toggle';
    darkModeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(darkModeBtn);

    // Check for saved user preference
    const currentMode = localStorage.getItem('theme');
    if (currentMode === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // ===== RTL Toggle =====
  function rtlToggle() {
    // Create RTL toggle button
    const rtlBtn = document.createElement('button');
    rtlBtn.innerHTML = 'RTL';
    rtlBtn.className = 'rtl-toggle';
    rtlBtn.setAttribute('aria-label', 'Toggle RTL');
    document.body.appendChild(rtlBtn);

    // Check for saved user preference
    const currentDir = localStorage.getItem('direction');
    if (currentDir === 'rtl') {
      document.body.classList.add('rtl');
      rtlBtn.innerHTML = 'LTR';
    }

    // Toggle RTL
    rtlBtn.addEventListener('click', () => {
      document.body.classList.toggle('rtl');
      
      if (document.body.classList.contains('rtl')) {
        localStorage.setItem('direction', 'rtl');
        rtlBtn.innerHTML = 'LTR';
      } else {
        localStorage.setItem('direction', 'ltr');
        rtlBtn.innerHTML = 'RTL';
      }
    });
  }

  // ===== Lazy Loading Images =====
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ===== Form Validation =====
  function formValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  // ===== Tooltips Initialization =====
  function initTooltips() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // ===== Popovers Initialization =====
  function initPopovers() {
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

  // ===== AOS Animation Initialization =====
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  // ===== Preloader =====
  function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      });
    }
  }

  // ===== Accordion Auto Close =====
  function accordionAutoClose() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const parent = this.closest('.accordion');
        if (parent) {
          const allButtons = parent.querySelectorAll('.accordion-button');
          allButtons.forEach(btn => {
            if (btn !== this && !btn.classList.contains('collapsed')) {
              btn.click();
            }
          });
        }
      });
    });
  }

  // ===== Tab Auto Save =====
  function tabAutoSave() {
    const tabs = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabs.forEach(tab => {
      tab.addEventListener('shown.bs.tab', function(e) {
        localStorage.setItem('activeTab', e.target.getAttribute('href'));
      });
    });

    // Restore active tab
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
      const tab = document.querySelector(`[href="${activeTab}"]`);
      if (tab) {
        const bsTab = new bootstrap.Tab(tab);
        bsTab.show();
      }
    }
  }

  // ===== Search Functionality =====
  function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const searchableItems = document.querySelectorAll('.searchable');
        
        searchableItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }

  // ===== Gallery Filter =====
  function galleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter items
        galleryItems.forEach(item => {
          if (filter === '*' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===== Initialize All Functions =====
  function init() {
    handleNavbarScroll();
    handleMobileMenu();
    setActiveNavLink();
    smoothScroll();
    animateCounters();
    scrollToTop();
    darkModeToggle();
    rtlToggle();
    lazyLoadImages();
    formValidation();
    initTooltips();
    initPopovers();
    initAOS();
    hidePreloader();
    accordionAutoClose();
    tabAutoSave();
    initSearch();
    galleryFilter();
  }

  // ===== Booking Form Handler =====
  function initBookingForm() {
    // Wait for modals to load, then initialize booking form
    setTimeout(() => {
      const bookingForm = document.getElementById('consultationForm');
      if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = {
            name: document.getElementById('consultName').value,
            email: document.getElementById('consultEmail').value,
            phone: document.getElementById('consultPhone').value,
            date: document.getElementById('consultDate').value,
            time: document.getElementById('consultTime').value,
            practice_area: document.getElementById('consultArea').value,
            message: document.getElementById('consultMessage').value
          };
          
          // Validate form
          if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.practice_area) {
            alert('Please fill in all required fields.');
            return;
          }
          
          // Show success message
          alert('Thank you! Your consultation request has been submitted. We will contact you within 24 hours.');
          
          // Close modal
          const consultationModal = document.getElementById('consultationModal');
          if (consultationModal) {
            const modal = bootstrap.Modal.getInstance(consultationModal);
            if (modal) {
              modal.hide();
            }
          }
          
          // Reset form
          bookingForm.reset();
          
          // Log form data (for testing)
          console.log('Booking form submitted:', formData);
        });
      }
    }, 500); // Wait 500ms for modals to load
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Initialize booking form handler
  initBookingForm();

})();

