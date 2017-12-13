# GCloud Generator [![Package Version](https://img.shields.io/npm/v/generator-gcloud.svg)](https://www.npmjs.com/package/generator-gcloud) [![Build Status](https://travis-ci.org/growit-io/generator-gcloud.svg?branch=master)](https://travis-ci.org/growit-io/generator-gcloud) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A [Yeoman] Generator for [Google Cloud Platform] resources, notably Deployment Manager configurations at this point. The source contains an [example] of what the result will look like, if you accepted all the default answers.

## Quickstart

    npm install -g yo generator-gcloud
    yo gcloud
    
This will install both Yeoman and this generator globally, and then start prompting you to describe the project to generate.

## Features
- Generates example `config.yaml` and `cloudbuild.yaml` files for the Deployment Manager and Container Builder services, respectively.
- Generates a `package.json` file for [NPM]. You should follow the semi-formal [package specification] in this repository, if you wish to publish your packages.

### Missing Features
- Dynamic generation of `config.yaml`. Currently it's a static template.
- Optional installation of Google Cloud SDK during the installation phase. This can be done easily with the [@google-cloud/cloud-sdk] package.

## Known Issues
- The generated `package.json` lacks required fields like `name`.

## Changelog
See the [CHANGELOG.md](CHANGELOG.md) file.

## License
See the [LICENSE](LICENSE) file.

[example]: example
[package specification]: docs/package.md

[Google Cloud Platform]: https://cloud.google.com
[NPM]: https://npmjs.com
[Yeoman]: http://yeoman.io

[@google-cloud/cloud-sdk]: https://www.npmjs.com/package/@google-cloud/cloud-sdk
