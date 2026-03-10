// 滚动进度指示器
(function() {
    'use strict';
    
    // 初始化进度条
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;
    
    // 设置进度条样式
    function setProgressBarStyles() {
        progressBar.style.background = 'linear-gradient(90deg, #558fb5, #7ba7cc)';
        progressBar.style.height = '3px';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.zIndex = '9999';
        progressBar.style.transition = 'width 0.1s ease-out';
    }
    
    // 更新进度条
    function updateProgressBar() {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollableHeight = documentHeight - viewportHeight;
        const progress = Math.max(0, Math.min(100, (scrollTop / Math.max(1, scrollableHeight)) * 100));
        
        progressBar.style.width = progress + '%';
    }
    
    // 节流函数优化性能
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function(...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // 初始化
    setProgressBarStyles();
    
    // 事件监听
    const throttledUpdate = throttle(updateProgressBar, 16); // ~60fps
    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('load', () => setTimeout(updateProgressBar, 300));
    
    // docsify路由变化时更新
    if (window.$docsify) {
        window.$docsify.plugins = (window.$docsify.plugins || []).concat(function(hook) {
            hook.doneEach(function() {
                setTimeout(updateProgressBar, 100);
            });
        });
    }
})();