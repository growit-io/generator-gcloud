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

    it('creates .yo-rc.yml with cloudbuild:true', () => {
      assert.jsonFileContent('.yo-rc.json', {
        'generator-gcloud': { cloudbuild: true }
      });
    });

    it('creates the other expected files', () => {
      assert.file(['package.json']);
      assert.file(['config.yaml']);
      assert.file(['cloudbuild.yaml']);
    });
  });

  describe('with cloudbuild:false', () => {
    beforeAll(() => {
      return generator({ cloudbuild: false });
    });

    it('creates .yo-rc.yml with cloudbuild:false', () => {
      assert.jsonFileContent('.yo-rc.json', {
        'generator-gcloud': { cloudbuild: false }
      });
    });

    it('creates the other expected files', () => {
      assert.file(['package.json']);
      assert.file(['config.yaml']);
      assert.noFile(['cloudbuild.yaml']);
    });
  });
});
