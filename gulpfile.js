const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const templateCache = require('gulp-angular-templatecache');
const addStream = require('add-stream');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const header = require('gulp-header');

function prepareTemplates() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(templateCache({
            standalone: true
        }));
}

gulp.task('sources', () => {
    return gulp.src([
        'app/**/*.module.js',
        'app/**/*.js'
    ])
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(sourcemaps.init())
        .pipe(concat('source.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(header('/* Build time: ${datetime} */ \n', {
            datetime: new Date()
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('tokenizationSources', () => {
    return gulp.src([
        'tokenization/tokenization.js'
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(header('/* Build time: ${datetime} */ \n', {
            datetime: new Date()
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('styles', () => {
    return gulp.src('app/assets/styles.less')
        .pipe(less())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('vendorScripts', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/gentelella/build/js/custom.js',
        'node_modules/moment/moment.js',
        'node_modules/bootstrap-daterangepicker/daterangepicker.js',
        'node_modules/select2/dist/js/select2.full.js',
        'node_modules/keycloak-js/dist/keycloak.js',
        'node_modules/lodash/lodash.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/@angular/router/angular1/angular_1_router.js',
        'node_modules/angular-chart.js/node_modules/chart.js/dist/Chart.bundle.js',
        'node_modules/angular-chart.js/dist/angular-chart.js'
    ])
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendorStyles', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/select2/dist/css/select2.css',
        'node_modules/gentelella/build/css/custom.css'
    ])
        .pipe(cleanCSS())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('index', () => {
    return gulp.src('app/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('tokenization', () => {
    return gulp.src('tokenization/tokenization.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('config', () => {
    return gulp.src([
        'app/appConfig.json',
        'app/koffingKeycloakConfig.json',
        'tokenization/tokenizationKeycloakConfig.json'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        host: '127.0.0.1',
        port: 8000,
        fallback: 'dist/index.html',
        livereload: true
    });
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(['app/**/*.js', 'app/**/*.pug'], ['sources']);
    gulp.watch('tokenization/tokenization.js', ['tokenizationSources']);
    gulp.watch('app/index.pug', ['index']);
    gulp.watch('tokenization/tokenization.pug', ['tokenization']);
    gulp.watch('app/assets/**/*.less', ['styles']);
});

gulp.task('capiMock', () => {
    var started = false;
    return nodemon({
        script: 'capi-mock/capi.js'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('build', ['index', 'tokenization', 'sources', 'tokenizationSources', 'styles', 'vendorScripts', 'vendorStyles', 'config']);
gulp.task('default', ['connect', 'watch', 'build']);
