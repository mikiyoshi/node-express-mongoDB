# Node.js Express MongoDB

1.
2.

# Dependencies

- Slugify

```
npm install slugify
```

- nodemon

<!-- npm install すると毎回再インストール必要
node_modules, package-lock.json削除
動かない時は、package-lock.jsonをコピーして持ってくる
nvm install v16
npm install
npm install --save-dev nodemon
 -->

```
npm install --save-dev nodemon
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

# Setting up Prettier in VS Code

- workplace
  - Format on Save

# An Overview of How the Web Works

![Overview](/docs/client-server.png)

# HTTP in Action

- Network in devtool
  - check at `Disable Cache`

# Front-End vs Back-End Web Development

![Front and Backend](/docs/front-back-end.png)

![Static vs Dynamic](/docs/static-dynamic.png)

![Dynamic vs API](/docs/dynamic-api.png)

![API and Consumers](/docs/api-consumers.png)

# MongoDB setup

79. Using Compass App for CRUD Operations
80. Creating a Hosted Database with Atlas
81. Connecting to Our Hosted Database

82. Section Intro
83. Connecting Our Database with the Express App
84. What is Mongoose?

npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

npm i slugify

npm i validator

# 111. Debugging Node.js with ndb <!-- 重要! Debug を使ってエラーを探す方法 エラーが出たら何度もやり方を確認しよう! -->

## Chrome and VScode can edit debugging both side

npm i ndb --save-dev

- "debug": "npx ndb server.js" at package.json <!-- nvm install v16 -->
- npm run debug
