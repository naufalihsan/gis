const db = require("../models/index");
const utils = require("../utils/index");

const Polygon = db.polygon;
const Line = db.line;
const Point = db.point;

const { QueryTypes } = db.sequelize;

exports.get = async (req, res) => {
    var datas = await findHelper();
    res.send(datas);
};

exports.create = async (req, res) => {
    var geoJson = utils.fromGeoJson(req.body)
    var model;

    switch (geoJson.type) {
        case 'Polygon':
            model = await Polygon.create(geoJson.data);
            break;
        case 'Line':
            model = await Line.create(geoJson.data);
            break;
        case 'Point':
            model = await Point.create(geoJson.data);
            break;
        default:
            break;
    }

    res.send(model);
}


exports.update = async (req, res) => {
    const id = req.params.id;

    var geoJson = await utils.fromGeoJson(req.body)
    var model;

    switch (geoJson.type) {
        case 'Polygon':
            const polygon = await Polygon.findByPk(id);
            if (polygon === null) {
                res.status(500).send({
                    message: "Data doesn't exists"
                });
            } else {
                model = await Polygon.update(geoJson.data, {
                    where: {
                        id: id
                    }
                });
            }
            break;
        case 'Line':
            const line = await Line.findByPk(id);
            if (line === null) {
                res.status(500).send({
                    message: "Data doesn't exists"
                });
            } else {
                model = await Line.update(geoJson.data, {
                    where: {
                        id: id
                    }
                });
            }
            break;
        case 'Point':
            const point = await Point.findByPk(id);
            if (point === null) {
                res.status(500).send({
                    message: "Data doesn't exists"
                });
            } else {
                model = await Point.update(geoJson.data, {
                    where: {
                        id: id
                    }
                });
            }
            break;
        default:
            break;
    }

    res.send({ message: "update success" });

}

exports.delete = async (req, res) => {
    const id = req.params.id;

    var models = [Polygon, Line, Point]

    for (model of models) {
        const m = await model.findByPk(id);
        if (m !== null) {
            d = await model.destroy({
                where: {
                    id: id
                }
            });

            res.send({ message: "delete success" });

        }
    }

    res.status(500).send({
        message: "Data doesn't exists"
    });
}

async function findHelper() {
    var res = {
        type: "FeatureCollection",
        features: [],
    };

    const queries = [
        `SELECT P.id, P.nama, P.geometry, ST_Area(P.geometry) Luas_Area, P.deskripsi FROM "Polygons" P`,
        `SELECT L.id, L.nama, L.geometry, ST_Length(L.geometry) Panjang_Garis, L.deskripsi FROM "Lines" L`,
        `SELECT P.id, P.nama, P.geometry FROM "Points" P`
    ]

    for (query of queries) {
        await db.sequelize.query(query, { type: QueryTypes.SELECT })
            .then(data => {
                var converted = utils.toGeoJson(data);
                res.features = res.features.concat(converted);
            })
            .catch(err => {
                console.log(err)
            });
    }

    return res
}