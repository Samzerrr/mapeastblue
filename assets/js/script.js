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
        image.style.top = '0px';
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

        image.style.left = clampPosition(imageStartPosition.left + dx, 0, -(image.width * scale - container.clientWidth)) + 'px';
        image.style.top = clampPosition(imageStartPosition.top + dy, 0, -(image.height * scale - container.clientHeight)) + 'px';
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
