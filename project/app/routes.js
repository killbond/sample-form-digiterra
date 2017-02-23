module.exports = function (app, logger) {

    app.post('/send', function (req, res) {
        logger.info(req.body);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index.jade');
    });
};