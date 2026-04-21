module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            assets: './app/assets',
            components: './app/components',
            containers: './app/containers',
            constants: './app/constants',
            hoc: './app/hoc',
            hooks: './app/hooks',
            navigation: './app/navigation',
            services: './app/services',
            screens: './app/screens',
            store: './app/store',
            util: './app/util',
          },
        },
      ],
      ['module:react-native-dotenv'],
      'react-native-reanimated/plugin',
    ],
  };
};
