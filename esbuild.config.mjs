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
  loader: { '.css': 'text' },
};

// build unminified
if (watch) {

  await build({
    ...common,
    minify: false,
    watch: {
      onRebuild(error, _result) {
        if (error) {
          console.error('Watch build failed:', error);
        } else {
          console.log('Watch build succeeded');
        }
      },
    }
  });
} else {
  await build({
    ...common,
    minify: false,
  });
}

// build minified
await build({
  ...common,
  minify: true,
  outfile: 'dist/turbo-debug.min.js',
});
