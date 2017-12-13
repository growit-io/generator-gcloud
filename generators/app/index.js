'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

// The tty module provides isTTY on stdin and other streams
require('tty');

const prompts = [
  {
    type: 'confirm',
    name: 'cloudbuild',
    message: 'Would you like to generate a cloudbuild.yaml?',
    default: true,
    store: true
  }
];

module.exports = class extends Generator {
  initializing() {
    // Load .yo-rc.json.
    this.config.getAll();
  }

  prompting() {
    // Have Yeoman greet the user
    this.log(yosay('Welcome to the ' + chalk.red('gcloud') + ' project generator!'));

    // Prompt the user for answers if stdin is a terminal
    if (process.stdin.isTTY) {
      return this.prompt(prompts).then(props => {
        // Save the answers
        this.props = props;
        for (var x in prompts) {
          if (Object.prototype.hasOwnProperty.call(prompts, x)) {
            var p = prompts[x];
            this.config.set(p.name, this.props[p.name]);
          }
        }
      });
    }

    // Otherwise, assume the default value for all answers
    return this.prompt([]).then(props => {
      this.props = props;
      for (var x in prompts) {
        if (Object.prototype.hasOwnProperty.call(prompts, x)) {
          var p = prompts[x];
          this.props[p.name] = p.default;
          this.config.set(p.name, this.config.get(p.name));
        }
      }
    });
  }

  configuring() {
    // Follow best practice to always generate a .yo-rc.json
    this.config.save();
  }

  writing() {
    var files = ['README.md', 'package.json', 'config.yaml'];

    if (this.props.cloudbuild) {
      files.push('cloudbuild.yaml');
    }

    for (var x in files) {
      if (Object.prototype.hasOwnProperty.call(files, x)) {
        var name = files[x];
        this.fs.copy(this.templatePath(name), this.destinationPath(name));
      }
    }
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
