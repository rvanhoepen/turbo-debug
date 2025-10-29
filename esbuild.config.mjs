import { build } from 'esbuild';

const args = process.argv.slice(2);
const watch = args.includes('--watch');

const variants = [
  { entry: 'src/turbo-debug.js', outfile: 'dist/turbo-debug.js' },
  { entry: 'src/turbo-debug-auto.js', outfile: 'dist/turbo-debug-auto.js' },
];

const common = {
  bundle: true,
  sourcemap: true,
  format: 'esm',
  target: ['es2018'],
  loader: { '.css': 'text' },
};

for (const { entry, outfile } of variants) {
  // build unminified
  if (watch) {
    await build({
      ...common,
      entryPoints: [entry],
      outfile,
      minify: false,
      watch: {
        onRebuild(error, _result) {
          if (error) {
            console.error('Watch build failed:', error);
          } else {
            console.log('Watch build succeeded');
          }
        },
      },
    });
  } else {
    await build({
      ...common,
      entryPoints: [entry],
      outfile,
      minify: false,
    });
  }

  // build minified
  await build({
    ...common,
    minify: true,
    entryPoints: [entry],
    outfile: outfile.replace('.js', '.min.js'),
  });
}
