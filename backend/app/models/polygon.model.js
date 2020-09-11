module.exports = (sequelize, DataTypes) => {
    const Polygon = sequelize.define('Polygon', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        },
        geometry: {
            type: DataTypes.GEOMETRY('Polygon', 4326)
        },
        deskripsi: {
            type: DataTypes.TEXT
        }
    });

    return Polygon;

}