module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended',],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    "semi": "off",
    "@typescript-eslint/semi": "off",
    "no-unexpected-multiline": "error"
  }
}
