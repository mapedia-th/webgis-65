function editData() {
    var data = {
        sname: $('#sname').val(),
        stype: $('#stype').val(),
        sdesc: $('#sdesc').val(),
        geom: pos.geom,
        id: pos.id
    }
    $.post('http://localhost:3000/api/update', data, (res) => {
        getData();
        $('form :input').val('');
        $("#status").empty().text("");
    })
}

function refreshPage() {
    location.reload(true);
}

function deleteData() {
    var data = {
        id: pos.id
    }
    $.post('http://localhost:3000/api/delete', data, (res) => {
        getData();
        $('form :input').val('');
        $("#status").empty().text("");
    })
}

var map = L.map('map', {
    center: [16.820378, 100.265787],
    zoom: 13
});

function loadMap() {
    // base map
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

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

    // overlay
    var cm_province_4326 = L.tileLayer.wms("http://localhost:8080/geoserver/wms?", {
        layers: 'geocmu:cm_province_4326',
        format: 'image/png',
        transparent: true,
    });

    var th_pro = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/webgis/wms?", {
        layers: 'webgis:th_pro',
        format: 'image/png',
        transparent: true,
    });

    var th_amp = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/webgis/wms?", {
        layers: 'webgis:th_amp',
        format: 'image/png',
        transparent: true,
    });

    var th_tam = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/webgis/wms?", {
        layers: 'webgis:th_tam',
        format: 'image/png',
        transparent: true,
    });

    var ways = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/webgis/wms?", {
        layers: 'webgis:ways',
        format: 'image/png',
        transparent: true,
    });

    var village = L.tileLayer.wms("https://ows.mapedia.co.th/geoserver/webgis/wms?", {
        layers: 'webgis:village',
        format: 'image/png',
        transparent: true,
    });

    var baseMap = {
        "OSM": osm.addTo(map),
        "OpenStreetMap_DE": OpenStreetMap_DE,
        "แผนที่ Hybridge": googleHybridge,
        "แผนที่ Terrain": googleTerrain
    }

    var overlayMap = {
        "ขอบจังหวัด": cm_province_4326,
        "ขอบจังหวัด": th_pro.addTo(map),
        "ขอบอำเภอ": th_amp.addTo(map),
        "ขอบตำบล": th_tam.addTo(map),
        "ถนน": ways.addTo(map),
        "หมู่บ้าน": village
    }

    L.control.layers(baseMap, overlayMap).addTo(map);
}

var gps;
// 12
function onLocationFound(e) {
    gps = L.marker(e.latlng, { draggable: true });
    gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    gps.on('dragend', (e) => {
        console.log(e)
    })
}

// 13
function onLocationError(e) {
    console.log(e.message);
}

// 14
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 16 });

// 15
$('#fieldForm').submit(function (e) {
    e.preventDefault();
    $("#status").empty().text("File is uploading...");
    const obj = {
        sname: $('#sname').val(),
        stype: $('#stype').val(),
        sdesc: $('#sdesc').val(),
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    }

    console.log(obj)

    $(this).ajaxSubmit({
        data: obj,
        contentType: 'application/json',
        success: function (res) {
            // เรีกข้อมูลมาแสดงผล
            getData()
            $('form :input').val('');
            $("#status").empty().text("");
        }
    });
    return false;
});

var marker;
//16
function getData() {
    console.log(marker)
    if (marker) {
        map.removeLayer(marker);
    }
    $.get('http://localhost:3000/api/getdata', (res) => {
        // var fs = res.features;
        marker = L.geoJSON(res, {
            pointToLayer: (feature, latlng) => {
                return L.marker(latlng, { draggable: true });
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties) {
                    layer.bindPopup(
                        'ชื่อสถานที่: ' + feature.properties.sname + '</br>' +
                        'ประเภท: ' + feature.properties.stype + '</br>' +
                        'คำอธิบาย: ' + feature.properties.sdesc + '</br>' +
                        '<img src="/upload/' + feature.properties.simg + '" width="250px">'
                    );
                }
            }
        }).on('click', selectMarker);
        marker.addTo(map);
    })
}

var pos;
// 21
function selectMarker(e) {
    // console.log(e);
    $('#sname').val(e.layer.feature.properties.sname);
    $('#stype').val(e.layer.feature.properties.stype);
    $('#sdesc').val(e.layer.feature.properties.sdesc);
    $("#edit").attr("disabled", false);
    $("#remove").attr("disabled", false);
    pos = {
        geom: '{"type":"Point","coordinates":[' + e.latlng.lng + ',' + e.latlng.lat + ']}',
        id: e.layer.feature.properties.id
    }
    console.log(pos);
    $("#status").empty().text("กำลังแก้ใขข้อมูล..");
}

// 22
map.on('click', () => {
    $('form :input').val('');
    $("#edit").attr("disabled", true);
    $("#remove").attr("disabled", true);
    $("#status").empty().text("");
});

// เรียกฟังก์ชัน
loadMap()
getData()