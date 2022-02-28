# Rollup plugin strip final exports

## Description

This is a plugin intended to strip the final exports that rollup leave in the bundle file.

## Usage

This plugin is pretty straight forward. Simply add it to your plugins array and it'll do what is intended to.

```js
// rollup.config.js
import stripFinalExports from 'rollup-plugin-strip-final-exports';

export default {
  input: 'src/index.js',
  output: 'dist/index.js',
  plugins: [
    stripFinalExports(),
  ]
}
```

By using this plugin, the following lines will be removed from your output file

### CommonJS modules
<br />

```js
exports.foo = foo;

module.exports = foo;

module.exports.foo = foo;

module['exports'] = foo;

module['exports'].foo = foo;

module.exports['foo'] = foo;

```
### ES modules
<br />

```js
export const foo = 'Foo';

export { foo };

export default foo;

export default 'Foo';

export { foo } from './foo';

export * from './foo';

export default from 'foo';
```
