# Node.js 后端模板

这是一个基于 Express.js 的 Node.js 后端项目模板，采用分层架构设计，内置了完整的 CRUD 示例功能。

## 技术栈

- **Node.js** - JavaScript 运行时环境
- **Express.js** - Web 框架
- **Sequelize** - ORM 数据库操作工具
- **PostgreSQL** - 关系型数据库
- **Pino** - 高性能日志记录工具
- **CORS** - 跨域资源共享支持
- **Express Rate Limit** - API 速率限制

## 项目结构

```
template/
├── src/
│   ├── controllers/      # 控制器层 - 处理请求和响应
│   │   └── todo.controller.js
│   ├── models/           # 数据模型层 - 定义数据库表结构
│   │   └── todo.model.js
│   ├── routes/           # 路由层 - 定义 API 端点
│   │   ├── index.js
│   │   └── todo.route.js
│   ├── services/         # 服务层 - 业务逻辑处理
│   │   └── todo.service.js
│   ├── utils/            # 工具函数
│   │   ├── db.helper.js
│   │   └── logger.helper.js
│   ├── scripts/          # 脚本文件
│   │   ├── seed.js
│   │   └── data/
│   │       └── initData.json
│   ├── app.js            # Express 应用配置
│   └── server.js         # 服务器入口文件
├── logs/                 # 日志文件目录
├── .env                  # 环境变量配置
├── .gitignore
├── package.json
└── README.md
```

## 安装步骤

1. 克隆或下载项目
2. 安装依赖（使用 pnpm）：
   ```bash
   pnpm install
   ```

## 配置环境变量

复制 `.env` 文件并配置以下变量：

```env
PORT=3000
DB_HOST=your_database_host
DB_PORT=6543
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## 运行项目

开发模式运行（支持热重载）：
```bash
pnpm dev
```

服务器将在 `http://localhost:3000` 启动

## API 接口文档

基础路径：`/v1`

### Todo 接口

#### 获取 Todo 列表
```
GET /v1/todos
```

查询参数：
- `page` (可选): 页码，默认 1
- `limit` (可选): 每页数量，默认 5
- `search` (可选): 搜索关键词

#### 获取单个 Todo
```
GET /v1/todos/:todoId
```

#### 创建 Todo
```
POST /v1/todos
Content-Type: application/json

{
  "title": "示例标题",
  "description": "示例描述"
}
```

#### 更新 Todo
```
PATCH /v1/todos
Content-Type: application/json

{
  "id": 1,
  "title": "更新后的标题",
  "description": "更新后的描述"
}
```

#### 删除 Todo
```
DELETE /v1/todos/:todoId
```

#### 获取 Todo 总数
```
GET /v1/todos/count
```

查询参数：
- `search` (可选): 搜索关键词

## 功能特性

- ✅ 分层架构（Controller-Service-Model）
- ✅ RESTful API 设计
- ✅ ORM 数据库操作
- ✅ CORS 跨域支持
- ✅ API 速率限制（每秒 10 次请求）
- ✅ 结构化日志记录
- ✅ 分页查询
- ✅ 搜索功能
- ✅ 热重载开发模式

## 日志

日志文件存储在 `logs/` 目录下：
- `all-logs.log` - 所有日志
- `error.log` - 错误日志

## 数据库初始化

运行种子脚本初始化数据：
```bash
node src/scripts/seed.js
```

## License

ISC