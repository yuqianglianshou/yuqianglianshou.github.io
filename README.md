# yuqianglianshou.github.io
一个天才的个人网站  
<br/>
此情可待成追忆，只是当时已惘然。  
此情已成追忆，追忆亦是枉然。  

## 本地运行

项目使用 Jekyll 构建静态页面，使用 Node/Sass 编译样式。

项目基准版本：

- Ruby 4.0.4
- Bundler 4.x
- Node.js 18.18.0 或更高版本

### macOS

推荐使用 Homebrew 安装 Ruby 和 Node。

1. 安装命令行工具：

   ```bash
   xcode-select --install
   ```

2. 安装 Ruby 和 Node：

   ```bash
   brew install ruby node
   ```

3. 配置 Homebrew Ruby 优先级。

   Intel Mac：

   ```bash
   echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

   Apple Silicon：

   ```bash
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

4. 确认版本：

   ```bash
   which ruby
   ruby -v
   bundle -v
   node -v
   npm -v
   ```

   `ruby -v` 应显示 Ruby 4.0.4。

### Windows

推荐使用 RubyInstaller 和 Node.js 官方安装包。

1. 安装 RubyInstaller。

   下载 Ruby 4.0.x 对应的 RubyInstaller，安装时勾选 MSYS2 开发工具：

   ```text
   https://rubyinstaller.org/downloads/
   ```

   安装后打开新的 PowerShell 或 Git Bash。

2. 安装 Node.js。

   下载 Node.js LTS，版本需要 18.18.0 或更高：

   ```text
   https://nodejs.org/
   ```

3. 确认版本：

   ```bash
   ruby -v
   bundle -v
   node -v
   npm -v
   ```

   `ruby -v` 应显示 Ruby 4.0.x。项目使用 Ruby 4.0.4，补丁版本略有差异通常可以运行；若需要完全一致，安装 Ruby 4.0.4。

4. 如果 Bundler 提示 lockfile 缺少 Windows 平台，先补充平台信息：

   ```bash
   bundle lock --add-platform x64-mingw-ucrt x64-mingw32
   ```

   不要删除 `Gemfile.lock` 来解决平台差异。

### 安装依赖

拉取项目后进入目录：

```bash
git clone https://github.com/yuqianglianshou/yuqianglianshou.github.io.git
cd yuqianglianshou.github.io
```

安装依赖。推荐把 gem 安装到项目内的 `vendor/bundle`，避免污染全局环境：

```bash
npm install
bundle config set path vendor/bundle
bundle install
```

### 构建与启动

```bash
npm run build
npm run serve
```

打开：

```text
http://127.0.0.1:4000/
```

关闭服务时，在运行 `npm run serve` 的终端里按 `Ctrl + C`。

### 常用命令

```bash
npm run styles:build   # 编译 src/styles 到 css/main.css
npm run lint           # 检查 js/main.js
npm run build          # 编译样式并构建 Jekyll 静态页面
npm run serve          # 启动本地预览服务
```

### 排障

如果 Ruby 版本不对：

```bash
which ruby
ruby -v
```

macOS 上应优先指向 Homebrew Ruby，例如：

```text
/usr/local/opt/ruby/bin/ruby
```

Apple Silicon 通常是：

```text
/opt/homebrew/opt/ruby/bin/ruby
```

如果 `bundle install` 加载了其他 Ruby 版本的 gem，检查：

```bash
gem env home
gem env path
```

`gem env` 输出的路径应当和当前 Ruby 版本一致。若路径混用了其他 Ruby 版本，重新打开终端，或清理旧的 Ruby 版本管理器配置后再安装依赖。

如果端口 `4000` 被占用：

macOS：

```bash
lsof -nP -iTCP:4000 -sTCP:LISTEN
kill <PID>
```

Windows PowerShell：

```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```
