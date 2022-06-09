# Node.js Express MongoDB

1.
2.

# Dependencies

- Slugify

```
npm install slugify
```

- nodemon

<!--
npm install すると毎回再インストール必要
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

npm i bcryptjs

npm i jsonwebtoken

# Postman "No Environment" setting

## Add Environment

- VARIABLE: URL, INITIAL VALUE: http://127.0.0.1:3000/
- replace all URL from http://127.0.0.1:3000/ to {{URL}}
- Tests at "Sign up" add "pm.environment.set("jwt", pm.response.json().token);"
- Tests at "Login" add "pm.environment.set("jwt", pm.response.json().token);"
- Authorization at "Get All Tours" add Type: Bearer Token, Token: {{jwt}}

# import Dependencies

npm i nodemailer

npm i express-rate-limit

npm i helmet

npm i express-mongo-sanitize

npm i xss-clean

npm i hpp

# Security Practice <!-- 141 -->

<!-- PDF 分割ページ保存 Organize Pages 右の縦が横になるアイコン > Extract 上にあるアイコン -->

![Security Practice](/docs/security.png)

# Data Modeling <!-- 147 -->

![referencing vs embedding](/docs/referencing-vs-embedding.png)
![types of referencing](/docs/types-of-referencing.png)
![types of relationships between data](/docs/types-of-relationships-between-data.png)
![practical framework](/docs/practical-framework.png)

# Modeling Location (Geo spatial Data) <!-- 150 -->

node ./dev-data/data/import-dev-data.js --delete
node ./dev-data/data/import-dev-data.js --import

Check in your MongoDB Updated "tours"

# Setting Authorization at postman

## Bearer Token

- Get All Users
- Get User
- Update User
- Delete User
- Create New Tour
- Update Tour
- Delete Tour
- Get Monthly Plan
- Get All Reviews
- Get Review
- Create New Review
- Update Review
- Delete Review
- Create New Review on Tour
- Get All Reviews on Tour

# Inherit auth from parent

- Get All Tours
- Get tour
- Get Top 5 Cheap Tours

# Update Database with import-dev-data.js

## comment out userModel.js

- userSchema.pre('save', async function(next) { ... })
- userSchema.pre('save', function(next) { ... })

## update Terminal command

```
node ./dev-data/data/import-dev-data.js --delete
```

```
node ./dev-data/data/import-dev-data.js --import
```

## result in MongoDB same as "tours.json, users.json and reviews.json"

## remove comment out userModel.js

- userSchema.pre('save', async function(next) { ... })
- userSchema.pre('save', function(next) { ... })

# Postman setting <!-- 173 -->

## Dev: Natours

- VARIABLE: password
- INITIAL VALUE: test1234

## Prod: Natours

- VARIABLE: password
- INITIAL VALUE: test1234

### at "Login" Body can use "{{password}}" parameter
