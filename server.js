const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.js');
const appConfig = require('./config/config');

const port = appConfig.port;
const app = express();

const start = async () => {
    try {

        const db = await MongoClient.connect(appConfig.mongoUrl);

        if (appConfig.ISDEV) {

            const compiler = webpack(config);
            const middleware = webpackMiddleware(compiler, {
                publicPath: config.output.publicPath,
                contentBase: 'src',
                stats: {
                    colors: true,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false,
                    modules: false
                }
            });

            app.use(middleware);
            app.use(webpackHotMiddleware(compiler));
            app.use(bodyParser.json()); 

            app.get('*', function response(req, res) {
                res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
                res.end();
            });
        } else {
            app.use(express.static(__dirname + '/dist'));
            app.use(bodyParser.json()); 
            
            app.get('*', function response(req, res) {
                res.sendFile(path.join(__dirname, 'dist/index.html'));
            });
        }
        app.listen(port, () => { console.log(`💝  server listening on port ${port}`) });
        
        require('./server/route/users')(app, db);
        require('./server/route/upload')(app);

    } catch (e) {
        console.log(e)
    }
};
start();

