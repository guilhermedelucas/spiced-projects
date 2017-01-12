var express = require('express');
var https = require('https');
var app = express();
var fs = require('fs');
var twitterModules = require('./twitterModules.js');

var base64EncodedThing = new Buffer('5ZZV5CgppXkxWVZ8tDwQ0JkDr:uVDHXlS4Z2BW1cpgk5zMQY21xekyMYyarEgk3jqanpPQv5YhWW').toString('base64');


module.exports = {
    twitterData : function () {
        twitterModules.option('/oauth2/token', 'POST', {
            'Authorization': 'Basic ' + base64EncodedThing,
            'Content-Type': 'application/x-www-form-urlencoded'
        }).then(function(option) {
            return twitterModules.sendRequest(option)})
            .then(function(val){
                var arrayOfResults = [ p0 =  twitterModules.option('/1.1/statuses/user_timeline.json?count=100&screen_name=nytimes', 'GET', {
                    'Authorization': 'Bearer ' + val['access_token']}).then(function(option){
                return twitterModules.sendRequest(option)}), p1 = twitterModules.option('/1.1/statuses/user_timeline.json?count=100&screen_name=cafedolado', 'GET', {
                    'Authorization': 'Bearer ' + val['access_token']}).then(function(option){
                return twitterModules.sendRequest(option)}), p2 = twitterModules.option('/1.1/statuses/user_timeline.json?count=100&screen_name=BBCSport', 'GET', {
                    'Authorization': 'Bearer ' + val['access_token']}).then(function(option){
                return twitterModules.sendRequest(option)})
                ];
                return Promise.all(arrayOfResults)
            }).then(function (val){
                return twitterModules.sendLinksToTickerBar(val);
            }).then(function(val){
                fs.writeFileSync('projects/ticker/links.json', JSON.stringify(val, null,'\t'));
            }).catch(function(err){
                console.log("its wrong buddy:", err);
            });
    }
};
