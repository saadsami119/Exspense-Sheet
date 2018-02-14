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
      }
}