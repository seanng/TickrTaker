process.env.NODE_ENV = 'development';


var config = require('./webpack.config.js');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn');

/********** HELPER FUNCTIONS ************/
//none

/********** INIT ************/
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: 'http://localhost/',
  filename: 'bundle.js',
  stats: {
    colors: true
  },
  publicPath: '/compiled/',
});

server.listen(8080, 'localhost', function() {
  opn('http://localhost:3000');
});