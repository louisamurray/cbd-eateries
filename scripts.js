let scale = 1;
const content = document.querySelector('.image-container');

function zoomIn() {
    scale += 0.1;
    content.style.transform = `scale(${scale})`;
    content.style.transformOrigin = 'top left';
}

function zoomTwo() {
    if (scale > 0.1) {
        scale -= 0.1;
        content.style.transform = `scale(${scale})`;
        content.style.transformOrigin = 'top left';
    }
}

function showInfo(event, id) {
    event.preventDefault();
    var tile = document.getElementById(id);
    var img = document.getElementById('map-image');
    var rect = img.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    console.log('Image position:', rect);
    console.log('Click coordinates:', x, y);

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

document.addEventListener('DOMContentLoaded', createOverlays);
