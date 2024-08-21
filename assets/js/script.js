document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const image = document.getElementById('large-image');
    const scale = 0.25;

    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let imageStartPosition = { left: 0, top: 0 };

    initializeImagePosition();

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', stopDragging);
    container.addEventListener('mouseleave', stopDragging);
    container.addEventListener('mouseenter', onMouseEnter);

    function initializeImagePosition() {
        image.style.position = 'absolute';
        image.style.left = '0px';
        image.style.top = '40px';
        image.style.width = (container.clientWidth / scale) + 'px';
        image.style.height = 'auto';
        image.style.transform = `scale(${scale})`;
        image.style.transformOrigin = 'top left';
    }

    function onMouseDown(e) {
        isDragging = true;
        container.style.cursor = 'grabbing';
        dragStart.x = e.clientX;
        dragStart.y = e.clientY;
        imageStartPosition.left = parseInt(image.style.left, 10);
        imageStartPosition.top = parseInt(image.style.top, 10);
    }

    function onMouseMove(e) {
        if (!isDragging) return;

        const dx = (e.clientX - dragStart.x) / scale;
        const dy = (e.clientY - dragStart.y) / scale;

        const newLeft = clampPosition(imageStartPosition.left + dx, 0, -(image.clientWidth * scale - container.clientWidth));
        const newTop = clampPosition(imageStartPosition.top + dy, 40, -(image.clientHeight * scale - container.clientHeight + 40));

        image.style.left = newLeft + 'px';
        image.style.top = newTop + 'px';
    }

    function stopDragging() {
        isDragging = false;
        container.style.cursor = 'grab';
    }

    function onMouseEnter() {
        if (!isDragging) {
            container.style.cursor = 'grab';
        }
    }

    function clampPosition(value, max, min) {
        return Math.max(Math.min(value, max), min);
    }
});
