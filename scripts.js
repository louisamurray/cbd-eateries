let scale = 1;
let isDragging = false;
let lastTouch = null;
let lastDistance = null;
let translation = { x: 0, y: 0 };

const content = document.querySelector('.image-container');
const draggableArea = document.getElementById('map-image');

function zoom(scaleFactor, center) {
    scale *= scaleFactor;
    // Adjust translation based on the zoom center
    translation.x -= (center.x - translation.x) * (scaleFactor - 1);
    translation.y -= (center.y - translation.y) * (scaleFactor - 1);
    updateTransform();
}

function updateTransform() {
    content.style.transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
    content.style.transformOrigin = '0 0';
}

function getCenter(touches) {
    const x = (touches[0].pageX + touches[1].pageX) / 2;
    const y = (touches[0].pageY + touches[1].pageY) / 2;
    return { x, y };
}

function handleTouchStart(evt) {
    if (evt.touches.length === 1) {
        lastTouch = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
        isDragging = true;
    } else if (evt.touches.length === 2) {
        lastDistance = Math.hypot(
            evt.touches[0].pageX - evt.touches[1].pageX,
            evt.touches[0].pageY - evt.touches[1].pageY
        );
        lastTouch = getCenter(evt.touches);
    }
    evt.preventDefault();
}

function handleTouchMove(evt) {
    if (evt.touches.length === 1 && isDragging) {
        const currentTouch = { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
        translation.x += currentTouch.x - lastTouch.x;
        translation.y += currentTouch.y - lastTouch.y;
        lastTouch = currentTouch;
        updateTransform();
    } else if (evt.touches.length === 2) {
        const currentDistance = Math.hypot(
            evt.touches[0].pageX - evt.touches[1].pageX,
            evt.touches[0].pageY - evt.touches[1].pageY
        );
        const center = getCenter(evt.touches);
        if (lastDistance != null) {
            const scaleFactor = currentDistance / lastDistance;
            zoom(scaleFactor, center);
        }
        lastDistance = currentDistance;
        lastTouch = center;
    }
}

function handleTouchEnd(evt) {
    if (evt.touches.length < 2) {
        lastDistance = null;
    }
    if (evt.touches.length === 0) {
        isDragging = false;
    }
}

// Other functions (showInfo, hideInfo, createOverlays) remain unchanged

// Event Listeners for touch and mouse interactions
content.addEventListener('touchstart', handleTouchStart, { passive: false });
content.addEventListener('touchmove', handleTouchMove, { passive: false });
content.addEventListener('touchend', handleTouchInit);

document.addEventListener('DOMContentLoaded', createOverlays);
