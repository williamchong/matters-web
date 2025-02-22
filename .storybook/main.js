const tsconfig = require('../tsconfig.json')
const path = require('path')
const { mergeWithCustomize } = require('webpack-merge')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
        cssModules: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  webpackFinal: async (config) => {
    // this modifies the existing image rule to exclude .svg files
    // since we want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) => {
      if (typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
    })
    if (typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/
    }

    // configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'removeDimensions',
                  active: true,
                },
                {
                  name: 'prefixIds',
                  active: true,
                },
              ],
            },
          },
        },
        {
          loader: 'url-loader',
          options: {
            limit: 1024,
            publicPath: '/_next/static/',
            outputPath: `static/`,
          },
        },
      ],
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..'),
      '~': path.resolve(__dirname, '../src'),
    }

    return config
  },

  docs: {
    autodocs: true,
  },
}
