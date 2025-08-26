module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,css,md,html}': [
    'prettier --write',
  ],
  '*.{rs,toml}': [
    'cargo fmt',
  ],
};
