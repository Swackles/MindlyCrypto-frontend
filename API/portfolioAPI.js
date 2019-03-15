const http = require('http');
const request = require('request');
const settings = require('./../settings');

module.exports.get = (callback) => {
    http.get(settings.urlAPI + "/portfolio", res => {
        let data = '';
      
        res.on('data', chunk => {
            data += chunk   
        });
      
        res.on('end', () => {
            try {
                return callback(JSON.parse(data), null);
            } catch(error) {
                return callback(null, error)
            }         
        });
        }).on('error', err => {
            return callback(null, err);
        });
};

module.exports.delete = (id, callback) => {
    request.post(settings.urlAPI + "/portfolio/delete", {
        json: {
            id: id
        }
    }, (error, res, body) => {
        if(error) {
            return callback(null, error)
        } else {
            return callback(body, null);
        }
    });
}

module.exports.add = (data, callback) => {
    request.post(settings.urlAPI + "/portfolio/add", {
        json: data
    }, (error, res, body) => {
        if (error) {
            return callback(null, error);
        } else {
            callback(body, null);
        }
    });
}