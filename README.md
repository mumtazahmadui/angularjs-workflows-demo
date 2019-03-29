// From Pluralsight Advanced Angular Workflows
** This is AngularJS 1.5.8 **

/** NOTE - test is broken - awaiting fix **/
'No deferred tasks to be flushed'
```
// category.controller.spec.js
...
    beforeEach(inject(function(_$controller_, _$timeout_, _$q_) {
        $timeout = _$timeout_;
        $q = _$q_;
        $controller = _$controller_('categoryCtrl');
    }));
  
    it('should get categories from a resource', function() {
        categoryResource.getCategories.called.should.equal(true);
        $timeout.flush(); /**** causes error - 'No deferred tasks to be flushed' ****.
        $controller.categories.length.should.equal(43);
    });
...
```

Goals  - Gulp to Automate:

1. Babel - ES6 in AngularJS
2. Validate code with JSHint
3. Unit testing with karma & Mocha, Chai for insertion framework, Sinon for mocking
4. Specifying Environment processes

// Gulp will:
* bundle, minify, sourcemap, transpile es6 with babel, watch js files


// Setup
```
$ npm init -y
$ npm install --save-dev jquery@3.1.0 angular@1.5.8 angular-route@1.5.8 angular-mocks@1.5.8 // fronteend dependencies
$ npm install --save-dev gulp
$ npm install --save-dev gulp-load-plugins gulp-concat gulp-ugflify gulp-ngAnnotate gulp-util
$ npm install --save-dev gulp-babel babel-preset-es2015gulp-sourcemaps
$ npm install --save-dev karma mocha sinon chai karma-mocha karma-sinon karma-chai 
karma-phantomjs-launcher phantomjs-prebuilt karma-koverage
$ npm install --save-dev gulp-jshint jshint jshint-stylish
$ npm install --save gulp-jshint jshint-stylish
$ npm install --save-dev yargs
```

// Create a Gulpfile
```
$ touch gulpfile.js // creates gulpfile
```

File should output as:
```
'use strict';

var gulp = require('gulp');

gulp.task('default', function(){
	console.log('We are ready to go!');

})
```

// Setup JSHint
```
$ touch .jshintrc
```

Should magically output:
```
{
	"curly": true,
	"eqeqeq": true,
	"esversion": 6,
	"maxcomplexity":5,
	"maxdepth":3,
	"strict":true,
	"predef": ["angular", "crmContactId", "console", "process", "modules", "require"]
}

Slightly modify adding the commented parts:
```
{
	"curly": true,
	"eqeqeq": true,
	"esversion": 6,
	"maxcomplexity":5,
	"maxdepth":3,
	"strict":true,
	"validthis": true, // add
	"predef": [
		"angular",
		"crmContactId",
		"console",
		"process",
		"modules", // add
		"require", // add
		"describe", // add
		"module", // add
		"inject", // add
		"beforeEach", // add
		"sinon", // add
		"it" // add
	]
}
```


```

// Setup Karma, Mocha, Chai, and Sinon
```
$ karma --version
$ npm install -g karma-cli
$ npm install --s-dev karma
```


// Gulp with all goodies

```
/***** ADD LATER ***/
```


// Config Karma testing
```
$ karma init
// tab to mocha
// no - use require.js
// tab to phantom 
// [Enter] through rest of defaults
```

In karma.conf.js
// add chai and sinon to frameworks

// add npm modules
```
$ npm install --save-dev mocha sinon chai karma-mocha karma-sinon karma-chai karma-phantomjs-launcher phantomjs-prebuilt jshint-stylish
```


// Code Coverage via karma-coverage and karma-remap-istanbul
Install karma-coverage as dev dependencies.
In karma.conf.js, add 'coverage' and 'karma-remap-istanbul' to reporters array.
And configure Istanbul reporter.
```
	...
	reporters: ['progress', 'coverage', 'karma-remap-istanbul']

    // setup instanbul
    remapIstanbulReporter: {
        src: 'coverage/coverage.info',
        reports: {
          lcovonly: 'coverage.lcov.info',
          html: 'coverage/html',
          'text-summary': null
        },
        timeoutNotCreated: 5000,
        timeoutNoMoreFiles: 1000
    },
    // write coverage.info file
    coverageReporter: {
        type: 'lcovonly',
        subdir: '.',
        dir: 'coverage/',
        file: 'coverage.info'
    },
	...
```
View coverage page from coverage > html > index.html


In gulpfile, add preprocessor
	at top of test task, add:
	```
		var preprocessors = {};
		preprocessors[bundle] = [ 'coverage' ];
	```
	add preprossors key-value pair in new Karma instance
	```
	...
		new karma.Server({
			configFile: __dirname + '/karma.conf.js',
			files: files,
			preprocessors: preprocessors, // add
			singleRun: true
		}, function() {
			done();
		}).start();
	...
	```
** This cr4eats an coverage directory with coverage stats!

Setup Prod Environments
Minify if prod
```
$ gulp --prod
```

Do not minify or build sourcemaps if not prod
```
$ gulp
```




