# Anjia Yang Academic Homepage

这是一个基于 Docsify 的静态个人学术主页项目，不需要构建步骤，直接作为静态文件站点部署即可。

## 项目结构

主要文件如下：

- `index.html`
  站点入口，负责加载 Docsify、样式和脚本。

- `docs/cv.md`
  主页内容，包括 hero、About Me、Research Interests、Academic Experience、Students、Projects、Professional Activities、Reviewing。

- `publications/README.md`
  论文列表页面。

- `students/README.md`
  招生信息页面。这个页面不在顶部导航里，而是通过主页 hero 区的“招生”链接进入。

- `_navbar.md`
  顶部导航配置。

- `public/css/styles.css`
  主样式文件，绝大多数页面样式都在这里。

- `public/css/beautify.css`
  额外的模板美化样式。

- `public/js/publications.js`
  论文页的搜索、筛选和语言/样式辅助逻辑。

- `public/js/docsify-scroll-to-top.js`
  回到顶部功能。

- `public/js/progress-bar.js`
  顶部加载进度条。

- `public/img/logo.jpg`
  主页头像图片。

## 本地预览

这个项目不需要 `npm install` 或打包。

在项目根目录运行：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:4173/
```

如果改了内容或样式，浏览器直接刷新即可。样式改动建议使用强制刷新避免缓存。

## 如何修改内容

### 1. 修改主页内容

编辑：

```text
docs/cv.md
```

常见内容都在这个文件里，例如：

- `About Me`
- `Research Interests`
- `Academic Experience`
- `Students`
- `Selected Research Projects`
- `Professional Activities`
- `Reviewing`

### 2. 修改论文列表

编辑：

```text
publications/README.md
```

如果只是增删论文，通常只需要改这个文件。

### 3. 修改招生信息

编辑：

```text
students/README.md
```

主页 hero 区的“招生”链接会跳到这个页面。

### 4. 修改导航

编辑：

```text
_navbar.md
```

当前导航只保留：

- Home
- Publications

### 5. 修改头像

替换：

```text
public/img/logo.jpg
```

如果头像位置或缩放不合适，可调整：

```text
public/css/styles.css
```

搜索：

- `.hero-image img`

常改的参数有：

- `object-position`
- `transform: scale(...)`

### 6. 修改页面样式

主样式文件：

```text
public/css/styles.css
```

如果是整体视觉细节或模板附加效果，也可能在：

```text
public/css/beautify.css
```

建议优先改 `styles.css`。

## 如何部署

这是纯静态站点，部署方式很简单：把整个项目目录上传到任意静态托管平台即可。

可选平台包括：

- GitHub Pages
- Netlify
- Vercel（静态站点模式）
- Nginx / Apache
- 任意学校或实验室服务器的静态目录

### GitHub Pages

如果使用 GitHub Pages：

1. 把当前项目推到一个 GitHub 仓库
2. 在仓库设置里开启 Pages
3. 选择从仓库根目录发布

项目里已经有：

```text
.nojekyll
```

这对 GitHub Pages 是有帮助的，可以避免某些静态资源路径问题。

### 通用静态部署

如果部署到自己的服务器，只需要把以下文件和目录一起上传：

- `index.html`
- `_navbar.md`
- `docs/`
- `publications/`
- `students/`
- `public/`
- `.nojekyll`（可选）

上传后直接访问 `index.html` 所在目录即可。

## 修改后建议检查的内容

每次改动后建议本地检查：

1. 主页是否正常打开
2. `Publications` 页面筛选和搜索是否正常
3. “招生”链接是否能正确跳转到 `students/`
4. 头像、Research Interests、Students、Professional Activities 在桌面和手机宽度下是否正常

## 备注

- 这是 Docsify 站点，不是 Vue SPA，也没有构建产物目录。
- 页面内容主要是 Markdown + 少量 HTML 片段混合编写。
- 如果后续需要继续精简目录，优先检查 `public/css/beautify.css` 是否还需要保留。
