const express = require('express');
const app = express();

const Pool = require('pg').Pool
const multer = require('multer');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'geodb',
    password: '1234',
    port: 5432,
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

    console.log(sql)

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







app.use(express.static('www'));

app.listen(3000, () => {
    console.log("http://localhost:3000");
});