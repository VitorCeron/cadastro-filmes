const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 3000

let consign = require('consign');
consign()
    .include('/app/models')
    .then('/app/controllers')
    .into(app);

const movieController = require("./app/controllers/movieController")

require('./config/databaseConfig')()

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded())

//rotas
app.get('/', (req, res) => {
    // res.render('pages/home')
    movieController.getDashboardData(req, res);
})

app.get('/registerMovie', (req, res) => {
    res.render('pages/registerMovie')
})

app.get('/updateMovie/:movieId', (req, res) => {
    movieController.getUpdateMovie(req, res);
})

app.get('/deleteMovie/:movieId', (req, res) => {
    movieController.deleteMovie(req, res);
})

app.get('/listMovies', (req, res) => {
    movieController.getAllMovies(req, res, false);
})

app.post('/insertMovie', (req, res) => {
    movieController.insertMovie(req, res);
})

app.post('/updateMovie', (req, res) => {
    movieController.updateMovie(req, res);
})

app.post('/dashboard/last_three_movies', (req, res) => {
    movieController.getLastThreeMovies(req, res);
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})