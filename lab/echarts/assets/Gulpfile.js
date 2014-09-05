var gulp = require('gulp');
var path = require('path');

//CMD Transport
var Package = require('father').SpmPackage;
var transport = require('gulp-transport');

var pkg = new Package( __dirname + path.sep + 'scripts/app',{
	// entry: ['./util']
});

// faker package info

// console.log(pkg);

// var pkg1 = new Package(__dirname + path.sep + 'sea-modules/jquery-cookie/1.4.1');

// console.log(pkg1);

// console.info(pkg1.name);

gulp.task('default', function(){

	//console.log(pkg);

	// console.log(pkg1.version);
	return gulp.src(pkg.main)
			.pipe(transport({pkg: pkg}))
			.pipe(gulp.dest('dist'))

});