#! /usr/bin/env node

const Ora = require('ora');
const utils = require('./src/utils');

const packageJson = './package.json';

const main = async () => {
  try {
    (await utils.fileExists(packageJson)) || (await utils.initializeNpm());
    await utils.writePackageJsonDefaults(packageJson);
    utils.writeTemplateFiles();
    utils.initializeGit();
    utils.installDevDependencies();
  } catch (exception) {
    console.error(exception);
  }
};

main();
