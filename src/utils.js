const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const templates = require('./templates');

const devDeps = [
  'babel-eslint',
  'eslint',
  'eslint-config-jest-enzyme',
  'eslint-plugin-babel',
  'eslint-plugin-import',
  'eslint-plugin-jest',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-prettier',
  'eslint-plugin-react',
  'husky',
  'lint-staged',
  'prettier'
];

const fileExists = file =>
  new Promise((resolve, reject) =>
    fs.access(path.resolve(file), fs.F_OK, error =>
      error
        ? error.code === 'ENOENT'
          ? resolve(false)
          : reject(error)
        : resolve(true)
    )
  );

const initializeGit = () =>
  new Promise((resolve, reject) =>
    exec('git init --quiet', (error, stdout, stderr) =>
      error ? reject(error) : resolve(true)
    )
  );

const initializeNpm = () =>
  new Promise((resolve, reject) =>
    exec('npm init --yes', (error, stdout, stderr) =>
      error ? reject(error) : resolve(true)
    )
  );

const installDevDependencies = () =>
  new Promise((resolve, reject) =>
    exec(
      `npm install --save-dev ${devDeps.join(' ')}`,
      (error, stdout, stderr) => (error ? reject(error) : resolve(true))
    )
  );

paths = () => ({
  cwd: {
    fullPath: path.resolve('.'),
    basename: path.basename(path.resolve('.'))
  },
  packageJson: path.resolve('./package.json')
});

const writePackageJsonDefaults = packageJson =>
  new Promise((resolve, reject) => {
    try {
      const pkgJson = require(path.resolve(packageJson));
      pkgJson.main = './src/index.js';
      pkgJson.scripts = pkgJson.scripts || {};
      pkgJson.scripts.prettier = 'npx prettier --write src/**/*.js';
      pkgJson.scripts.lint = 'eslint --debug src/';
      pkgJson.scripts['lint:write'] = 'eslint --debug src/';

      pkgJson.husky = pkgJson.husky || {};
      pkgJson.husky.hooks = pkgJson.husky.hooks || {};
      pkgJson.husky.hooks['pre-commit'] = 'lint-staged';

      pkgJson['lint-staged'] = pkgJson['lint-staged'] || {};
      pkgJson['lint-staged']['*.(js|jsx)'] = ['npm run lint:write', 'git add'];

      const output = JSON.stringify(pkgJson, null, 2);
      fs.writeFile(packageJson, output, err =>
        err ? reject(err) : resolve(true)
      );
    } catch (exception) {
      reject(exception);
    }
  });

const writeTemplateFile = template =>
  new Promise((resolve, reject) =>
    fs.mkdir(
      path.dirname(path.resolve('.', template.fileName)),
      { recursive: true },
      err =>
        err
          ? reject(err)
          : fs.writeFile(
              path.resolve('.', template.fileName),
              template.content,
              err => (err ? reject(err) : resolve(true))
            )
    )
  );

const writeTemplateFiles = () =>
  new Promise(async (resolve, reject) => {
    try {
      await Promise.all(
        Object.keys(templates).map(
          async key => await writeTemplateFile(templates[key])
        )
      );
      resolve(true);
    } catch (exception) {
      reject(exception);
    }
  });

module.exports = {
  fileExists,
  initializeGit,
  initializeNpm,
  installDevDependencies,
  paths,
  writePackageJsonDefaults,
  writeTemplateFiles
};
