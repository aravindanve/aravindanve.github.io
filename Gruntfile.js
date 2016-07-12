module.exports = function(grunt) {

	// project configuration.

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		less: {
			options: {
				compress: true
			},
			dev: {
				files: {
					'css/styles.min.css': 'src/less/styles.less',
					'css/print.min.css': 'src/less/print.less'
				}
			}
		},
		cssmin: {
			dev: {
				files: {}
			}
		},
		uglify: {
			dev: {
				options: {
					mangle: true
				},
				files: {
					'js/scripts.min.js': 'src/js/scripts.js'
				}
			}
		},
		watch: {
			scripts: {
				files: ['src/**/*.less', 'src/**/*.css', 'src/**/*.js'],
				tasks: ['default'],
				options: {
					interrupt: true
				},
			},
		}
	}
	grunt.initConfig(config);

	// Load the plugin that provides the tasks
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// default tasks
	grunt.registerTask('default', ['newer:less', 'newer:cssmin', 'newer:uglify']);
    grunt.registerTask('compile', ['less', 'cssmin', 'uglify']);

};






