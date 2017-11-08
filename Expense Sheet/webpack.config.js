var webpack = require("webpack");
var path = require("path");

var rootPath = path.join(__dirname,"wwwroot");
var outputPath = path.join(rootPath,"build");

// const ccpOptions = {
//     name: "vendor",
//     filename: "./wwwroot/vendor.bundle.js"
//   };

module.exports = {
    entry:{
        "vendor" : rootPath+"/src/app/vendor",
        "app" : rootPath+"/src/app/bootstrap"
    },
    output :{
        path: outputPath,
        filename: "[name].bundle.js"
    },
    resolve:{
        extensions: ['.js', '.ts']
    },
    devtool: 'source-map',
    module: {
        loaders: [
          {
            test: /\.ts/,
            loaders: ['ts-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
            
          }
        ]
      },
      plugins: [
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js")
        //new webpack.optimize.CommonsChunkPlugin(ccpOptions),
        new webpack.LoaderOptionsPlugin({minimize: true,debug: false}),
        new webpack.optimize.UglifyJsPlugin({minimize: true,sourceMap: true})
      ]
}