module.exports = {
  arrowParens: "avoid", // <avoid|always> | default 'avoid'
  bracketSpacing: true, // <bool> | default true
  endOfLine: "auto", // '<auto|lf|crlf|cr>' | default 'auto'
  htmlWhitespaceSensitivity: "css", // '<css|strict|ignore>' | default 'css'

  insertPragma: false, // <bool> | default false
  jsxBracketSameLine: false, // <bool> | default false
  jsxSingleQuote: false, // <bool> | default false
  overrides: [
    { files: ".prettierrc", options: { parser: "babel" } },
    { files: "*.json", options: { parser: "json" } },
    { files: "*.html", options: { parser: "html" } },
    { files: "*.css", options: { parser: "css" } },
    { files: "*.less", options: { parser: "less" } },
    { files: "*.scss", options: { parser: "scss" } },
    { files: "*.sass", options: { parser: "scss" } },
    { files: "*.graphql", options: { parser: "graphql" } },
    { files: "*.md", options: { parser: "markdown" } },
    { files: "*.vue", options: { parser: "vue" } }
  ],
  parser: "babel",
  printWidth: 80, // <int> | default 80
  proseWrap: "preserve", // '<always|never|preserve>' | default 'preserve'
  requirePragma: false, // <bool> | default false
  semi: true, // <bool> | default true
  singleQuote: true, // <bool> | default false
  tabWidth: 2, // <int> | default 2
  trailingComma: "none", // '<none|es5|all>' | default 'none'
  useTabs: false // <bool> |  <bool> | default false
};
