module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "entry",
        "corejs": "3.8"
      },
    ],
    '@babel/preset-react',
  ],
  'plugins': [
    'babel-plugin-styled-components',
  ],
};