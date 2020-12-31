'use strict';

var mongoose = require('mongoose'),
Movie = mongoose.model('Movies');
const moment = require("moment");

exports.insertMovie = (req, res) => {
    var newMovie = new Movie(req.body);
    return newMovie.save((err, Movies) => {
        if(err){
            res.send(err);
        }
            
        this.getAllMovies(req, res, true);
    });
};

exports.getAllMovies = (req, res, message) => {
    Movie.find({}, function (err, Movies) {
        if (err)
            res.send(err);

        res.render('pages/listMovies', {
            message: message,
            movies: Movies
        });
    });
};

exports.getUpdateMovie = (req, res) => {
    Movie.findById(req.params.movieId, function (err, Movies) {
        if (err)
            res.send(err);
        
        res.render('pages/updateMovie', {
            movie: Movies
        });
    });
};

exports.deleteMovie = (req, res) => {
    console.log(req);
    Movie.findOneAndDelete(req.params.movieId, function (err, Movies) {
        if (err)
            res.send(err);
    });

    Movie.find({}, (err, Movies) => {
        res.render('pages/listMovies', {
            message: 'teste',
            movies: Movies
        });
    });
};

exports.updateMovie = (req, res) => {
    req.body.updatedAt = Date.now();
    Movie.updateOne({ _id: req.body._id }, req.body, { new: true }, function (err, Movies) {
        if (err)
            res.send(err);
    });

    Movie.find({}, (err, Movies) => {
        res.render('pages/listMovies', {
            message: 'Filme atualizado com sucesso',
            movies: Movies
        });
    });
};

exports.getLastThreeMovies = async (req, res) => {
    return await Movie.find({}, null, {sort: {updatedAt: -1}, limit: 3}).exec();
};

exports.countMovies = async (req, res) => {
    return await Movie.find({}, null).exec();
};

exports.sumTimeMovies = async (req, res) => {
    let movies = await Movie.find({}, null).exec();

    let result = 0;
    movies.forEach(movie => {
        result += this.convertToSeconds(movie.duration);
    });

    return this.convertToTime(result);
}

exports.convertToSeconds = (time) => {
    let timeSplited = time.split(":");
    let seconds = (+timeSplited[0]) * 60 * 60 + (+timeSplited[1]) * 60;
    return seconds;
}

exports.convertToTime = (seconds) => {
    let time = new Date(null);
    time.setSeconds(seconds);
    let totalTime = time.toISOString().substr(11, 8);
    let totalTimeSplited = totalTime.split(":");
    return `${totalTimeSplited[0]}h${totalTimeSplited[1]}min`;
}

exports.getDashboardData = async (req, res) => {
    let last_three_movies = await this.getLastThreeMovies(req, res);
    let movies = await this.countMovies(req, res);
    let sum_time_movies = await this.sumTimeMovies(req, res);

    res.render('pages/home', {
        movies: last_three_movies,
        length_movies: movies.length,
        sum_time: sum_time_movies
    })
};