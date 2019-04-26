var ghpages = require('gh-pages');
var Console = require('bc-console');
var webpack = require('webpack');
var path = require('path');
const envfile = require('envfile');
var fs = require('fs');

var remoteOriginUrl = require('remote-origin-url');
var gh = require('parse-github-url');

if (!fs.existsSync(path.resolve(__dirname,'.git'))){
    Console.error("No repository found on this project");
    Console.help("Follow this steps to create a new repository for your project: http://kbroman.org/github_tutorial/pages/init.html");
    return;
}

const origin = remoteOriginUrl.sync();
if(!origin || origin==''){
    Console.error("No remote origin has been found on this repository");
    Console.help(`Check your remote by doing:
$ git remote get-url origin

Add your remote by doing:
$ git remote add origin <github_repository_url>
`);
return;
}
Console.info("The remote was found successfully, starting the deploy from here: "+origin);

//get the repository project name
const repository = gh(origin);

// update the env file
const envPath = './.env';
const env = envfile.parseFileSync(envPath);
env['BASENAME'] = `/${repository["name"]}/`;
Console.info("Updating the .env file with the basename "+repository["name"]);
fs.writeFileSync(envPath, envfile.stringifySync(env));

const compiler = webpack(require(path.resolve(__dirname, 'webpack.prod.js')));
compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(stats.toString({
        colors: true
      }));
      Console.error("There was an error compiling, review above");
      return;
    }
    Console.success("Your code compiled successfully, proceding to deploy...");
    ghpages.publish('public', function(err) {
        if(err){
            console.error(err);
            Console.error("There was an error publishing your website");
            return;
        }
        //https://<github_user>.github.io/<repository-name>
        Console.success(`Your website has been deployed successfully here: https://${repository["owner"]}.github.io/${repository["name"]}/`);
    });
});
