var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    styl        = require('gulp-styl'),
    inline      = require('rework-inline'),
    csso        = require('gulp-csso'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    tinylr      = require('tiny-lr'),
    express     = require('express'),
    app         = express(),
    marked      = require('marked'), // For :markdown filter in jade
    path        = require('path'),
    server      = tinylr(),
    es          = require('event-stream');
var jeet        = require('jeet');
var rupture     = require('rupture');



// --- Basic Tasks ---
gulp.task('css', function() {
  var options = {
        use: [ jeet(), rupture()]
    };

  return gulp.src('app/assets/css/*.styl').
    pipe( styl(options) ).
    pipe( csso() ).
    pipe( concat('style.min.css')).
    pipe( gulp.dest('public/css/') ).
    pipe( livereload( server ));
});

gulp.task('js', function() {
  return es.merge(
        gulp.src('app/assets/scripts/*.coffee').
          pipe(coffee()),
        gulp.src('app/assets/scripts/*.js')).
    pipe( uglify() ).
    pipe( concat('all.min.js')).
    pipe( gulp.dest('public/scripts/')).
    pipe( livereload( server ));
});

gulp.task('templates', function() {
  return gulp.src('app/*.jade').
    pipe(jade({
      pretty: true
    })).
    pipe(gulp.dest('public/')).
    pipe( livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./public')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('app/assets/css/*.styl',['css']);

    gulp.watch('app/assets/scripts/*.js',['js']);

    gulp.watch('app/assets/scripts/*.coffee',['js']);

    gulp.watch('app/*.jade',['templates']);

  });
});

// Default Task
gulp.task('default', ['js','css','templates']);
