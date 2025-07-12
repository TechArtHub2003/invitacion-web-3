// === INICIALIZAR AOS (si usas animate on scroll)
AOS?.init({ once: true, duration: 800 });

// === INICIALIZAR SWIPER (galería)
new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: {
    delay: 3000
  }
});

// === CUENTA REGRESIVA
const timerElm = document.getElementById('timer');
if (timerElm) {
  const targetDate = new Date(timerElm.dataset.date);
  const fmt = val => String(val).padStart(2, '0');

  setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerElm.textContent = '¡Es hoy!';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    timerElm.innerHTML = `
      <div>${fmt(d)}<small>Días</small></div>
      <div>${fmt(h)}<small>Horas</small></div>
      <div>${fmt(m)}<small>Min</small></div>
      <div>${fmt(s)}<small>Seg</small></div>
    `;
  }, 1000);
}

// === FORMULARIO RSVP
const form = document.getElementById('rsvpForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const btn = form.querySelector('button');
  const msg = form.querySelector('.form-msg');

  btn.disabled = true;
  btn.textContent = "Enviando...";

  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbwkaeaIIue3QdLXMvFPMMawt2f7Gi11iytL_V2AsUF9vitZwgKAgHpvqmHUUQqQuJRt/exec', { // Reemplaza esto con tu URL real
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: data.get("nombre"),
        correo: data.get("correo"),
        invitados: data.get("invitados"),
        menu: data.get("menu"),
        secret: "12345" // misma clave que en Apps Script
      })
    });

    if (res.ok) {
      form.reset();
      msg.textContent = `¡Gracias por confirmar tu asistencia! ✨`;
      msg.hidden = false;
    } else {
      alert('Hubo un problema al enviar. Intenta más tarde.');
    }
  } catch (err) {
    alert('Error de conexión. Intenta más tarde.');
  } finally {
    btn.disabled = false;
    btn.textContent = "Enviar";
  }
});

// === ACTIVAR MODO OSCURO AUTOMÁTICAMENTE (noche 19:00 a 6:59)
const hour = new Date().getHours();
if (hour >= 19 || hour < 7) {
  document.body.classList.add('dark-mode');
}

// === BOTÓN SCROLL HERO ▼
const scrollBtn = document.querySelector('.scroll-down');
scrollBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  const next = document.getElementById('cuenta');
  next?.scrollIntoView({ behavior: 'smooth' });
});
