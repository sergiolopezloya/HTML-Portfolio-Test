function toggleMenu() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Filter projects by category
function filterProjects(category) {
  const projects = document.querySelectorAll('#projects article');
  projects.forEach(project => {
    if (category === 'all' || project.classList.contains(category)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Lightbox effect for project images
function openLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close">&times;</span>
      <img src="${src}" alt="Project Image">
    </div>
  `;
  document.body.appendChild(lightbox);

  lightbox.querySelector('.close').addEventListener('click', () => {
    document.body.removeChild(lightbox);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      document.body.removeChild(lightbox);
    }
  });
}

document.querySelectorAll('#projects img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src);
  });
});

// Form validation for the contact form with real-time feedback
const contactForm = document.querySelector('#contact form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateInput(input) {
  if (!input.value.trim()) {
    input.classList.add('invalid');
    input.nextElementSibling.textContent = 'This field is required.';
  } else {
    input.classList.remove('invalid');
    input.nextElementSibling.textContent = '';
  }
}

nameInput.addEventListener('input', () => validateInput(nameInput));
emailInput.addEventListener('input', () => validateInput(emailInput));
messageInput.addEventListener('input', () => validateInput(messageInput));

contactForm.addEventListener('submit', function(e) {
  validateInput(nameInput);
  validateInput(emailInput);
  validateInput(messageInput);

  if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
    e.preventDefault();
    alert('Please fill in all fields before submitting.');
  }
});
