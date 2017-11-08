var gulp = require('gulp');
var libs = './wwwroot/vendor/';
var del = require('del');

gulp.task('default', ['copy-dependencies']);

gulp.task('copy-dependencies', [    
    'clean',
    'copy-dependency:bootstrap',
    'copy-dependency:jquery',
    'copy-dependency:popper',
    'copy-dependency:bootstrap-material-design']);

gulp.task("clean",function(){
    //return del('./wwwroot/ts/**/*.js.map');
    //return del('./wwwroot/ts/**/*.js');
    return del('./wwwroot/vendor/**/*.*');
})

gulp.task('copy-dependency:bootstrap', function () {
    gulp.src([
        'node_modules/bootstrap/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap'));
});

gulp.task('copy-dependency:jquery', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js'
    ]).pipe(gulp.dest(libs + 'jquery'));
});

gulp.task('copy-dependency:popper', function () {
    gulp.src([
        'node_modules/popper.js/dist/umd/popper.min.js'
    ]).pipe(gulp.dest(libs + 'popper'));
});


gulp.task('copy-dependency:bootstrap-material-design', function () {
    gulp.src([
          'node_modules/bootstrap-material-design/dist/**/*.*'
    ]).pipe(gulp.dest(libs + 'bootstrap-material-design'));
});
