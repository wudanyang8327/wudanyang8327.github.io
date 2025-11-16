// Lightweight Image Lightbox
// 功能：点击任意内容区图片，弹出居中放大预览；点击空白/图片或按 Esc 关闭。
// 低侵入：不修改原有 HTML，仅在运行期动态插入 overlay。

document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('main.content img'));
    if (!images.length) return;

    images.forEach(img => {
        // 添加一个标识类，方便后续若需差异化样式
        img.classList.add('img-zoomable');
        // 仅在未被显式标记禁止时启用（可给图片加 data-no-lightbox="true" 禁用）
        if (img.dataset.noLightbox === 'true') return;
        img.addEventListener('click', () => openLightbox(img));
    });

    function openLightbox(original) {
        // 防止重复打开
        if (document.querySelector('.image-lightbox-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'image-lightbox-overlay';

        const clone = original.cloneNode(true);
        // 清除可能的行内样式或缩放影响
        clone.removeAttribute('style');
        overlay.appendChild(clone);

        document.body.appendChild(overlay);
        document.body.classList.add('image-lightbox-open');

        const escListener = (e) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', escListener);

        function close() {
            overlay.remove();
            document.body.classList.remove('image-lightbox-open');
            window.removeEventListener('keydown', escListener);
        }

        // 点击背景或图片本身关闭
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === clone) close();
        });
    }
});
