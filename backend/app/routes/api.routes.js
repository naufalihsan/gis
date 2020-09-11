module.exports = app => {
    const controller = require("../controllers/api.controller");
    var router = require("express").Router();

    router.get("/", controller.get);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    app.use('/api/v1', router);
}