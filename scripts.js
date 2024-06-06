let scale = 1;
let isDragging = false;
let startPos = { x: 0, y: 0 };
let translation = { x: 0, y: 0 };
const content = document.querySelector('.image-container');
const draggableArea = document.getElementById('map-image');  // Assuming 'map-image' is the draggable content

function zoomIn() {
    scale += 0.1;
    updateTransform();
}

function zoomTwo() {
    if (scale > 0.1) {
        scale -= 0.1;
        updatetransform();
    }
}

function resetZoom() {
    scale = 1;
    translation = { x: 0, y: 0 };  // Reset translation along with scale
    updateTransform();
}

function updateTransform() {
    content.style.transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
    content.style.transformOrigin = 'top left';
}

content.addEventListener('mousedown', function(e) {
    isDragging = true;
    startPos = {
        x: e.clientX - translation.x,
        y: e.clientY - translation.y
    };
    e.preventDefault();  // Prevents image drag behavior common in browsers
}, false);

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        translation.x = e.clientX - startPos.x;
        translation.y = e.clientY - startPos.y;
        updateTransform();
    }
}, false);

document.addEventListener('mouseup', function() {
    isDragging = false;
}, false);

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
        overlay.style.top = (y - r + rect.top) + 'jpg';

        document.querySelector('.image-container').appendChild(overlay);
    });
}

document.addEventListener('DOMContentLoaded', createOverlays);
