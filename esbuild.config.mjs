import { build } from 'esbuild';

const args = process.argv.slice(2);
const watch = args.includes('--watch');

const common = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  target: ['es2018'],
  outfile: 'dist/turbo-debug.js',
};

// build unminified
await build({
  ...common,
  minify: false,
  watch,
});

// build minified
await build({
  ...common,
  minify: true,
  outfile: 'dist/turbo-debug.min.js',
});
