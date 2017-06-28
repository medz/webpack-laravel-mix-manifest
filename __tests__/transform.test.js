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

test('Test not assets', () => {
  expect(transform()).toBe(JSON.stringify({}, null, 2));
});

test('Test transform function assets is Array', () => {
  const assets = {
    app: [
      "app.js",
    ]
  };
  const beManifest = JSON.stringify({
    "/app.js": "/app.js"
  }, null, 2);
  expect(transform(assets)).toBe(beManifest);
});

test('Test transform function assets is long', () => {
  const assets = {
    app: [
      'js/app.js'
    ]
  };
  const beManifest = JSON.stringify({
    "/js/app.js": "/js/app.js"
  }, null, 2);
  expect(transform(assets)).toBe(beManifest);
});
