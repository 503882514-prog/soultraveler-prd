/* ===========================
   心流旅人 PRD - 交互逻辑
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initScrollSpy();
  initSidebar();
  initAnimations();
  initFunnel();
  initMetrics();
  initWorkloadBars();
  initCostAnimation();
  initRadarChart();
  initModuleDefaults();
});

/* --- Hero Stars --- */
function initStars() {
  const container = document.getElementById('heroStars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    star.style.width = (1 + Math.random() * 2) + 'px';
    star.style.height = star.style.width;
    container.appendChild(star);
  }
}

/* --- Scroll Spy --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('.chapter');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

/* --- Sidebar Mobile --- */
function initSidebar() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar on link click (mobile)
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 &&
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          e.target !== menuBtn) {
        sidebar.classList.remove('open');
      }
    });
  }
}

/* --- Scroll Animations --- */
function initAnimations() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = delay + 'ms';
    }

    observer.observe(el);
  });
}

// Add animation class handler
document.addEventListener('scroll', () => {
  document.querySelectorAll('.aos-animate').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Trigger initial check
setTimeout(() => {
  document.querySelectorAll('.aos-animate').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}, 100);

/* --- Market Funnel Animation --- */
function initFunnel() {
  const funnelBars = document.querySelectorAll('.funnel-layer .funnel-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.funnel-layer');
        const targetWidth = parent ? parent.getAttribute('data-width') : 100;
        entry.target.style.width = targetWidth + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  funnelBars.forEach(bar => observer.observe(bar));

  // Conversion funnel
  const conversionSteps = document.querySelectorAll('.funnel-step .funnel-step-bar');
  const convObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.funnel-step');
        const targetWidth = parent ? parent.getAttribute('data-width') : 100;
        entry.target.style.width = targetWidth + '%';
        convObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  conversionSteps.forEach(step => convObserver.observe(step));
}

/* --- Metrics Bar Animation --- */
function initMetrics() {
  const fills = document.querySelectorAll('.metric-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-target');
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
}

/* --- Workload Bars --- */
function initWorkloadBars() {
  const bars = document.querySelectorAll('.workload-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = getComputedStyle(entry.target).getPropertyValue('--target-width');
        entry.target.style.width = targetWidth;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* --- Cost Animation --- */
function initCostAnimation() {
  const container = document.getElementById('costCompare');
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCostNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}

function animateCostNumbers() {
  const nums = document.querySelectorAll('.cost-num[data-target]');
  const totalNum = document.querySelector('.cost-total-num[data-target]');

  nums.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'));
    animateNumber(num, 0, target, 1500, '¥');
  });

  if (totalNum) {
    const target = parseInt(totalNum.getAttribute('data-target'));
    animateNumber(totalNum, 0, target, 2000, '¥');
  }
}

function animateNumber(el, start, end, duration, prefix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    el.textContent = prefix + current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --- Radar Chart (Simple Canvas) --- */
function initRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 400 * dpr;
  canvas.height = 400 * dpr;
  ctx.scale(dpr, dpr);

  const products = {
    soultraveler: { name: '心流旅人', data: [90, 85, 90, 85, 80], color: '#6C63FF' },
    forest: { name: 'Forest', data: [40, 30, 45, 50, 20], color: '#4ade80' },
    tide: { name: '潮汐', data: [20, 55, 30, 30, 15], color: '#60a5fa' },
    sleep: { name: '小睡眠', data: [20, 30, 20, 40, 15], color: '#f87171' }
  };

  const labels = ['游戏化深度', '情感连接', '长期留存', '社交传播', '内容壁垒'];
  let currentProduct = 'soultraveler';

  function drawRadar(productKey) {
    const size = 150;
    const cx = 200;
    const cy = 200;
    const steps = 5;

    ctx.clearRect(0, 0, 400, 400);

    // Grid
    for (let s = 1; s <= steps; s++) {
      ctx.beginPath();
      const r = (size / steps) * s;
      for (let i = 0; i <= labels.length; i++) {
        const angle = (Math.PI * 2 / labels.length) * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < labels.length; i++) {
      const angle = (Math.PI * 2 / labels.length) * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + size * Math.cos(angle), cy + size * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.stroke();

      // Labels
      const labelR = size + 25;
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], lx, ly);
    }

    // Data polygon
    const product = products[productKey];
    ctx.beginPath();
    for (let i = 0; i <= labels.length; i++) {
      const idx = i % labels.length;
      const angle = (Math.PI * 2 / labels.length) * idx - Math.PI / 2;
      const r = (product.data[idx] / 100) * size;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = product.color + '30';
    ctx.fill();
    ctx.strokeStyle = product.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < labels.length; i++) {
      const angle = (Math.PI * 2 / labels.length) * i - Math.PI / 2;
      const r = (product.data[i] / 100) * size;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = product.color
      ctx.fill();
      ctx.strokeStyle = '#0A0E27';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  drawRadar(currentProduct);
  // Tab switching
  document.querySelectorAll('.radar-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.radar-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentProduct = tab.getAttribute('data-product');
      drawRadar(currentProduct);
      const legend = document.getElementById('radarLegend');
      if (legend) {
        const summaries = {
          soultraveler: '心流旅人在<strong>游戏化深度</strong>、<strong>情感连接</strong>和<strong>长期留存驱动</strong>三个维度显著领先竞品。',
          forest: 'Forest在<strong>社交传播</strong>上有一定优势（森林截图），但游戏化深度和情感连接较弱。',
          tide: '潮汐的<strong>情感连接</strong>依靠自然音景有一定基础，但缺乏游戏化和内容壁垒。',
          sleep: '小睡眠聚焦助眠场景，在专注领域的各维度均不突出。'
        };
        legend.innerHTML = '<p class="radar-summary">' + summaries[currentProduct] + '</p>';
      }
    });
  });
}
/* --- Module Defaults --- */
function initModuleDefaults() {
  // Open the first module by default
  const firstModule = document.querySelector('.module-card');
  if (firstModule) {
    firstModule.classList.add('open');
  }
}
/* ===========================
   Global Interactive Functions
   =========================== */
/* --- Persona Toggle --- */
function togglePersona(id) {
  const card = document.getElementById(id);
  if (card) {
    card.classList.toggle('open');
  }
}
/* --- Accordion Toggle --- */
function toggleAccordion(header) {
  const item = header.closest('.accordion-item');
  if (item) {
    // Close others
    const siblings = item.parentElement.querySelectorAll('.accordion-item');
    siblings.forEach(s => {
      if (s !== item) s.classList.remove('open');
    });
    item.classList.toggle('open');
  }
}
/* --- Module Toggle --- */
function toggleModule(header) {
  const card = header.closest('.module-card');
  if (card) {
    card.classList.toggle('open');
  }
}
/* --- Architecture Tab Switch --- */
function switchArch(btn, panelId) {
  document.querySelectorAll('.arch-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.arch-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}
/* --- Prompt Tab Switch --- */
function switchPrompt(btn, panelId) {
  document.querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.prompt-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}
/* --- Priority Filter --- */
function filterPriority(btn, priority) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.feature-table tbody tr').forEach(row => {
    if (priority === 'all') {
      row.style.display = '';
    } else {
      const rowPriority = row.getAttribute('data-priority');
      row.style.display = rowPriority === priority ? '' : 'none';
    }
  });
}
/* --- Pipeline Detail --- */
function showPipelineDetail(stepEl, index) {
  // Handled by CSS :hover, this is a fallback for mobile
  const detail = stepEl.querySelector('.step-detail');
  if (detail) {
    const isVisible = detail.style.display === 'block';
    // Hide all others
    document.querySelectorAll('.step-detail').forEach(d => d.style.display = 'none');
    detail.style.display = isVisible ? 'none' : 'block';
  }
}
/* --- Copy Code --- */
function copyCode(btn) {
  const panel = btn.closest('.prompt-panel');
  if (!panel) return;
  const code = panel.querySelector('code');
  if (!code) return;
  const text = code.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = '✅ 已复制';
      btn.style.background = 'rgba(34, 197, 94, 0.2)';
      btn.style.color = '#4ade80';
      btn.style.borderColor = 'rgba(34, 197, 94, 0.3)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  } else {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      btn.textContent = '✅ 已复制';
      setTimeout(() => { btn.textContent = '📋 复制'; }, 2000);
    } catch (e) {
      btn.textContent = '❌ 复制失败';
      setTimeout(() => { btn.textContent = '📋 复制'; }, 2000);
    }
    document.body.removeChild(textarea);
  }
}
/* ===========================
   Smooth Scroll for Hero CTA
   =========================== */
document.addEventListener('click', (e) => {
  if (e.target.closest('.hero-cta')) {
    e.preventDefault();
    const target = document.getElementById('chapter1');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
/* ===========================
   Resize handler
   =========================== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close sidebar on resize to desktop
    if (window.innerWidth > 1024) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
    // Redraw radar
    initRadarChart();
  }, 250);
});
