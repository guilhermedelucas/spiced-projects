var express = require('express');
var https = require('https');
var app = express();
var fs = require('fs');

module.exports = {
    option: function(path, method, headers) {
        return new Promise (function(resolve, reject){
            var option = {
                hostname: 'api.twitter.com',
                port: 443,
                path: path,
                method: method,
                headers: headers
            };
            resolve(option);
        });
    },

    sendRequest: function(option) {
        return new Promise (function(resolve, reject) {
            var req = https.request(option, function (res){
                var body = "";
                res.on('data', function(d){
                    body += d;
                });
                res.on('error', function(err){
                    reject(err);
                });
                res.on('end', function (){
                    var parsedData = JSON.parse(body);
                    resolve(parsedData);
                });
            });
            if (option.method === "POST") {
                req.write('grant_type=client_credentials');
                req.end();
            } else {
                req.end();
            }
        });
    },

    sendLinksToTickerBar: function (data){
        return new Promise(function(resolve, reject) {
            var link = [];
            var textsAndLinks = [];
            // console.log(data[0][0].entities)
            data.forEach(function(item, index){
                data[index].forEach(function(item, index){
                    if (!item.entities.urls[0] || item.entities.urls[1] || item.entities.media) {
                        link.push("empty");
                    } else {
                        link.push(item.entities.urls[0].url);
                    }
                    // console.log(link[index]);
                    textsAndLinks.push({ text: item.text,
                    link: link[index],
                    date: item.created_at
                    });
                    textsAndLinks[index].text = textsAndLinks[index].text.replace(textsAndLinks[index].link, "");
                });
                var filterLinks = textsAndLinks.filter(function(item, index){
                    if (textsAndLinks[index].link !== "empty") {
                        return textsAndLinks[index];
                    } console.log(filterLinks);
                });

                filterLinks.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                });
                resolve (filterLinks);
            });
        });
    }
};
