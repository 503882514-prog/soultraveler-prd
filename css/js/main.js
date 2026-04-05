/* ===========================
   心流旅人 PRD - 完整交互逻辑
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
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

/* ===========================
   Hero Stars 星空背景
   =========================== */
function initStars() {
  var container = document.getElementById('heroStars');
  if (!container) return;
  for (var i = 0; i < 80; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    var size = (1 + Math.random() * 2) + 'px';
    star.style.width = size;
    star.style.height = size;
    container.appendChild(star);
  }
}

/* ===========================
   Scroll Spy 滚动导航高亮
   =========================== */
function initScrollSpy() {
  var sections = document.querySelectorAll('.chapter');
  var navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        var id = entry.target.id;
        var activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(function(section) {
    observer.observe(section);
  });
}

/* ===========================
   Sidebar 侧边栏（移动端）
   =========================== */
function initSidebar() {
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
  });

  // 点击链接后关闭侧边栏
  var links = sidebar.querySelectorAll('.nav-link');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
      }
    });
  });

  // 点击外部关闭
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1024 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn) {
      sidebar.classList.remove('open');
    }
  });
}

/* ===========================
   Scroll Animations 滚动动画
   =========================== */
function initAnimations() {
  var elements = document.querySelectorAll('[data-aos]');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    var delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = delay + 'ms';
    }

    observer.observe(el);
  });
}

/* ===========================
   Market Funnel 市场漏斗动画
   =========================== */
function initFunnel() {
  // 市场漏斗
  var funnelBars = document.querySelectorAll('.funnel-layer .funnel-bar');
  var funnelObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var parent = entry.target.closest('.funnel-layer');
        var targetWidth = parent ? parent.getAttribute('data-width') : 100;
        entry.target.style.width = targetWidth + '%';
        funnelObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  funnelBars.forEach(function(bar) {
    funnelObserver.observe(bar);
  });
}

/* ===========================
   Metrics Bar 指标进度条动画
   =========================== */
function initMetrics() {
  var fills = document.querySelectorAll('.metric-fill');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var target = entry.target.getAttribute('data-target');
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(function(fill) {
    observer.observe(fill);
  });
}

/* ===========================
   Workload Bars 工作量条形图
   =========================== */
function initWorkloadBars() {
  var bars = document.querySelectorAll('.workload-bar');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var targetWidth = getComputedStyle(entry.target).getPropertyValue('--target-width');
        entry.target.style.width = targetWidth;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(function(bar) {
    observer.observe(bar);
  });
}

/* ===========================
   Cost Animation 成本数字动画
   =========================== */
function initCostAnimation() {
  var container = document.getElementById('costCompare');
  if (!container) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCostNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}

function animateCostNumbers() {
  var nums = document.querySelectorAll('.cost-num[data-target]');
  var totalNum = document.querySelector('.cost-total-num[data-target]');

  nums.forEach(function(num) {
    var target = parseInt(num.getAttribute('data-target'));
    animateNumber(num, 0, target, 1500, '¥');
  });

  if (totalNum) {
    var target = parseInt(totalNum.getAttribute('data-target'));
    animateNumber(totalNum, 0, target, 2000, '¥');
  }
}

function animateNumber(el, start, end, duration, prefix) {
  var startTime = performance.now();

  function update(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(start + (end - start) * eased);

    el.textContent = prefix + current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ===========================
   Radar Chart 雷达图
   =========================== */
function initRadarChart() {
  var canvas = document.getElementById('radarChart');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;

  // 设置canvas实际大小
  canvas.width = 400 * dpr;
  canvas.height = 400 * dpr;
  canvas.style.width = '400px';
  canvas.style.height = '400px';
  ctx.scale(dpr, dpr);

  // 产品数据
  var products = {
    soultraveler: { name: '心流旅人', data: [90, 85, 90, 85, 80], color: '#6C63FF' },
    forest:       { name: 'Forest',   data: [40, 30, 45, 50, 20], color: '#4ade80' },
    tide:         { name: '潮汐',     data: [20, 55, 30, 30, 15], color: '#60a5fa' },
    sleep:        { name: '小睡眠',   data: [20, 30, 20, 40, 15], color: '#f87171' }
  };

  var labels = ['游戏化深度', '情感连接', '长期留存', '社交传播', '内容壁垒'];
  var currentProduct = 'soultraveler';

  // 竞品说明文字
  var summaries = {
    soultraveler: '心流旅人在<strong>游戏化深度</strong>、<strong>情感连接</strong>和<strong>长期留存驱动</strong>三个维度显著领先竞品。',
    forest: 'Forest在<strong>社交传播</strong>上有一定优势（森林截图），但游戏化深度和情感连接较弱。',
    tide: '潮汐的<strong>情感连接</strong>依靠自然音景有一定基础，但缺乏游戏化和内容壁垒。',
    sleep: '小睡眠聚焦助眠场景，在专注领域的各维度均不突出。'
  };

  function drawRadar(productKey) {
    var size = 150;
    var cx = 200;
    var cy = 200;
    var steps = 5;
    var count = labels.length;

    ctx.clearRect(0, 0, 400, 400);

    // 画网格
    for (var s = 1; s <= steps; s++) {
      ctx.beginPath();
      var r = (size / steps) * s;
      for (var i = 0; i <= count; i++) {
        var angle = (Math.PI * 2 / count) * i - Math.PI / 2;
        var x = cx + r * Math.cos(angle);
        var y = cy + r * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // 画轴线和标签
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 / count) * i - Math.PI / 2;

      // 轴线
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + size * Math.cos(angle), cy + size * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 标签
      var labelR = size + 25;
      var lx = cx + labelR * Math.cos(angle);
      var ly = cy + labelR * Math.sin(angle);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], lx, ly);
    }

    // 画数据区域
    var product = products[productKey];

    ctx.beginPath();
    for (var i = 0; i <= count; i++) {
      var idx = i % count;
      var angle = (Math.PI * 2 / count) * idx - Math.PI / 2;
      var r = (product.data[idx] / 100) * size;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = product.color + '30';
    ctx.fill();
    ctx.strokeStyle = product.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 画数据点
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 / count) * i - Math.PI / 2;
      var r = (product.data[i] / 100) * size;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = product.color;
      ctx.fill();
      ctx.strokeStyle = '#0A0E27';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // 首次绘制
  drawRadar(currentProduct);

  // Tab切换
  var tabs = document.querySelectorAll('.radar-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentProduct = tab.getAttribute('data-product');
      drawRadar(currentProduct);

      // 更新说明文字
      var legend = document.getElementById('radarLegend');
      if (legend && summaries[currentProduct]) {
        legend.innerHTML = '<p class="radar-summary">' + summaries[currentProduct] + '</p>';
      }
    });
  });
}

/* ===========================
   Module Defaults 默认展开第一个模块
   =========================== */
function initModuleDefaults() {
  var firstModule = document.querySelector('.module-card.open');
  if (firstModule) {
    var body = firstModule.querySelector('.module-body');
    if (body) {
      body.style.display = 'block';
    }
  }
}

/* ===========================
   以下是全局交互函数
   可在 HTML onclick 中调用
   =========================== */

/* --- Persona 展开/收起 --- */
function togglePersona(id) {
  var card = document.getElementById(id);
  if (card) {
    card.classList.toggle('open');
  }
}

/* --- Accordion 手风琴 --- */
function toggleAccordion(header) {
  var item = header.closest('.accordion-item');
  if (!item) return;

  // 关闭同级其他项
  var siblings = item.parentElement.querySelectorAll('.accordion-item');
  siblings.forEach(function(s) {
    if (s !== item) {
      s.classList.remove('open');
    }
  });

  item.classList.toggle('open');
}

/* --- Module 模块展开/收起 --- */
function toggleModule(header) {
  var card = header.closest('.module-card');
  if (card) {
    card.classList.toggle('open');
  }
}

/* --- Architecture Tab 架构标签切换 --- */
function switchArch(btn, panelId) {
  var tabs = document.querySelectorAll('.arch-tab');
  tabs.forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');

  var panels = document.querySelectorAll('.arch-panel');
  panels.forEach(function(p) { p.classList.remove('active'); });

  var panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add('active');
  }
}

/* --- Prompt Tab 切换 --- */
function switchPrompt(btn, panelId) {
  var tabs = document.querySelectorAll('.prompt-tab');
  tabs.forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');

  var panels = document.querySelectorAll('.prompt-panel');
  panels.forEach(function(p) { p.classList.remove('active'); });

  var panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add('active');
  }
}

/* --- Priority Filter 优先级筛选 --- */
function filterPriority(btn, priority) {
  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');

  var rows = document.querySelectorAll('.feature-table tbody tr');
  rows.forEach(function(row) {
    if (priority === 'all') {
      row.style.display = '';
    } else {
      var rowPriority = row.getAttribute('data-priority');
      row.style.display = (rowPriority === priority) ? '' : 'none';
    }
  });
}

/* --- Pipeline Detail 流程步骤详情（移动端） --- */
function showPipelineDetail(stepEl, index) {
  var detail = stepEl.querySelector('.step-detail');
  if (!detail) return;

  var isVisible = detail.style.display === 'block';

  // 先隐藏所有
  var allDetails = document.querySelectorAll('.step-detail');
  allDetails.forEach(function(d) { d.style.display = 'none'; });

  // 切换当前
  detail.style.display = isVisible ? 'none' : 'block';
}

/* --- Copy Code 复制代码 --- */
function copyCode(btn) {
  var panel = btn.closest('.prompt-panel');
  if (!panel) return;

  var code = panel.querySelector('code');
  if (!code) return;

  var text = code.textContent;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showCopySuccess(btn);
    }).catch(function() {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function showCopySuccess(btn) {
  var originalText = btn.textContent;
  btn.textContent = '✅ 已复制';
  btn.style.background = 'rgba(34, 197, 94, 0.2)';
  btn.style.color = '#4ade80';
  btn.style.borderColor = 'rgba(34, 197, 94, 0.3)';

  setTimeout(function() {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 2000);
}

function fallbackCopy(text, btn) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    showCopySuccess(btn);
  } catch (e) {
    btn.textContent = '❌ 复制失败';
    setTimeout(function() {
      btn.textContent = '📋 复制';
    }, 2000);
  }

  document.body.removeChild(textarea);
}

/* ===========================
   Hero CTA 平滑滚动
   =========================== */
document.addEventListener('click', function(e) {
  var cta = e.target.closest('.hero-cta');
  if (cta) {
    e.preventDefault();
    var target = document.getElementById('chapter1');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* ===========================
   Resize Handler 窗口尺寸变化
   =========================== */
var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // 桌面端自动关闭侧边栏
    if (window.innerWidth > 1024) {
      var sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('open');
      }
    }
  }, 250);
});
