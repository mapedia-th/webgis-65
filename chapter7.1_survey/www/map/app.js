var map = L.map("map", {
    center: [16.802523951010112, 100.25663529689298],
    zoom: 10
})
// base map
var osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);

var google_road = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        lyr: "grod",
        isBase: "yes",
    }
);
var googleHybridge = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        lyr: "ghyb",
        isBase: "yes",
    }
);
var googleTerrain = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        lyr: "gter",
        isBase: "yes",
    }
);

// geoserver
var th_province = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/apis/wms?", {
    layers: 'apis:th_province',
    format: 'image/png',
    transparent: true,
    attribution: "mapedia"
});

var th_flood_level = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/wms?", {
    layers: 'apis:province',
    format: 'image/png',
    transparent: true,
    attribution: "mapedia"
});

var cm_village_4326 = L.tileLayer.wms("http://localhost:8080/geoserver/wms?", {
    layers: 'geocmu:cm_village_4326',
    format: 'image/png',
    transparent: true,
    attribution: "mapedia"
});

var baseLayers = {
    "แผนที่ osm": osm.addTo(map),
    "แผนที่ Terrain": googleTerrain
}

var overlayLayers = {
    "ขอบเขตจังหวัด": th_province.addTo(map),
    "ขอบเขตน้ำท่วม": th_flood_level,
    "ตำแหน่งหมู่บ้าน": cm_village_4326.addTo(map)
}

L.control.layers(baseLayers, overlayLayers).addTo(map);

