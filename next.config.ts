/* eslint-disable import/no-anonymous-default-export */

import { NextConfig } from "next";
import { build } from "velite";

const nextConfig: NextConfig = {
  // othor next config here...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(
    /** @type {import('webpack').Compiler} */ compiler: {
      hooks: {
        beforeCompile: {
          tapPromise: (arg0: string, arg1: () => Promise<void>) => void;
        };
      };
      options: { mode: string };
    }
  ) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
