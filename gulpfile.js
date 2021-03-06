var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var wait = require('gulp-wait');

var DEST = '\\\\wmatvmlr401\\htdocs\\lr4\\oee-monitor';
var BASE = __dirname;

function serverPath (path) {
  // Obtiene la direccion a la que se enviaran los datos
  var rgx = /[a-zA-Z0-9-_~µ\. ]*$/;
  path = path.replace(rgx, '');
  return  path.replace(BASE,'');
}

var copyAndReload = function copyAndReload (event) {
  // console.log('Sended to: ',serverPath(event.path));
  gulp.src(event.path)
       .pipe(gulp.dest(DEST + serverPath(event.path)))
       .pipe(wait(1200))
       .pipe(livereload());
}

var copy = function copy (event) {
  console.log('Sended to: ',serverPath(event.path));
  gulp.src(event.path)
       .pipe(gulp.dest(DEST + serverPath(event.path)));
}

var compileAndPush = function compileAndPush (event) {
  var path = event.path.replace(BASE,'');
  path = '.' + path.replace('\\','/');
  console.log(path);
  gulp.src(path)
    .pipe(coffee()).on('error',gutil.log)
    .pipe(gulp.dest('./js'))
    .pipe(gulp.dest(DEST + serverPath(event.path)))
    .pipe(wait(1200))
    .pipe(livereload());
}

gulp.task('watch', function () {
  livereload.listen();
  /*
    La siguiente es la lista de todo lo que esta observando gulp, 
    me gustaria que pudiera decirle cueles son las carpetas que 
    tiene que omitir.
  */
  gulp.watch(['coffee/**.coffee'], function (event) {
  }).on('change', function (event) {
     compileAndPush(event);
  });  
  gulp.watch(['template.php'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['procedures/**.php','*.php'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['js/**.map'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['sql/**.sql'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['*.json'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['js/**.js','gulpfile.js'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });  
  gulp.watch(['*.html'], function (event) {
  }).on('change', function (event) {
     copyAndReload(event);
  });
});

gulp.task('default', ['watch']);
console.log("Listening on folder: " + BASE);
