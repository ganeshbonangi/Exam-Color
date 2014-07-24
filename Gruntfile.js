module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     
    // Define our source and build folders
    js_temp_path:".temp/scripts",
	js_src_path: 'src/scripts',
    js_build_path: "build/scripts",
	plugin_temp_path: '.temp/plugins',
	plugin_src_path: 'src/plugins',
    plugin_build_path: "build/plugins",
	css_temp_path:".temp/css",
    css_src_path: "src/css",
    css_build_path: "build/css",
 
    // Grunt Tasks
    concat: {
      options:{
        separator: ';'
      },
      /*js: {
        src: [ 		
			   
		],
        dest: '<%= js_build_path %>/app.js'
      },*/
	  js:{
		src:[  	
			   '<%= plugin_src_path %>/jquery/jquery-1.10.2.min.js',
			   '<%= plugin_src_path %>/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js',
			   '<%= plugin_src_path %>/angular/angular.min.js', 
			   '<%= plugin_src_path %>/angular/angular-route.min.js',	
			   '<%= plugin_src_path %>/angular/exam_timer.js',
			   '<%= js_src_path %>/main.js',
			   '<%= js_src_path %>/server.js',
			   '<%= js_src_path %>/controllers/examController.js',
			   '<%= js_src_path %>/services/questionsService.js'		  
			 ],
		dest:'<%= js_build_path %>/app.min.js'
	  },
      css:{
        src: ['src/plugins/bootstrap-3.0.3-dist/dist/css/bootstrap.min.css','<%= css_src_path %>/*.css'],
        dest: '<%= css_temp_path %>/app.css'   
      }
    },
    uglify: {
      options:{
        mangle: true,
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + "\\n" %>' +
        '* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '* <%= pkg.homepage + "\\n" %>' + 
        '* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.title %> */ <%= "\\n" %>'
      },
      /*js: {
        src: '<%= concat.js.dest %>',
        dest:'<%= js_build_path %>/app.min.js'
      },*/
     /* plugin: {
        src: '<%= concat.plugin.dest %>',
        dest:'<%= plugin_build_path %>/plugin.min.js'
      }*/
    },
    cssmin: {
      css: {
        src: '<%= concat.css.dest %>',
        dest:'<%= css_build_path %>/app.min.css'
      }
    },
	copy: {
	  main: {
	  files: [{
	  expand: true,
		cwd: '<%= css_src_path %>/font/',
		src: '**',
		dest: '<%= css_build_path %>/font/',
		flatten: true,
		filter: 'isFile'
	  },{		expand: true,
		cwd: 'src/',
		src: 'index.html',
		dest: 'build/',
		flatten: true,
		filter: 'isFile'},
		{		expand: true,
		cwd: 'src/view/',
		src: '**',
		dest: 'build/view/',
		flatten: true,
		filter: 'isFile'},
		{		expand: true,
		cwd: 'src/content/',
		src: '**',
		dest: 'build/content/',
		flatten: true,
		filter: 'isFile'}]
			
	  }
	},
	usemin: {
	  html: 'build/index.html'
	},
	htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'build/index.html': 'build/index.html',     // 'destination': 'source'
        'build/view/home.html': 'build/view/home.html',
		'build/view/exam.html': 'build/view/exam.html'
      }
    }
  }
  });
   
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
  // Default task.
  grunt.registerTask('build', ['concat', 'uglify','cssmin','copy','usemin','htmlmin']);
};