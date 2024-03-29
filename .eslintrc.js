module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    browser: true
  },
  settings: {
    react: {
      version: '17'
    }
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [
    'jest', 'react'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
  },
  globals: {
    API_BASE_URL: 'readonly',
    IS_OFFLINE: 'readonly',
    LEGACY_API_BASE_URL: 'readonly',
    EMBED_HOST: 'readonly',
    S3_BUCKET: 'readonly',
    IS_PROD: 'readonly',
    THUMBS_HOST: 'readonly'
  },
  overrides: [
    {
      files: [
        '**/*.spec.js',
        '**/*.spec.jsx'
      ],
      env: {
        jest: true
      }
    }
  ]
}
