// Dark Mode Toggle
const toggle = document.getElementById('toggle-dark');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') html.classList.add('dark');
toggle.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
toggle.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  toggle.textContent = isDark ? '☀️' : '🌙';
});

// Scroll Progress + Reveal + Back to Top
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-progress').style.width = `${(scrollTop / docHeight) * 100}%`;

  document.querySelectorAll('.section-container').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) el.classList.add('reveal');
  });

  document.getElementById('back-to-top').classList.toggle('hidden', scrollTop < 300);
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const response = await fetch('https://formspree.io/f/xjkowqyp', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  });
  if (response.ok) {
    e.target.reset();
    document.getElementById('form-success').classList.remove('hidden');
  } else {
    alert('Failed to send. Try again later.');
  }
});
