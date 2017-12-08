'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

function generator(config) {
  return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(config);
}

describe('generator-gcloud:app', () => {
  describe('with cloudbuild:true', () => {
    beforeAll(() => {
      return generator({ cloudbuild: true });
    });

    it('creates the expected files', () => {
      assert.file(['.yo-rc.json']);
      assert.file(['package.json']);
      assert.file(['config.yaml']);
      assert.file(['cloudbuild.yaml']);
    });
  });

  describe('with cloudbuild:false', () => {
    beforeAll(() => {
      return generator({ cloudbuild: false });
    });

    it('creates the expected files', () => {
      assert.file(['.yo-rc.json']);
      assert.file(['package.json']);
      assert.file(['config.yaml']);
      assert.noFile(['cloudbuild.yaml']);
    });
  });
});
