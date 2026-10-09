# Report 汇报页

整份汇报的根容器：页面底色、外边距、总标题，以及**密度**。

- `title`、`eyebrow`（如「2026 年 10 月 · 网络工程组」）、`description`。
- `density`：`comfortable`（默认，展示用：卡片内边距 24px、组件间距 24px、正文行高 26px）或 `compact`（长内容阅读：16px、16px、24px）。字号两档相同。
- `padded={false}` 去掉底色和外边距，用于嵌进别的页面。
- 所有组件都应放在 `Report` 里（或带 `hb-root` 类的元素里），密度和变量才会生效。
