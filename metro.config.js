const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configuração para resolver problemas de sourcemap
config.transformer = {
  ...config.transformer,
  enableBabelRCLookup: false,
  enableBabelRuntime: false,
};

// Resolver problemas de InternalBytecode.js
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "mjs"],
};

module.exports = config;
