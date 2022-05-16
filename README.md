# Node.js Express MongoDB

1.
2.

# Dependencies

- Slugify

```
npm install slugify
```

- nodemon

```
npm install nodemon
```

- run command

```
npx nodemon index.js
```

# Dependencies version control

- Old version install

  - sample

  ```
  npm install slugify@1.0.0
  ```

- Version check

```
npm outdated
```

| Package | Current | Wanted  | Latest | Location             | Depended by |
| ------- | ------- | ------- | ------ | -------------------- | ----------- |
| slugify | 1.0.0   | `1.6.5` | 1.6.5  | node_modules/slugify | 1-node-farm |

- Update package.json from "slugify": "^1.0.0" to "slugify": "~1.0.0"

| Package | Current | Wanted  | Latest | Location             | Depended by |
| ------- | ------- | ------- | ------ | -------------------- | ----------- |
| slugify | 1.0.0   | `1.0.2` | 1.6.5  | node_modules/slugify | 1-node-farm |

- one time update

```
npm update slugify
```

update from "slugify": "~1.0.0" to "slugify": "^1.0.2"

- and one more time update

```
npm update slugify
```

update from "slugify": "^1.0.2" to "slugify": "^1.6.5"

# Install and Uninstall

```
npm install express
```

```
npm uninstall express
```
