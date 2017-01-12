var express = require('express');
var app = express();
var fs = require('fs');

var hb = require('express-handlebars');
app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
var loadTwitter = require('./twitter.js');

//Read the projects
var projectName = fs.readdirSync('./projects');
var projectsTemplate  = [];

//remove .DS_Store file
projectName.forEach(function(item, index){
    if (item === ".DS_Store" || item === "css" || item === "images") {
        return;
    } else {
        projectsTemplate.push(JSON.parse(fs.readFileSync("./projects/" + item + "/description.json", 'utf8')));
    }
});

app.use(function(req, res, next){
    if (req.url === '/ticker/') {
        loadTwitter.twitterData();
    }
    next();
});

app.get('/', function (req, res) {
    res.render('home',{
        layout: 'main',
        projectsTemplate
    });
});

app.get('/projects/:name/description', function (req, res){
    var name = req.params.name;
    var project = projectsTemplate.find(function (currentValue,index){
        return projectsTemplate[index].link === "/projects/" + name + "/description" ;
    });
    if (!project) {
        res.sendStatus(404);
    } else {
        res.render('singlePage', {
            layout: 'description',
            project,
            projectsTemplate
        });
    }
}
);

app.use(express.static(__dirname + '/projects'));

app.listen(process.env.PORT || 8080, function (){
    console.log("Listening!");
});
