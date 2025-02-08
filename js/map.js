function initMap() {
    var thaparUniversity = { lat: 30.3557, lng: 76.3623 }; // Thapar University, Patiala

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15, // Zoom level
        center: thaparUniversity,
    });

    var marker = new google.maps.Marker({
        position: thaparUniversity,
        map: map,
        title: "Thapar University, Patiala",
    });
}
