module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  features: {
    emotionAlias: false,
  },
  refs: {
    /**
     * https://github.com/chakra-ui/chakra-ui/issues/2263#issuecomment-767557426
     */
    // "@chakra-ui/react": {
    //   disable: true,
    // },
  },
  babel: async (options) => {
    options.presets.push("@emotion/babel-preset-css-prop");
    return options;
  },
};
