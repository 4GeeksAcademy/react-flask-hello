const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const PrettierPlugin = require("prettier-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const port = 3000;
let publicUrl = `http://localhost:${port}`;
if(process.env.GITPOD_WORKSPACE_URL){
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `${port}-${host}`;
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase:  './dist',
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
        public: publicUrl
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new PrettierPlugin({
            parser: "babylon",
            printWidth: 120,             // Specify the length of line that the printer will wrap on.
            tabWidth: 4,                // Specify the number of spaces per indentation-level.
            useTabs: true,              // Indent lines with tabs instead of spaces.
            bracketSpacing: true,
            extensions: [ ".js", ".jsx" ],
            jsxBracketSameLine: true,
            semi: true,                 // Print semicolons at the ends of statements.
            encoding: 'utf-8'           // Which encoding scheme to use on files
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
