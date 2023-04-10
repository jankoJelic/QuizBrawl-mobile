module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          assets: './src/assets',
          components: './src/components',
          containers: './src/containers',
          constants: './src/constants',
          hoc: './src/hoc',
          hooks: './src/hooks',
          navigation: './src/navigation',
          services: './src/services',
          screens: './src/screens',
          store: './src/store',
          util: './src/util',
        },
      },
    ],
  ],
};
