const path=require('path'),HtmlPlugin=require('html-webpack-plugin'),CopyPlugin=require('copy-webpack-plugin');
module.exports={entry:'./src/main.jsx',output:{path:path.resolve(__dirname,'dist'),filename:'app.[contenthash:8].js',publicPath:'auto',clean:true},
 resolve:{extensions:['.js','.jsx']},
 module:{rules:[{test:/\.jsx?$/,exclude:/node_modules/,use:{loader:'babel-loader',options:{presets:['@babel/preset-env',['@babel/preset-react',{runtime:'automatic'}]]}}},{test:/\.css$/,use:['style-loader','css-loader']},{test:/\.(woff2?)$/,type:'asset/resource',generator:{filename:'fonts/[name][ext]'}}]},
 plugins:[new HtmlPlugin({template:'./template.html'}),new CopyPlugin({patterns:[{from:'public',to:'.'}]})],
 devServer:{static:path.resolve(__dirname,'public'),port:5173,hot:true,historyApiFallback:true},performance:{hints:false}};
