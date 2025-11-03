/**
 * LawFIRM - AJAX Forms Handler
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ===== Contact Form Handler =====
  function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
          // Simulate API call (replace with your actual endpoint)
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          
          // For demo purposes, simulate success after 1 second
          setTimeout(() => {
            showAlert('success', 'Message sent successfully! We will get back to you soon.');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Failed to send message. Please try again later.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Consultation Form Handler =====
  function handleConsultationForm() {
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
      consultationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        
        try {
          // Simulate API call
          setTimeout(() => {
            showAlert('success', 'Consultation booked successfully! We will contact you shortly.');
            consultationForm.reset();
            
            // Close modal if form is in modal
            const modal = consultationForm.closest('.modal');
            if (modal) {
              const bsModal = bootstrap.Modal.getInstance(modal);
              if (bsModal) bsModal.hide();
            }
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Failed to book consultation. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Newsletter Subscription =====
  function handleNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const email = this.querySelector('input[type="email"]').value;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        try {
          // Simulate API call
          setTimeout(() => {
            showAlert('success', 'Successfully subscribed to newsletter!');
            newsletterForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Subscription failed. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Login Form Handler =====
  function handleLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        
        try {
          // Simulate API call
          setTimeout(() => {
            // Store user session (demo only)
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userName', data.email.split('@')[0]);
            
            showAlert('success', 'Login successful! Redirecting...');
            
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1000);
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Login failed. Please check your credentials.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Register Form Handler =====
  function handleRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Password validation
        if (data.password !== data.confirmPassword) {
          showAlert('error', 'Passwords do not match!');
          return;
        }
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        
        try {
          // Simulate API call
          setTimeout(() => {
            showAlert('success', 'Account created successfully! Please login.');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 1500);
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Registration failed. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Case Request Form =====
  function handleCaseRequestForm() {
    const caseForm = document.getElementById('caseRequestForm');
    
    if (caseForm) {
      caseForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        const formData = new FormData(this);
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
          // Simulate API call
          setTimeout(() => {
            showAlert('success', 'Case request submitted successfully! Our team will review it.');
            caseForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Failed to submit case request. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Review/Testimonial Form =====
  function handleReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
      reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
          // Simulate API call
          setTimeout(() => {
            showAlert('success', 'Thank you for your review! It will be published after verification.');
            reviewForm.reset();
            
            // Reset star rating
            const stars = reviewForm.querySelectorAll('.star-rating i');
            stars.forEach(star => star.classList.remove('active'));
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'Failed to submit review. Please try again.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    }
  }

  // ===== Alert/Notification System =====
  function showAlert(type, message) {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alertContainer';
      alertContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
      `;
      document.body.appendChild(alertContainer);
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.style.cssText = `
      box-shadow: var(--shadow-lg);
      animation: slideInRight 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    
    alert.innerHTML = `
      <i class="fas fa-${icon} me-2"></i>
      <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      alert.classList.remove('show');
      setTimeout(() => {
        alert.remove();
      }, 150);
    }, 5000);
  }

  // ===== Star Rating System =====
  function initStarRating() {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
      const stars = container.querySelectorAll('i');
      const input = container.querySelector('input[type="hidden"]');
      
      stars.forEach((star, index) => {
        star.addEventListener('click', function() {
          // Remove active class from all stars
          stars.forEach(s => s.classList.remove('active'));
          
          // Add active class to clicked star and all previous stars
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add('active');
          }
          
          // Update hidden input value
          if (input) {
            input.value = index + 1;
          }
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
          stars.forEach(s => s.classList.remove('hover'));
          for (let i = 0; i <= index; i++) {
            stars[i].classList.add('hover');
          }
        });
      });
      
      container.addEventListener('mouseleave', function() {
        stars.forEach(s => s.classList.remove('hover'));
      });
    });
  }

  // ===== AJAX File Upload =====
  function handleFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"][data-ajax]');
    
    fileInputs.forEach(input => {
      input.addEventListener('change', async function(e) {
        const files = e.target.files;
        const formData = new FormData();
        
        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i]);
        }
        
        try {
          // Show upload progress
          const progressBar = this.parentElement.querySelector('.progress-bar');
          if (progressBar) {
            progressBar.style.width = '50%';
          }
          
          // Simulate upload
          setTimeout(() => {
            if (progressBar) {
              progressBar.style.width = '100%';
            }
            showAlert('success', 'Files uploaded successfully!');
          }, 1000);
          
        } catch (error) {
          showAlert('error', 'File upload failed. Please try again.');
        }
      });
    });
  }

  // ===== Initialize All AJAX Functions =====
  function init() {
    handleContactForm();
    handleConsultationForm();
    handleNewsletterForm();
    handleLoginForm();
    handleRegisterForm();
    handleCaseRequestForm();
    handleReviewForm();
    initStarRating();
    handleFileUpload();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

