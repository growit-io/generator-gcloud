'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Call the super constructor to set up our generator correctly
    super(args, opts);

    // Boolean options are recognised as --opt and --opt=true|false
    this.option('yes', {
      description: 'Do not prompt and accept the default answers'
    });

    this.option('cloudbuild', {
      description: 'write cloudbuild.yaml'
    });
  }

  initializing() {
    // Initialise properties from options
    this.props = _.extend({}, this.options);

    // Fill undefined values with configuration values from .yo-rc.json
    _.defaults(this.props, this.config.getAll());

    // Set defaults values for configuration options which are not in
    // .yo-rc.json, so that prompting has some default value available
    this.config.defaults({
      cloudbuild: true
    });
  }

  prompting() {
    // Ask to confirm configuration values, but skip prompts for properties
    // which were set from options. Skip all prompts if the --yes flag was
    // used.
    const prompts = [];
    [
      {
        type: 'confirm',
        name: 'cloudbuild',
        message: 'Would you like to generate cloudbuild.yaml?'
      }
    ].forEach(prompt => {
      const name = prompt.name;

      if (this.options[name] === undefined) {
        const defaultAnswer = this.config.get(name);

        if (this.options.yes) {
          this.props[name] = defaultAnswer;
        } else {
          prompt.default = defaultAnswer;
          prompts.push(prompt);
        }
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
