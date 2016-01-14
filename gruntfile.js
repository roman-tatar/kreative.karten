module.exports = function(grunt){

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*Automate after save check*/
        watch: {
            javascript: {
                files: ['resources/js/*.js'],
                tasks: ['concat','uglify']
            },
            css: {
                files: ['resources/sass/scss/**/*.scss'],
                tasks: ['buildcss']
            }
        },
        /*Automate after save check*/

        /*Concatenate JS*/
        bower_concat: {
            all: {
                dest: 'assets/js/concatenated/bower.js',
                cssDest: 'assets/css/_bower.css',
                exclude: [
                    "jquery"
                ],
                dependencies: {
                    "bootstrap": 'jquery',
                    "fontawesome":'jquery'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        concat: {
            options: {
                separator: '/* another js */'
            },
            dist: {
                src: ['resources/js/*.js'],
                dest: 'assets/js/concatenated/javascript.concat.js'
            }
        },
        /*Minify JS*/
        uglify: {
            build: {
                files: {
                    'assets/js/minified/javascript.min.js': ['assets/js/concatenated/bower.js','assets/js/concatenated/javascript.concat.js']
                }
            }
        },
        sass: {
            build: {
                files: {
                    'assets/css/concat.style.css': 'resources/sass/scss/style.scss'
                }
            }
        },
        cssmin: {
            options: {
            },
            dist: {
                src: ['assets/css/concat.style.css'],
                dest: 'assets/css/style.min.css'
            }
        }
    });
    grunt.registerTask('dev', ['bower_concat','concat','uglify','buildcss']);
    grunt.registerTask('buildcss',  ['sass','cssmin']);
    grunt.registerTask('wiredeps', ['wiredep']);
};
