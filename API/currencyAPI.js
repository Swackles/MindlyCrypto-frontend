const http = require('http');
const settings = require('./../settings');

module.exports.get = (callback) => {
    http.get(settings.urlAPI + "/currencies", res => {
        let data = '';
      
        res.on('data', chunk => {
            data += chunk   
        });
      
        res.on('end', () => {
            return callback(JSON.parse(data), null);
        });
        }).on('error', err => {
            return callback(null, err);
        });
};