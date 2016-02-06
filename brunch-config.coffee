exports.config =
    modules:
        wrapper: false
    files:
        javascripts:
            joinTo:
                'js/app.js': /^(vendor|bower_components|app)/

            order:
                before: ['bower_components/jquery/dist/jquery.js']
                after: ['bower_components/swag/lib/swag.js']

            pluginHelpers: 'js/app.js'

        stylesheets:
            joinTo:
                'css/app.css': /^(app|vendor)/
                'css/vendor.css': /^(vendor|bower_components)/

        templates:
            joinTo: 'js/app.js'

    plugins:
        jadePages:
            pattern: /^app\/.*\.jade$/
            destination: (path) ->
                path.replace /^app\/(.*)\.jade$/, "$1.html"
            jade:
                doctype: "html"
            htmlmin: false

        stylus:
            plugins: ['rupture','stylus-type-utils']

        postcss:
          processors: [
            require('autoprefixer')(),
            require('lost')
          ]

        autoReload:
            enabled:
                js: on
                css: on
                assets: off

        imageoptimizer:
            path: 'images'
            smushit: no

    conventions:
        assets: /(assets|vendor\/assets|font)/
