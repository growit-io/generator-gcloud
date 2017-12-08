'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

require('tty');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ' + chalk.red('gcloud') + ' project generator!'));

    const prompts = [
      {
        type: 'confirm',
        name: 'generateCloudbuildYaml',
        message: 'Would you like to generate a cloudbuild.yaml?',
        default: true
      }
    ];

    // Prompt the user for answers if stdin is a terminal
    if (process.stdin.isTTY) {
      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      });
    }

    // Otherwise, assume the default value for all answers
    return this.prompt([]).then(props => {
      this.props = props;
      for (var x in prompts) {
        if (Object.prototype.hasOwnProperty.call(prompts, x)) {
          let p = prompts[x];
          this.props[p.name] = p.default;
        }
      }
    });
  }

  writing() {
    var files = ['package.json', 'config.yaml'];
    if (this.props.generateCloudbuildYaml) {
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
