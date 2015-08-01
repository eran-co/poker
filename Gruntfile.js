module.exports = function(grunt) {
    console.log(require("matchdep").filterAll("grunt-*"))
    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    webpackConfig.plugins = webpackConfig.plugins || [];
    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                )
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },
        "webpack-dev-server": {
            options: {
                webpack: webpackConfig,
                publicPath: "/" + webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "eval",
                    debug: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["site/less"]
                },
                files: {
                    "site/dist/main.css": [
                        "site/less/main.less"
                    ]
                }
            }
        },
        watch: {
            app: {
                files: ["site/js/**/*.js"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false
                }
            },
            less:{
                files: ["site/less/**/*.less"],
                tasks: ["less:development"]
            }
        }
    });
    // grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask("default", ["webpack-dev-server:start"]);
    grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);
    grunt.registerTask("less", ["less:development"]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);
};
