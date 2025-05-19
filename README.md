# Movie Ticketing System Demo

> 本项目为个人/课程演示用的电影票务系统 Demo，前后端分离，涵盖基础的购票业务流程。**仅供学习交流，非生产环境使用。**

---

## 技术栈与版本

- **前端**
  - [React 18.x](https://react.dev/)（核心框架）
  - [Vite 4.x](https://vitejs.dev/)（前端构建工具）
  - [Axios 1.x](https://axios-http.com/)（HTTP 客户端）
  - [Tailwind CSS 3.x](https://tailwindcss.com/)（CSS 框架）

- **后端**
  - [Java 17](https://adoptium.net/)（开发语言）
  - [Spring Boot 3.4.x](https://spring.io/projects/spring-boot)（核心框架）
  - [Spring Data JPA 3.x](https://spring.io/projects/spring-data-jpa)（ORM 持久层）
  - [Lombok 1.18.x](https://projectlombok.org/)（简化 Java 代码）
  - [MySQL 8.x](https://www.mysql.com/)（数据库）

- **容器化与部署**
  - [Docker 24.x](https://www.docker.com/)（容器化）
  - [Nginx 1.25.x](https://nginx.org/)（前端静态资源部署，生产环境推荐）

---

## 已实现的核心功能

- 用户注册、登录、JWT 鉴权
- 电影列表、电影详情、场次展示
- 购票下单（简化版，无座位选择）
- 订单列表查询，订单详情展示
- 订单支付（模拟）、取消订单
- 前后端分离，接口 RESTful 设计
- 支持本地开发与 Docker 部署

---

## 部署指南

### 一、本地开发环境部署

#### 1. 环境准备

- **后端依赖**：JDK 17+、Maven 3.8+、MySQL 8+
- **前端依赖**：Node.js 18+、npm 9+

#### 2. 数据库初始化

1. 创建数据库（如 `movie_ticket`），并导入表结构（可根据 `src/main/resources` 下的 SQL 脚本或实体自动建表）。
2. 修改 `src/main/resources/application.properties`，配置你的数据库连接信息：
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/movie_ticket?useSSL=false&serverTimezone=UTC
   spring.datasource.username=你的用户名
   spring.datasource.password=你的密码
   ```

#### 3. 启动后端服务

```bash
mvn clean package -DskipTests
java -jar target/Movie-0.0.1-SNAPSHOT.jar
```
默认端口：`8080`

#### 4. 启动前端服务

```bash
cd frontend
npm install
npm run dev
```
默认端口：`5173`

#### 5. 访问系统

- 前端：http://localhost:5173
- 后端 API：http://localhost:8080

---

### 二、Docker 部署

#### 1. 构建后端镜像

```bash
mvn clean package -DskipTests
docker build -t my-movie-backend:latest .
```

#### 2. 构建前端镜像

```bash
cd frontend
npm install
npm run build
docker build -t my-movie-frontend:latest .
```

#### 3. 运行容器

```bash
# 后端
docker run -d --name movie-backend -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://<your-mysql-host>:3306/<db-name> \
  -e SPRING_DATASOURCE_USERNAME=<db-user> \
  -e SPRING_DATASOURCE_PASSWORD=<db-password> \
  my-movie-backend:latest

# 前端
docker run -d --name movie-frontend -p 80:80 my-movie-frontend:latest
```

#### 4. 生产环境建议

- 前端静态资源建议用 Nginx 部署，并配置反向代理到后端 API。
- 数据库连接、API 地址等敏感信息请用环境变量或配置文件管理。
- 阿里云等云服务器请开放 80、8080、3306 等端口。

---

### 三、常见问题与建议

- **数据库连接失败**：请检查数据库地址、端口、用户名、密码是否正确，MySQL 是否允许远程连接。
- **端口冲突**：如本地已有服务占用 8080/80 端口，可自行修改端口映射。
- **环境变量配置**：生产环境建议通过环境变量传递敏感信息，避免硬编码。

---

## 目录结构

```
movie-ticketing-demo/
├── src/                 # 后端 Java 源码
├── frontend/            # 前端 React 源码
├── pom.xml              # 后端 Maven 配置
├── Dockerfile           # 后端 Docker 构建文件
├── README.md            # 项目说明
└── ...
```

---

## 说明与约定

- 本项目为 Demo 作业，部分功能（如支付、座位选择等）为简化实现。
- 仅供学习交流，**请勿用于生产环境**。
- 如需二次开发或生产部署，请加强安全、性能、异常处理等。

---

## 联系方式

如有建议或问题，欢迎 issue 或联系作者邮箱：**96jkbland@gmail.com**

---

> © 2025 Movie Ticketing Demo. All rights reserved. 