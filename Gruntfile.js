(function(){
	"use strict";
	
	module.exports = function(grunt){
		
		grunt.initConfig({
		
			pkg: grunt.file.readJSON("package.json"),
			
			concat: {
				dist: {
					src: 'src/**/*.js',
					dest: 'main.js'
				}
			},
			
			jshint: {
				files: ['Gruntfile.js', 'src/**/*.js'],
				options: {
					globals: {
						jQuery: false,
						console: true,
						module: true,
						document: true
					}
				}
			},
			
			uglify: {
				options: {
					banner: '/*\n  ' +
                    '<%= pkg.name %> v<%= pkg.version %>\n  ' +
                    '<%= grunt.template.today("dd-mm-yyyy") %>\n*/\n'
				},
				dist: {
					files: {
						'main.min.js' : 'main.js'
					}
				}
			}
			
		});
		
		
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-uglify');
		
		grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
		
		
	};
})();