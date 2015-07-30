module.exports = {
    entry: ['./site/app.js'],
    output: {
        path: './site/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
            //{test: /\.js$/, loader: 'jsx-loader'}
        ]
    }
};
