### สร้าง html 
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 1 เรียกใช้งาน css librar -->
</head>

<body>

</body>
<!-- 2 เรียกใช้งาน js library -->

</html>
```

### 1 เรียกใช้งาน css library 

```html
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit&display=swap" />
  <link rel="stylesheet" href="style.css" />
 
```

### 2 เรียกใช้งาน js library 
```html  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>
  <script src="app.js"></script>
```

### 3 ออกแบบการแสดงผล

```html
    <!-- 3 ออกแบบการแสดงผล -->
    <div class="container mt">
        <div class="row">
            <div class="col-sm-6">
                <div id="map"></div>
            </div>
            <div class="col-sm-6">
                <div class="dcard">
                    <h1 style="font-weight: bold">Building Survey</h1>
                    <h4>ฟอร์มสำหรับสำรวจที่พักอาศัย</h4>
                    <hr />
                    <!--  5 สร้างฟอร์มเก็บข้อมูล -->
                
                </div>
            </div>
        </div>
    </div>
```

### 4 กำหนด style การแสดงผล

```css
body {
  font-family: "Kanit", sans-serif;
}

#map {
  height: 620px;
  width: 100%;
  border-radius: 10px;
  background-color: rgb(240, 240, 240);
}

.mt {
  margin-top: 2rem;
}

.dcard {
  height: 620px;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: rgb(240, 240, 240);
}
```
### 5 สร้างฟอร์มเก็บข้อมูล
```html
          <form id="fieldForm" method="post" action="/api/insert" enctype="multipart/form-data">
            <div class="form-group">
              <label for="sname">ชื่อสถานที่</label>
              <input type="text" class="form-control" id="sname" required>
            </div>
            <div class="form-group">
              <label for="type">ประเภท:</label>
              <select class="form-control" id="stype" required>
                <option value="อาคารพานิชย์">อาคารพานิชย์</option>
                <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                <option value="สถานที่ราชการ">สถานที่ราชการ</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            <div class="form-group">
              <label for="desc">คำอธิบาย</label>
              <input type="text" class="form-control" id="sdesc" required>
            </div>
            <div class="form-group">
              <input type="file" name="imagename" id="imagename">
            </div>
            <hr>
            <!-- 6 สรา้งปุ่ม -->
            
          </form>
```

### 6 สร้างปุ่ม
```html
<button type="submit" id="button" class="btn btn-success">ส่งข้อมูล</button>
<button type="button" id="edit" onclick="editData()" class="btn btn-info">แก้ใขข้อมูล</button>
<button type="button" id="refresh" onclick="refreshPage()" class="btn btn-outline-info">refresh</button>&nbsp; |
<button type="button" id="remove" onclick="deleteData()" class="btn btn-danger">ลบ marker</button>
<br><span id="status"></span>
```

### 7 สร้าง editData function
```js
function editData() {
    console.log('editData');
}
```

### 8 สร้าง deleteData function
```js
function refreshPage() {
    console.log('refreshPage');
}
```

### 9 สร้าง deleteData function
```js
function deleteData() {
    console.log('refreshPage');
}
```

### 10 สร้าง map object
```js
var map = L.map('map', {
    center: [16.820378, 100.265787],
    zoom: 13
});
```

### 11 สร้าง loadmap function
```js
function loadMap() {
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var pro = L.tileLayer.wms("http://cgi.uru.ac.th/geoserver/wms?", {
        layers: 'th:province_4326',
        format: 'image/png',
        transparent: true,
        attribution: "http://cgi.uru.ac.th"
    });
    var baseMap = {
        "OSM": osm.addTo(map)
    }
    var overlayMap = {
        "ขอบจังหวัด": pro.addTo(map)
    }
    L.control.layers(baseMap, overlayMap).addTo(map);
}
```

### 12 สร้าง onLocationFound function
```js
function onLocationFound(e) {
    gps = L.marker(e.latlng, { draggable: true });
    gps.addTo(map).bindPopup("คุณอยู่ที่นี่").openPopup();
    gps.on('dragend', (e) => {
        console.log(e)
    })
}
```

### 13 สร้าง onLocationError function
```js
function onLocationError(e) {
    console.log(e.message);
}
```

### 14 map on method
```js
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true, maxZoom: 16 });
```

### 15 ส่งข้อมูลใน form ไปยัง backend 
```js
$('#fieldForm').submit(function (e) {
    e.preventDefault();
    $("#status").empty().text("File is uploading...");
    const obj = {
        sname: $('#sname').val(),
        stype: $('#stype').val(),
        sdesc: $('#sdesc').val(),
        geom: JSON.stringify(gps.toGeoJSON().geometry)
    }
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
```

### create table
```sql
CREATE TABLE survey
(
    id serial not null,
    sname text,
    stype text,
    sdesc text,
    simg text,
    geom geometry(Point,4326)
)

```

### 16 กำหนด connection ในฟล์ api.js
```js
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'geodb',
    password: '1234',
    port: 5432,
});
```

## 17 เรียกใช้ api ใน server.js
```js
const api = require('./service/api');
app.use(api);
```

##### ติดตั้ง multer
```cmd
 npm i --save multer
 npm i --save body-parser
```
##### เพิ่ม body-parser ใน server.js
```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
```

### 18 สร้าง api 
```js
// **อย่าลืมสร้าง โฟลเดอร์ upload
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './www/upload');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '.jpg');
    }
});
var upload = multer({ storage: storage });

app.post('/api/insert', upload.single('imagename'), (req, res) => {
    const simg = req.file.filename;
    const { sname, stype, sdesc, geom } = req.body;
    const sql = `INSERT INTO survey (sname,stype,sdesc,simg,geom)
        VALUES ('${sname}','${stype}','${sdesc}','${simg}',ST_SetSRID(st_geomfromgeojson('${geom}'), 4326))`;

    db.query(sql)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'insert data'
            });
        })
});


app.get('/api/getdata', (req, res) => {
    const sql = 'SELECT id,sname,stype,sdesc,simg,st_x(geom) as lon,st_y(geom) as lat FROM survey';
    let jsonFeatures = [];
    db.query(sql).then((data) => {
        var rows = data.rows;
        rows.forEach((e) => {
            let feature = {
                type: 'Feature',
                properties: e,
                geometry: {
                    type: 'Point',
                    coordinates: [e.lon, e.lat]
                }
            };
            jsonFeatures.push(feature);
        });
        let geoJson = {
            type: 'FeatureCollection',
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

app.post('/api/update', (req, res) => {
    const { sname, stype, sdesc, geom, id } = req.body;
    const sql = 'UPDATE survey SET sname=$1,stype=$2,sdesc=$3,' +
        'geom=ST_SetSRID(st_geomfromgeojson($4), 4326) WHERE id=$5';
    const val = [sname, stype, sdesc, geom, id];
    db.query(sql, val)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'updated data'
            });
        })
});

app.post('/api/delete', (req, res) => {
    const { id } = req.body;
    console.log(id)
    const sql = 'DELETE FROM survey WHERE id=$1';
    const val = [id];
    db.query(sql, val)
        .then(() => {
            res.status(200).json({
                status: 'success',
                message: 'deleted data'
            });
        })
});

```

### 19 สร้าง getData
```js
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

```

### 20 เรียกใช้งาน function
```js
loadMap()
getData();
```

### 21 สรา้ง selectMarker function
```js
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
    $("#status").empty().text("กำลังแก้ใขข้อมูล..");
}
```

### 22 สร้าง map on click
```js
map.on('click', () => {
    $('form :input').val('');
    $("#edit").attr("disabled", true);
    $("#remove").attr("disabled", true);
    $("#status").empty().text("");
});
```

### แก้ไข editData
```js
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
```


### แก้ไข deleteData function
```js
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
```

### แก้ไข refreshPage function
```js
function refreshPage() {
    location.reload(true);
}
```


