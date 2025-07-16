// cursor-dot.js
(function () {
  const dot = document.createElement('div');
  dot.style.position = 'fixed';
  dot.style.pointerEvents = 'none';
  dot.style.zIndex = '9999';
  dot.style.width = '10px';
  dot.style.height = '10px';
  dot.style.borderRadius = '50%';
  dot.style.background =
    'linear-gradient(315deg, #52dafcff 0%, #1FA9FF 100%)';
  dot.style.boxSizing = 'border-box';
  dot.style.transform = 'translate(-50%, -50%)';
  dot.style.transition = 'left 0.08s linear, top 0.08s linear, background 0.2s';
  dot.style.mixBlendMode = 'screen';
  document.body.appendChild(dot);

  let lastX = window.innerWidth / 2;
  let lastY = window.innerHeight / 2;

  function updateDotStyle() {
    const isDark =
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('chakra-ui-dark');
    if (isDark) {
      dot.style.boxShadow = 'none';
      dot.style.mixBlendMode = 'screen';
    } else {
      dot.style.boxShadow = 'none';
      dot.style.mixBlendMode = 'normal';
    }
  }
  updateDotStyle();
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', updateDotStyle);
  const observer = new MutationObserver(updateDotStyle);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  function moveDot(x, y) {
    lastX += (x - lastX) * 0.7;
    lastY += (y - lastY) * 0.7;
    dot.style.left = lastX + 'px';
    dot.style.top = lastY + 'px';
    requestAnimationFrame(() => moveDot(lastTargetX, lastTargetY));
  }

  let lastTargetX = lastX;
  let lastTargetY = lastY;

  document.addEventListener('mousemove', (e) => {
    lastTargetX = e.clientX;
    lastTargetY = e.clientY;
  });

  // Add button hover effect for cursor dot, expanding from mouse enter position
  function handleButtonEnter(e) {
    // 获取鼠标相对button的位置
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // 设置CSS变量供按钮用
    btn.style.setProperty('--hover-x', `${x}px`);
    btn.style.setProperty('--hover-y', `${y}px`);
    // 放大圆点
    dot.style.transition = 'left 0.08s linear, top 0.08s linear, background 0.2s, transform 0.18s cubic-bezier(.4,0,.2,1)';
    dot.style.transform = 'translate(-50%, -50%) scale(2)';
  }
  function handleButtonLeave(e) {
    // 恢复圆点
    dot.style.transition = 'left 0.08s linear, top 0.08s linear, background 0.2s, transform 0.18s cubic-bezier(.4,0,.2,1)';
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  }

  function addButtonListeners() {
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach(btn => {
      btn.removeEventListener('mouseenter', handleButtonEnter);
      btn.removeEventListener('mouseleave', handleButtonLeave);
      btn.addEventListener('mouseenter', handleButtonEnter);
      btn.addEventListener('mouseleave', handleButtonLeave);
    });
  }

  // Initial and dynamic button listener binding
  addButtonListeners();
  // Observe DOM for new buttons (e.g., React re-render)
  const btnObserver = new MutationObserver(addButtonListeners);
  btnObserver.observe(document.body, { childList: true, subtree: true });

  moveDot(lastX, lastY);
})();
