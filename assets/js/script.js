document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const image = document.getElementById('large-image');
    const customCursor = document.createElement('div');
    customCursor.id = 'custom-cursor';
    document.body.appendChild(customCursor);

    const scale = 0.25;  // Facteur de zoom à 25%
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Initialisation des styles de l'image
    image.style.position = 'absolute';
    image.style.left = '0px';
    image.style.top = '0px';

    container.addEventListener('mousedown', function (e) {
        isDragging = true;
        container.style.cursor = 'grabbing';
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt(image.style.left, 10);
        initialTop = parseInt(image.style.top, 10);
    });

    container.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newLeft = initialLeft + dx / scale;
            let newTop = initialTop + dy / scale;

            // Limiter le déplacement à l'intérieur des bordures de l'image
            const maxLeft = 0;
            const maxTop = 0;
            const minLeft = -(image.width * scale - container.clientWidth);
            const minTop = -(image.height * scale - container.clientHeight);

            newLeft = Math.max(Math.min(newLeft, maxLeft), minLeft);
            newTop = Math.max(Math.min(newTop, maxTop), minTop);

            image.style.left = newLeft + 'px';
            image.style.top = newTop + 'px';
        }
    });

    container.addEventListener('mouseup', function () {
        isDragging = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', function () {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'grab';
        }
    });

    container.addEventListener('mouseenter', function () {
        if (!isDragging) {
            container.style.cursor = 'grab';
        }
    });
});
