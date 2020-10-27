// load necessary libraries and modules
const express = require('express');
const handlebars = require('express-handlebars');

// setup the environment variables, using port 3000 as default
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// create an instance of the express server
const app = express();

// configure the use of handlebars to render views
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

function setImageName(randomNum) {
    let imageName = "";
    if(randomNum === 1) {
        imageName = '/images/dado-1.png';
    } else if(randomNum === 2) {
        imageName = '/images/roll2.png';
    } else if(randomNum === 3) {
        imageName = '/images/three_dots.png';
    } else if(randomNum === 4) {
        imageName = '/images/four.png';
    } else if(randomNum === 5) {
        imageName = '/images/Five-Image.png';
    } else if(randomNum === 6) {
        imageName = '/images/dice-showing-6.png';
    }
    return imageName;
}

// configure the middleware to handle requests
app.get('/roll', (req, res, next) => {
    let randomNum1 = Math.ceil(Math.random() * 6);
    let randomNum2 = Math.ceil(Math.random() * 6);
    let firstImg, secondImg;

    firstImg = setImageName(randomNum1);
    secondImg = setImageName(randomNum2);

    res.status(200);
    res.contentType('text/html');
    res.render('dice', { img1: firstImg, img2: secondImg });
});

// handle static requests
app.use(express.static(__dirname + '/public'));

// all errors lead to the index.html landing page
app.use( (req, res, next) => {
    res.redirect('/index.html');
});

// start the server
app.listen(PORT, () => {
    console.info(`Server has started at port ${PORT} on ${new Date()}`);
});