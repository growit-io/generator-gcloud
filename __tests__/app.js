/* global beforeAll, describe, it */
'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

function generator(options) {
  return helpers.run(path.join(__dirname, '../generators/app')).withOptions(options);
}

describe('gcloud:app', () => {
  describe('with default options', () => {
    beforeEach(() => {
      return generator({});
    });

    it('creates cloudbuild.yaml', () => {
      assert.file(['cloudbuild.yaml']);
    });

    it('creates other files', () => {
      assert.file(['.yo-rc.json']);
      assert.file(['README.md']);
      assert.file(['package.json']);
      assert.file(['config.yaml']);
    });
  });

  describe('with options {cloudbuild: false}', () => {
    beforeEach(() => {
      return generator({ cloudbuild: false });
    });

    it('creates no cloudbuild.yaml', () => {
      assert.noFile(['cloudbuild.yaml']);
    });
  });
});
