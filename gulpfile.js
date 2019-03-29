(function() {
	'use strict';

	var gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		stylish = require('jshint-stylish'),
		karma = require('karma'),
		args = require('yargs').argv;

	var prod = args.prod;

	// specify here, then npm --save install same versions as in index.html / 
	var karmaFiles = [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js'
	];

	var specs = 'js/spec/*.js';
	var bundle = 'dist/js/**/*.js';

	var srcScripts = ['js/**/*.js', '!js/spec/*.js'];

	gulp.task('scripts', function() {
		gulp.src(srcScripts)
			.pipe($.ngAnnotate()) // auto adds $inject into angular files
			.pipe(!prod ? $.sourcemaps.init() : $.util.noop()) // looks at original js structure OR does NO Operation and passes files straight through
			.pipe($.babel({
				presets: ['es2015']
			}))
			.pipe($.concat('bundle.js')) // spit out to concatenated file called bundle.js
			.pipe(prod ? $.uglify() : $.util.noop()) // minify the code if prod
			.pipe(!prod ? $.sourcemaps.write() : $.util.noop())
			.pipe($.sourcemaps.write()) // write sourcemaps if prod
			.pipe(gulp.dest('dist/js')); // spit out to dist/js
	});

	gulp.task('validate', function() {
		gulp.src(srcScripts)
			.pipe($.jshint())
			.pipe($.jshint.reporter(stylish))
			.pipe(prod ? $.jshint.reporter('fail') : $.util.noop());
	});

	gulp.task('test', ['scripts', 'validate'], function(done) { // required done callback to force done callback action
		var preprocessors = {};
		preprocessors[bundle] = [ 'coverage' ];

		// run karma from within gulp
		var files = [specs, bundle];
		files = karmaFiles.concat(files);

		new karma.Server({
			configFile: __dirname + '/karma.conf.js',
			files: files,
			preprocessors: preprocessors,
			singleRun: true
		}, function() {
			done(); // cb trick pass as var
		}).start();
	});


	gulp.task('default', ['test'], function() {
		// runs scripts task
		gulp.watch(srcScripts, ['test']);
	});

}());