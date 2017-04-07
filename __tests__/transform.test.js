import transform from '../src/transform';

test('Test the transform function', () => {
  const manifest = {
    app: 'app.js'
  };
  const beManifest = JSON.stringify({
    '/app.js': '/app.js'
  }, null, 2);
  expect(transform(manifest)).toBe(beManifest);
});
