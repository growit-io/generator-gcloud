/* global beforeEach, describe, it */
'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

// The generator under test
const generator = path.join(__dirname, '../generators/app');

// Common files which exist in other packages, too
const packageFiles = ['.yo-rc.json', 'README.md', 'package.json'];

// Deployment manager configurations
const configurationFiles = ['config.yaml'];

// Build requests for the Container Builder service
const cloudbuildFiles = ['cloudbuild.yaml'];

// All files that the generator is able to generate
const generatedFiles = packageFiles.concat(configurationFiles, cloudbuildFiles);

/*
 * The creation of cloudbuild.yaml can be turned on and off
 */

describe('gcloud:app', () => {
  describe('with default options', () => {
    beforeEach(() => {
      return helpers.run(generator);
    });

    it('generates all files', () => {
      assert.file(generatedFiles);
    });
  });

  describe('with options {cloudbuild: false}', () => {
    beforeEach(() => {
      return helpers.run(generator).withOptions({ cloudbuild: false });
    });

    it('generates all but the cloudbuild files', () => {
      assert.file(packageFiles.concat(configurationFiles));
      assert.noFile(cloudbuildFiles);
    });
  });
});

/*
 * The --yes flag disables all prompts. This is useful for non-interactive
 * usage scenarios, or if the user explicitly wants to accept all defaults.
 */

describe('gcloud:app', () => {
  const answers = { cloudbuild: true };

  describe('with options {yes: true}', () => {
    beforeEach(() => {
      return helpers
        .run(generator)
        .withLocalConfig({ cloudbuild: false })
        .withOptions({ yes: true })
        .withPrompts(answers); // Would change cloudbuild to true
    });

    it('skips all prompts', () => {
      assert.noFile('cloudbuild.yaml'); // But does not
    });
  });

  describe('with options {yes: false}', () => {
    beforeEach(() => {
      return helpers
        .run(generator)
        .withLocalConfig({ cloudbuild: false })
        .withOptions({ yes: false })
        .withPrompts(answers); // Will change cloudbuild to true
    });

    it('prompts for undefined options', () => {
      assert.file('cloudbuild.yaml'); // And does so
    });
  });
});
