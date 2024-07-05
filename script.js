// script.js

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const address = document.getElementById('addressInput').value;
    fetchAddressCoordinates(address);
});

// Function to fetch coordinates for the given address
function fetchAddressCoordinates(address) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const location = data[0];
                const lat = location.lat;
                const lon = location.lon;
                displayMap(lat, lon);
            } else {
                alert('Address not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching address coordinates:', error);
        });
}

// Function to display the map with a marker at the given coordinates
function displayMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
}
