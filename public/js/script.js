const socket = io("http://localhost:3000");

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 2500,
    }
);
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 15);
    if (markers[id]) {
    // Correct method name to update marker location
    markers[id].setLatLng([latitude, longitude]);
} else {
    // Create a new marker for each unique user
    markers[id] = L.marker([latitude, longitude]).addTo(map);
}
});


