'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

require('tty');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ' + chalk.red('gcloud') + ' project generator!'));

    var self = this;
    const answer = function(name, def) {
      var value = self.config.get(name);
      if (value === undefined) {
        return def;
      }
      return value;
    };
    // Load .yo-rc.json
    this.config.getAll();

    const prompts = [
      {
        type: 'confirm',
        name: 'cloudbuild',
        message: 'Would you like to generate a cloudbuild.yaml?',
        default: answer('cloudbuild', true)
      }
    ];

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

  writing() {
    // Follow best practice to always generate a .yo-rc.json
    this.config.save();

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
