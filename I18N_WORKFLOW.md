# i18n 自动翻译工作流（中文主源）

以后只维护 `i18n.js` 里的 `STRINGS.zh`，再自动生成 `en/fr`。

## 1) 前置条件

- 本机可用 Node.js（建议 18+）
- 有 DeepL API Key（Free 或 Pro 都可）

## 2) 设置 API Key（PowerShell）

```powershell
$env:DEEPL_AUTH_KEY="你的_deepl_key"
```

可选（默认已是免费接口地址）：

```powershell
$env:DEEPL_API_URL="https://api-free.deepl.com/v2/translate"
```

## 3) 只改中文文案

编辑 `i18n.js` 中的：

- `STRINGS.zh.xxx = "..."`

不要手改 `en` / `fr`，让脚本覆盖更新。

## 4) 运行自动翻译

在项目根目录执行：

```powershell
node scripts/sync-i18n-from-zh.mjs
```

执行后会自动把 `en` 与 `fr` 对齐为和 `zh` 相同 key 集合，并翻译中文内容。

## 5) 建议流程

1. 先改中文。
2. 运行脚本生成英文/法文。
3. 人工抽查关键标题（品牌名、项目名、按钮文案）。
4. 提交改动。

## 说明

- 纯 ASCII 文案默认不翻译，直接沿用原文（例如品牌名、英文缩写、邮箱占位符）。
- 如果你后续想把翻译源从 DeepL 换成 OpenAI/其他服务，也可以在 `scripts/sync-i18n-from-zh.mjs` 的 `translateText()` 里替换实现。

## 当前语言选择优先级

`?lang=` URL 参数 > 本地存储 `iss-site-locale` > 浏览器语言（`navigator.language`）> `zh`

例如：

- `index.html?lang=en#welcome`
- `devlog.html?lang=fr`

## 页面分组（可选）

现在 `i18n.js` 已支持 `body data-page` 页面标识：

- 首页：`<body data-page="index">`
- devlog：`<body data-page="devlog">`

对应可在 `i18n.js` 的 `PAGE_STRINGS` 中按页面覆写（同 key 会覆盖全局 `STRINGS`）：

```js
PAGE_STRINGS.index.zh.someKey = "仅首页文案";
PAGE_STRINGS.devlog.fr.someKey = "Texte uniquement pour devlog";
```

## 以后怎么新增日志（最简）

只改两处：

1. 在 `devlog.html` 里给 `DEVLOG_ENTRIES` 追加一条（链接和顺序）：

```js
{
  id: "devlog3",
  titleKey: "devlog3Title",
  dateKey: "devlog3Date",
  excerptKey: "devlog3Excerpt",
  links: { en: "devlog-03-en.html", zh: "devlog-03-zh.html", fr: "devlog-03-en.html" }
}
```

2. 在 `i18n.js` 的 `STRINGS.zh` 新增：

- `devlog3Title`
- `devlog3Date`
- `devlog3Excerpt`

然后运行自动翻译脚本刷新 `en/fr` 即可。  
页面左侧时间轴和右侧正文会自动一起更新，无需再手写两份 HTML。
