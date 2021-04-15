module.exports = function (grunt) {
    const token = grunt.option('token');

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'stephentco@gmail.com',
                token: token,
                branch: 'ants',
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}