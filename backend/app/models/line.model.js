module.exports = (sequelize, DataTypes) => {
    const Line = sequelize.define('Line', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        },
        geometry: {
            type: DataTypes.GEOMETRY('LineString', 4326)
        },
        deskripsi: {
            type: DataTypes.TEXT
        }
    });

    return Line;

}