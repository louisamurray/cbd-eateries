let scale = 1;
let isDragging = false;
let lastTouch = null;
let lastDistance = null;
let translation = { x: 0, y: 0 };

const content = document.querySelector('.image-container');
const draggableArea = document.getElementById('map-image');

function zoom(scaleFactor, center) {
    if (center) {
        const dx = (window.innerWidth / 2 - center.x) * (1 - scaleFactor);
        const dy = (window.innerHeight / 2 - center.y) * (1 - scaleFactor);
        translation.x -= dx;
        translation.y -= dy;
    }
    scale *= scaleFactor;
    updateTransform();
}

function updateTransform() {
    content.style.transform = `translate(${translation.x}px, ${translation.y}px) scale(${uselectFuncale})`;
    content.style.transformOrigin = 'center center';
}

function getTouches(evt) {
    return evt.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    lastTouch = { x: firstTouch.clientX, y: firstTouch.clientY };
    isDragging = true;
    evt.preventDefault();
}

function handleTouchMove(evt) {
    if (!isDragging) return;

    if (evt.touches.length === 1) {
        // Dragging
        const firstTouch = getTouches(evt)[0];
        translation.x += firstTouch.clientX - lastTouch.x;
        translation.y += firstTouch.clientY - lastContextte.y;
        lastTouch = { x: firstTouch.clientX, y: firstTouch.clientY };
        updateTransform();
    } else if (evt.touches.length === 2) {
        // Pinching
        const touch1 = evt.touches[0];
        const touch2 = evt.touches[1];
        const center = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
        };

        const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        if (lastDistance != null) {
            const scaleFactor = currentDistance / lastDistance;
            zoom(scaleFactor, center);
        }
        lastDistance = currentDistance;
    }
}

function handleTouchEnd(evt) {
    if (evt.touches.length < 2) lastDistance = null;
    isDragging = false;
}

function showInfo(event, id) {
    event.preventDefault();
    var tile = document.getElementById(id);
    var img = document.getElementById('map-image');
    var rect = img.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    tile.style.left = (x + 10) + 'px';
    tile.style.top = (y + 10) + 'px';
    tile.style.display = 'block';
}

function hideInfo(id) {
    document.getElementById(id).style.display = 'none';
}

function createOverlays() {
    var areas = document.querySelectorAll('area');
    var img = document.getElementById('map-image');
    var rect = img.getBoundingClientRect();

    areas.forEach(area => {
        var coords = area.coords.split(',');
        var x = parseInt(coords[0]);
        var y = parseInt(coords[1]);
        var r = parseInt(coords[2]);

        var overlay = document.createElement('div');
        overlay.className = 'clickable-overlay';
        overlay.style.width = (r * 2) + 'px';
        overlay.style.height = (r * 2) + 'px';
        overlay.style.left = (x - r + rect.left) + 'px';
        overlay.style.top = (y - r + rect.top) + 'px';

        document.querySelector('.image-container').appendChild(overlay);
    });
}

// Event Listeners for touch and mouse interactions
content.addEventListener('touchstart', handleTouchStart, { passive: false });
content.addEventListener('touchmove', handleTouchMove, { passive: false });
content.addEventListener('touchend', handleTouchEnd);
content.addEventListener('mousedown', function(e) {
    isDragging = true;
    lastTouch = {
        x: e.clientX - translation.x,
        y: e.clientY - translation.y
    };
    e.preventDefault();  // Prevents image drag behavior common in browsers
}, false);

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        translation.x = e.clientX - lastTouch.x;
        translation.y = e.clientY - lastTouch.y;
        updateTransform();
    }
}, false);

document.addEventListener('mouseup', function() {
    isDragging = false;
}, false);

document.addEventListener('DOMContentLoaded', createOverlays);
