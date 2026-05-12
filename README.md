# yuqianglianshou.github.io
一个天才的个人网站  
<br/>
此情可待成追忆，只是当时已惘然。  
此情已成追忆，追忆亦是枉然。  

## 本地运行

项目使用 Jekyll 构建页面，同时使用 Node 工具编译样式和检查脚本。

需要先安装：

- Ruby 2.6.3
- Bundler 2.4.19
- Node.js 18.18.0 或更高版本

拉取项目后进入目录：

```bash
git clone https://github.com/yuqianglianshou/yuqianglianshou.github.io.git
cd yuqianglianshou.github.io
```

安装 Node 依赖：

```bash
npm install
```

安装 Ruby 依赖。推荐把 gem 安装到项目内的 `vendor/bundle`，避免污染全局环境：

```bash
gem install bundler -v 2.4.19
bundle config set path vendor/bundle
bundle _2.4.19_ install
```

启动本地服务：

```bash
npm run serve
```

打开：

```text
http://127.0.0.1:4000/
```

关闭服务时，在运行 `npm run serve` 的终端里按 `Ctrl + C`。

如果端口被占用，可以先查看占用进程：

```bash
lsof -nP -iTCP:4000 -sTCP:LISTEN
```

然后关闭对应 PID：

```bash
kill <PID>
```

常用命令：

```bash
npm run styles:build   # 编译样式
npm run lint           # 检查 js/main.js
npm run build          # 编译样式并构建 Jekyll 静态页面
npm run serve          # 启动本地预览服务
```
