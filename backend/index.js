const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

const db = require("./app/models/index");
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");

    var data = require("./app/seeder/index");

    // seed data to db
    db.polygon.bulkCreate(data.polygon)
    db.line.bulkCreate(data.line);
    db.point.bulkCreate(data.point);
});

var api = require('./app/routes/api.routes');
api(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})