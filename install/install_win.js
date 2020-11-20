const fs = require('fs');
const inquirer = require('inquirer');
const dotenv = require('dotenv');

module.exports = function(){

	var args = JSON.parse(process.env.npm_config_argv).original;
	var test = new RegExp('^-.*$', 'g');

	var flags = args.filter(function(value) {
		return test.test(value);
	});

	if (flags.includes('-p') || flags.includes('--production')) {
		dotenv.config({path: fs.realpathSync(__dirname + '/../.env')});
		if (process.env.NNP_PACKAGE) {
			return;
		} else {
			console.error('It has been used flag -p but no package has been specified during dev installation.\nAborting.');
			process.exit(1);
		}
	}

	makeEnv('electron-edge-js');
};

function makeEnv(pack) {
	fs.writeFileSync(fs.realpathSync(__dirname + '\\..') + "\\.env", `NNP_PACKAGE=${pack}`);
}
