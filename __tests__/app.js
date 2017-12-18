/* global beforeEach, describe, it */
'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const otherFiles = ['.yo-rc.json', 'README.md', 'config.yaml', 'package.json'];

describe('gcloud:app', () => {
  describe('with default options', () => {
    beforeEach(() => {
      return generator({});
    });

    it('creates cloudbuild.yaml', () => {
      assert.file(['cloudbuild.yaml']);
    });

    it('creates other files', () => {
      assert.file(otherFiles);
    });
  });

  describe('with options {cloudbuild: false}', () => {
    beforeEach(() => {
      return generator({ cloudbuild: false });
    });

    it('creates no cloudbuild.yaml', () => {
      assert.noFile(['cloudbuild.yaml']);
    });

    it('creates other files', () => {
      assert.file(otherFiles);
    });
  });
});

function generator(options) {
  return helpers.run(path.join(__dirname, '../generators/app')).withOptions(options);
}
