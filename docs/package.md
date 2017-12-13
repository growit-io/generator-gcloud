# GCloud Package Specification
A **gcloud package** is an [NPM package] which bundles assets for projects intended to be deployed on Google Cloud Platform, such as Templates and/or Configurations for [Deployment Manager]. The `package.json` file of such packages MAY define additional metadata pertaining to Google Cloud Platform in the `"gcloud"` field.

## Terminology

- **Build Requst**: A YAML file describing your project's build instructions to the Container Builder service, typically called `cloudbuild.yaml`.
- **Configuration**: Describes a Deployment Manager Configuration, often found in a file called `config.yaml`.
- **Configuration Package**: Describes an NPM package which provides one or more Deployment Manager Configurations in addition to, or instead of Deployment Manager Templates.
- **Template**: Describes a Deployment Manager Template, composed of one or more YAML, JSON, Jinja and/or Python files.
- **Template Package**: Describes an NPM package which provides one or more Deployment Manager Templates. Each template is comprised of one or more files, and each of those files may be located anywhere within the package directory tree.

## Metadata
The following fields within the optional `"gcloud"` section of `package.json` have a defined meaning.

- `"project"`: A Google Cloud Platform project to deploy the Configuration into. If this field is present, its value must be a valid *PROJECT_ID*, regardless of whether the project itself currently exists.

## Templates and Configurations
Configuration Packages MUST provide a top-level Configuration in the file `config.yaml`, describing a set of resources to deploy together. This Configuration can easily be deployed from the command line with `npm install && gcloud deployment-manager deployments create --config config.yaml`. It should only matter that the `node_modules` directory is up-to-date, before executing the `gcloud` command.

Template Packages MAY also have a `config.yaml` file, but they MUST always provide one or more JSON, Jinja, and/or Python files to be used as a dependency in Configuration Packages or other Template Packages.

[Deployment Manager]: https://cloud.google.com/deployment-manager/docs/fundamentals
[NPM package]: https://docs.npmjs.com/files/package.json
