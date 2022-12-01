import { build as esbuild } from "esbuild";

export async function build(config) {
  const start = process.hrtime();
  const {
    banner,
    entryPoints,
    env = "production",
    external,
    footer,
    format = "esm",
    jsx,
    outdir,
    outbase,
    outfile,
    sourcemap = true,
    splitting,
  } = config;

  return esbuild({
    entryPoints,
    banner,
    bundle: true,
    define: {
      "process.env.NODE_ENV": `"${env}"`,
      "process.env.NODE_DEBUG": `false`,
    },
    external,
    footer,
    format,
    jsx,
    loader: {
      ".woff2": "dataurl",
      ".ttf": "file",
    },
    mainFields: ["module", "main"],
    metafile: true,
    minify: config.env === "production",
    // minify: false,
    outbase,
    outdir,
    outfile,
    sourcemap,
    splitting,
    target: "esnext",
    watch: false,
  })
    .then((result) => {
      const [seconds, nanoSeconds] = process.hrtime(start);
      return { result, duration: { seconds, nanoSeconds } };
    })
    .catch((err) => {
      console.error(`ERROR in [${config.name}] ${err.message}`);
      process.exit(1);
    });
}
