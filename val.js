
const innerPolygon = document.getElementById("inner-polygon");
const innerSVG = document.getElementById("inner-svg");
const outer = document.getElementById("outer");
const heartBtn = document.getElementById("heart-btn");
const closeBtn = document.getElementById("close-btn");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");
const letter = document.getElementById("letter");
const floatingHearts = document.querySelector(".floating-hearts");
const particles = document.getElementById("particles");

function toggleEnvelope() {
  outer.classList.toggle("outer-open");
  innerSVG.classList.toggle("flip");
  heartBtn.classList.toggle("hide");
  closeBtn.classList.toggle("show");
  message1.classList.toggle("hide");
  message2.classList.toggle("show");
  letter.classList.toggle("show");
}

function popHearts() {
  // brief formation animation for the decorative hearts
  floatingHearts.classList.add("pop-animation");

  // spawn colorful particle hearts
  spawnParticles(30);

  setTimeout(() => {
    floatingHearts.classList.remove("pop-animation");
  }, 3000);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnParticles(count) {
  if (!particles) return;
  const colors = ['#ff6b9a', '#ff315b', '#ffb6c1', '#ffd1dc', '#ff7aa2'];
  const container = document.querySelector('.envelope-container');
  if (!container) return;
  const containerRect = container.getBoundingClientRect();
  const heartRect = heartBtn.getBoundingClientRect();
  const heartCenterX = heartRect.left - containerRect.left + heartRect.width / 2;
  const heartCenterY = heartRect.top - containerRect.top + heartRect.height / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'particle heart';
    const size = Math.floor(rand(8, 22));
    const dx = Math.floor(rand(-140, 140));
    const dy = Math.floor(rand(90, 360));
    const rot = Math.floor(rand(-60, 60));
    const dur = (rand(1.2, 3)).toFixed(2) + 's';
    const color = colors[Math.floor(rand(0, colors.length))];

    el.style.setProperty('--s', size + 'px');
    el.style.setProperty('--dx', dx + 'px');
    el.style.setProperty('--dy', '-' + dy + 'px');
    el.style.setProperty('--rot', rot + 'deg');
    el.style.setProperty('--d', dur);
    el.style.left = (heartCenterX + rand(-20, 20)) + 'px';
    el.style.top = (heartCenterY + rand(-10, 10)) + 'px';
    el.style.background = color;

    particles.appendChild(el);

    
    el.addEventListener('animationend', () => {
      el.remove();
    });
  }
}

heartBtn.addEventListener("click", function() {
  toggleEnvelope();
  popHearts();
});
