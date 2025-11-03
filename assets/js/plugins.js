/**
 * LawFIRM - Plugins and Third-Party Integrations
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ===== Testimonials Carousel (Owl Carousel / Swiper alternative) =====
  function initTestimonialCarousel() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    if (testimonialCarousel && typeof bootstrap !== 'undefined') {
      // Auto-play carousel
      const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 5000,
        wrap: true,
        pause: 'hover'
      });
    }
  }

  // ===== Clients Logo Carousel =====
  function initClientsCarousel() {
    const clientsCarousel = document.getElementById('clientsCarousel');
    
    if (clientsCarousel && typeof bootstrap !== 'undefined') {
      const carousel = new bootstrap.Carousel(clientsCarousel, {
        interval: 3000,
        wrap: true,
        pause: 'hover'
      });
    }
  }

  // ===== Lightbox for Gallery =====
  function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryImages.length > 0) {
      // Create lightbox modal
      const lightboxHTML = `
        <div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content bg-transparent border-0">
              <div class="modal-body p-0 position-relative">
                <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
                        data-bs-dismiss="modal" aria-label="Close" style="z-index: 1;"></button>
                <img src="" class="img-fluid w-100" id="lightboxImage" alt="Gallery Image">
                <div class="lightbox-controls position-absolute bottom-0 start-50 translate-middle-x mb-3">
                  <button class="btn btn-light me-2" id="prevImage">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button class="btn btn-light" id="nextImage">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add lightbox to page if not exists
      if (!document.getElementById('lightboxModal')) {
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
      }
      
      const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
      const lightboxImage = document.getElementById('lightboxImage');
      const prevBtn = document.getElementById('prevImage');
      const nextBtn = document.getElementById('nextImage');
      
      let currentIndex = 0;
      const images = Array.from(galleryImages);
      
      galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          currentIndex = index;
          lightboxImage.src = img.src;
          lightboxModal.show();
        });
      });
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          lightboxImage.src = images[currentIndex].src;
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex + 1) % images.length;
          lightboxImage.src = images[currentIndex].src;
        });
      }
    }
  }

  // ===== Isotope Alternative - Grid Filter =====
  function initIsotopeFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Filter items with animation
          portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            
            if (filter === '*' || categories.includes(filter)) {
              item.style.display = 'block';
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
  }

  // ===== Parallax Effect =====
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.5;
          element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
      });
    }
  }

  // ===== Typed.js Alternative - Text Animation =====
  function initTypedText() {
    const typedElements = document.querySelectorAll('.typed-text');
    
    typedElements.forEach(element => {
      const text = element.getAttribute('data-text');
      const speed = parseInt(element.getAttribute('data-speed')) || 100;
      let i = 0;
      
      element.textContent = '';
      
      function typeWriter() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        }
      }
      
      // Start typing when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(element);
          }
        });
      });
      
      observer.observe(element);
    });
  }

  // ===== CountUp.js Alternative =====
  function initCountUp() {
    const counters = document.querySelectorAll('.countup');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, 16);
            observer.unobserve(counter);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  // ===== Progress Bars Animation =====
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-progress]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.getAttribute('data-progress');
          
          setTimeout(() => {
            bar.style.width = progress + '%';
          }, 100);
          
          observer.unobserve(bar);
        }
      });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
  }

  // ===== Date Picker =====
  function initDatePicker() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
      // Set min date to today
      const today = new Date().toISOString().split('T')[0];
      input.setAttribute('min', today);
    });
  }

  // ===== Time Picker =====
  function initTimePicker() {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    
    timeInputs.forEach(input => {
      // Add step for 30-minute intervals
      input.setAttribute('step', '1800');
    });
  }

  // ===== Auto-resize Textarea =====
  function initAutoResizeTextarea() {
    const textareas = document.querySelectorAll('textarea[data-autoresize]');
    
    textareas.forEach(textarea => {
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    });
  }

  // ===== Copy to Clipboard =====
  function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const text = this.getAttribute('data-copy');
        
        navigator.clipboard.writeText(text).then(() => {
          // Show tooltip or feedback
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          
          setTimeout(() => {
            this.innerHTML = originalText;
          }, 2000);
        });
      });
    });
  }

  // ===== Print Functionality =====
  function initPrint() {
    const printButtons = document.querySelectorAll('[data-print]');
    
    printButtons.forEach(button => {
      button.addEventListener('click', function() {
        const target = this.getAttribute('data-print');
        const element = document.querySelector(target);
        
        if (element) {
          const printWindow = window.open('', '', 'height=600,width=800');
          printWindow.document.write('<html><head><title>Print</title>');
          printWindow.document.write('<link rel="stylesheet" href="../assets/css/style.css">');
          printWindow.document.write('</head><body>');
          printWindow.document.write(element.innerHTML);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
        }
      });
    });
  }

  // ===== Share Functionality =====
  function initShare() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', function() {
        const platform = this.getAttribute('data-share');
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl = '';
        
        switch(platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
          case 'email':
            shareUrl = `mailto:?subject=${title}&body=${url}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  // ===== Reading Time Calculator =====
  function initReadingTime() {
    const articles = document.querySelectorAll('[data-reading-time]');
    
    articles.forEach(article => {
      const text = article.textContent;
      const wordsPerMinute = 200;
      const wordCount = text.trim().split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      
      const badge = document.createElement('span');
      badge.className = 'badge bg-primary';
      badge.textContent = `${readingTime} min read`;
      
      article.insertBefore(badge, article.firstChild);
    });
  }

  // ===== Cookie Consent =====
  function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      const consentHTML = `
        <div class="cookie-consent position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3" 
             style="z-index: 9999;">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-9">
                <p class="mb-md-0">
                  <i class="fas fa-cookie-bite me-2 text-gold"></i>
                  We use cookies to enhance your browsing experience. By continuing to visit this site, 
                  you agree to our use of cookies.
                  <a href="privacy-policy.html" class="text-gold">Learn more</a>
                </p>
              </div>
              <div class="col-md-3 text-md-end">
                <button class="btn btn-primary btn-sm" id="acceptCookies">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', consentHTML);
      
      document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        document.querySelector('.cookie-consent').remove();
      });
    }
  }

  // ===== Initialize All Plugins =====
  function init() {
    initTestimonialCarousel();
    initClientsCarousel();
    initLightbox();
    initIsotopeFilter();
    initParallax();
    initTypedText();
    initCountUp();
    initProgressBars();
    initDatePicker();
    initTimePicker();
    initAutoResizeTextarea();
    initCopyToClipboard();
    initPrint();
    initShare();
    initReadingTime();
    initCookieConsent();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

