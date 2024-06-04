function showInfo(event, id) {
    // Prevent default click behavior
    event.preventDefault();
    
    // Get the info tile element
    var tile = document.getElementById(id);
    
    // Calculate the position relative to the image
    var img = document.getElementById('map-image');
    var rect = img.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Log coordinates for debugging
    console.log('Image position:', rect);
    console.log('Click coordinates:', x, y);

    // Position the info tile near the clicked area
    tile.style.left = (x + 10) + 'px'; // Adjust positioning as needed
    tile.style.top = (y + 10) + 'px';
    tile.style.display = 'block';
}

function hideInfo(id) {
    // Hide the info tile
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
