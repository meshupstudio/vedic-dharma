document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal. Content is visible by default (see CSS); JS only opts
// elements that start below the fold into a hidden "pre-reveal" state,
// so a blocked/erroring script never hides page content.
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('pre-reveal');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('pre-reveal');
    }
    observer.observe(el);
  });
}

// Netlify Forms via fetch, so the visitor stays on the page
// (a plain HTML POST would redirect to Netlify's generic success page)
const subscribeForm = document.getElementById('subscribeForm');
const formStatus = document.getElementById('formStatus');

function encodeFormData(form) {
  return new URLSearchParams(new FormData(form)).toString();
}

subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(subscribeForm),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Form submission failed');
    })
    .then(() => {
      formStatus.textContent = 'Thank you for contacting us. We will get back to you as soon as possible.';
      formStatus.className = 'form-status success';
      formStatus.hidden = false;
      subscribeForm.reset();
    })
    .catch(() => {
      formStatus.textContent = 'Oops, there was an error sending your message. Please try again later.';
      formStatus.className = 'form-status error';
      formStatus.hidden = false;
    });
});
