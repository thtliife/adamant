#! /usr/bin/env node
const { prompt } = require('enquirer');
const Ora = require('ora');
const utils = require('./src/utils');

const packageJson = utils.paths().packageJson;

const main = async () => {
  const spinner = new Ora({
    text: 'Working',
    spinner: process.argv[2]
  });
  try {
    const install = await prompt({
      type: 'confirm',
      name: 'confirm',
      message: `Do you want to configure ${
        utils.paths().cwd.basename
      } as a new project?`,
      initial: true,
      format() {
        return this.value === true ? 'Yes' : 'No';
      }
    });
    if (!install.confirm) {
      return;
    }
    spinner.start();
    spinner.text = 'Configure package.json';
    const packageJsonExists = await utils.fileExists(packageJson);
    const npmInitDone = await utils.initializeNpm();
    const wrotePackageJsonDefaults = await utils.writePackageJsonDefaults(
      packageJson
    );
    spinner.succeed();
    spinner.start();
    spinner.text = 'Create default config files';
    const createdDefaultConfigFiles = await utils.writeTemplateFiles();
    spinner.succeed();
    spinner.start();
    spinner.text = 'Initialize git';
    const initializedGit = await utils.initializeGit();
    spinner.succeed();
    spinner.start();
    spinner.text = 'Install dev dependencies';
    const installedDevDependencies = await utils.installDevDependencies();
    spinner.succeed();
  } catch (exception) {
    spinner.fail(spinner.text + '\n' + exception);
  }
};

main();
