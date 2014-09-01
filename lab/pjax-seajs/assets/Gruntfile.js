module.exports = function (grunt) {

    //seajs
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    var alias = {
        '$-debug': 'gallery/jquery/2.1.1/jquery-debug',
        '$': 'gallery/jquery/2.1.1/jquery',
        'date': 'gallery/date/0.0.0/index-debug'
    };

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        transport : {
            options : {
                paths : ['scripts/'],
                alias: alias,
                parsers : {
                    '.js' : [script.jsParser],
                    '.css' : [style.css2jsParser],
                    '.html' : [text.html2jsParser]
                }
            },
            common: {
                options: {
                    idleading: 'common/'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'scripts/src/common',
                        src: ['**.js', '!**-debug.js'],
                        filter: 'isFile',
                        // dest: '.build/common'
                        dest: 'scripts/common'
                    }
                ]
            },
            app: {
              options: {
                idleading: 'app/'
              },
              files: [
                {
                  expand: true,
                  cwd: 'scripts/src/app',
                  src: '**.js',
                  filter: 'isFile',
                  // dest: '.build/app'
                  dest: 'scripts/app'
                }
              ]
            }
        },
        concat: {
            options: {
               paths: ['scritps'],
               include: 'relative' // default is self, all relative
            },
            app: {
                files: [
                    {
                      expand: true,
                      cwd: 'scripts/app',
                      src: '**.js',
                      filter: 'isFile',
                      // dest: '.build/app'
                      dest: 'scripts/app'
                    }
                ]
            }
        },
        uglify: {
            options: {},
            dist: {
                files: [
                    // {
                    //     expand: true,
                    //     cwd: 'dist',
                    //     src: ['*/*.js', '!*/*-debug.js'],
                    //     // filter: 'isFile',
                    //     dest: 'dist'
                    // }
                    {
                        expand: true,
                        cwd: 'scripts/app',
                        src: ['*.js', '!*-debug.js'],
                        filter: 'isFile',
                        dest:'scripts/app'
                    },
                    {
                        expand: true,
                        cwd: 'scripts/common',
                        src: ['*.js', '!*-debug.js'],
                        filter: 'isFile',
                        dest:'scripts/common'
                    }
                ]
            }
        },
        clean : {
            spm : ['.build']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    //shop模块
    grunt.registerTask('build-app', ['transport:app', 'clean']);
    //seajs 公用模块
    grunt.registerTask('build-common', ['transport:common', 'clean']);

    grunt.registerTask('default', ['transport:app', 'transport:common', 'concat:app', 'uglify:dist', 'clean']);
};