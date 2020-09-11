module.exports = (sequelize, DataTypes) => {
    const Point = sequelize.define('Point', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        nama: {
            type: DataTypes.STRING
        },
        geometry: {
            type: DataTypes.GEOMETRY('Point', 4326)
        }
    });

    return Point;

}