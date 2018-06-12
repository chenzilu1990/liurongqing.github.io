---
title: .gitignore 文件详解
---
```json
# 根路径下的 node_modules 目录被忽略
/node_modules

# 所有 node_modules 目录都被忽略
node_modules

# 忽略所有以 .js 结尾的文件
*.js

# 但 index.js 例外
!index.js

# 忽略 docs 下所有 .js 文件，但不包括 docs/db/index.js
docs/*.js

# 忽略 docs 下所有 .js 文件
docs/**/*.js

# 忽略 conf 目录
conf/*

# 但不忽略 conf 下的 index.js 文件
!conf/index.js
```