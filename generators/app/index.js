'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Call the super constructor to set up our generator correctly
    super(args, opts);

    // Support boolean options as --opt and --opt=true|false
    this.option('cloudbuild', { description: 'write cloudbuild.yaml' });
  }

  initializing() {
    // Initialise properties to explicit options or configuration values
    this.props = _.extend({}, this.config.getAll(), this.options);

    // Add default values to the configuration. Not all options have a
    // configuration equivalent.
    this.config.defaults({
      cloudbuild: true
    });
  }

  prompting() {
    // Prompt for undefined properties
    let prompts = [];
    [
      {
        type: 'confirm',
        name: 'cloudbuild',
        message: 'Would you like to generate a cloudbuild.yaml?'
      }
    ].forEach(prompt => {
      if (this.props[prompt.name] === undefined) {
        prompt.default = this.config.get(prompt.name);
        prompts.push(prompt);
      }
    });
    return this.prompt(prompts).then(answers => {
      _.extend(this.props, answers);
    });
  }

  configuring() {
    // Save configuration options that differ from the defaults
    Object.keys(this.config.getAll()).forEach(key => {
      if (this.props[key] !== this.config.get(key)) {
        this.config.set(key, this.props[key]);
      }
    });
  }

  writing() {
    const files = ['README.md', 'package.json', 'config.yaml'];

    if (this.props.cloudbuild) {
      files.push('cloudbuild.yaml');
    }

    files.forEach(name => {
      this.fs.copy(this.templatePath(name), this.destinationPath(name));
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
