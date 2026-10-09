# 汇报组件库

一套可自由组合的汇报内容组件：Apple 式的精致与克制，飞书式的清晰排版。浅色背景、一种强调色、靠留白和细边框分层——既适合投屏展示，也适合大段阅读。

## 怎么组合一份汇报

一份汇报 = 一个 `Report`，里面按「结论先行」从上往下排：

1. **总结论**：`Conclusion emphasis="strong"`，一页只有一个。
2. **关键数字**：`Grid` 里放 2–4 个 `MetricCard`，只强调最重要的一个。
3. **进展与事项**：`Section` 分组，内放 `Progress`、`TaskItem`（`layout="list"`）、`Checklist`。
4. **分析**：`CompareTable`、`BeforeAfter`、`IssueMeasure`。
5. **过程**：`Timeline` 或 `Milestone`。
6. **成果与佐证**：`Achievement`、`Figure`。
7. **明细**：放进 `Collapse`，主线保持精简。

```jsx
const { Report, Conclusion, Grid, MetricCard, Section, TaskItem } = window.Huibao;

<Report eyebrow="2026 年 10 月 · 网络工程组" title="湖州项目月度汇报" density="comfortable">
  <Conclusion emphasis="strong" title="整体进度可控，弱电间交付需协调"
    points={['核心网络已上线，整体进度 78%', '3 号楼弱电间预计延后 7 天']} />
  <Grid columns={3}>
    <MetricCard label="整体进度" value="78" unit="%" delta={6} deltaLabel="较上月" emphasis="strong" />
    <MetricCard label="已验收点位" value="1,286" delta={12.4} deltaLabel="较上月" />
    <MetricCard label="未关闭故障" value="7" delta={-3} deltaSuffix="项" goodWhen="down" />
  </Grid>
  <Section variant="card" layout="list" title="本周事项">
    <TaskItem title="办公区无线覆盖" owner="李工" due="10 月 15 日" status="doing" />
  </Section>
</Report>
```

## 共用的组件接口

每个组件按需支持同一组属性，名字和含义全库一致：

| 属性 | 含义 |
|---|---|
| `title` | 组件的标题或核心一句话 |
| `children` / `items` / `points` | 内容 |
| `description` / `caption` / `note` | 说明文字（14px 或 13px，次色） |
| `status` | 五种固定状态之一：`done` `doing` `risk` `blocked` `todo` |
| `tone` | 色调：`accent`(=`info`) `success` `warning` `danger` `neutral` |
| `emphasis` | 强调程度：`default` 或 `strong`（浅蓝底、16px 圆角） |

## 视觉基础

**配色。** 白色 `bg-surface`、浅灰 `bg-page` / `bg-subtle`、深灰 `text-primary` / `text-secondary` 是基础；`accent`（#0066cc）是唯一的强调色，一屏里只给最值得看的一两处。辅助文字最浅只到 `text-tertiary`（页面底色上 4.9:1）。

**状态色有固定含义，不做装饰：**

| 状态 | 色 | 用在 |
|---|---|---|
| 已完成 `done` | `success` 绿 | 已验收、向好的变化 |
| 进行中 `doing` | `accent` 蓝 | 正常推进、当前节点 |
| 有风险 `risk` | `warning` 橙 | 可能延期，需要关注 |
| 受阻 `blocked` | `danger` 红 | 已停滞、变差的变化 |
| 未开始 `todo` | 中性灰 | 尚未启动 |

变化指标（`Delta`）的颜色表示**好坏**而非涨跌：故障数下降是绿色。每个状态同时有文字或图形，不只靠颜色区分。

**圆角。** 默认 `radius-md` 12px（卡片、表格、提示、图片）；重点卡片 `radius-lg` 16px（强调结论、强调指标、成果卡）；标签 `radius-sm` 6px；进度条和圆点为全圆。

**排版。** 系统字体（苹方 / SF / 微软雅黑）。正文 16px / 26px 行高；说明 14px，最小 13px；标题 17 / 20 / 24px，总标题 32px，指标数字 36px，统一字重 600。数字用等宽数字。

**间距。** 只用 8、12、16、24、32 五档（`space-1` 到 `space-5`）。

**层次。** 靠留白、底色差（灰底上的白卡片）和 1px 细边框分层。卡片不加阴影；`shadow-popover` 只给浮层。卡片里不再套卡片。

**密度。** `Report` 的 `density` 控制两档，字号不变：

| | 舒适 `comfortable` | 紧凑 `compact` |
|---|---|---|
| 用途 | 投屏展示 | 长内容阅读、书面汇报 |
| 卡片内边距 | 24px | 16px |
| 组件间距 | 24px | 16px |
| 正文行高 | 26px | 24px |
| 列表行距 | 12px | 8px |

## 写作要求

- 结论先行：每个部分第一句是判断，不是背景。
- 标题写判断或主题，避免「关于××情况的汇报」。
- 数字带单位和对比口径（「较上月」）；说明文字解释口径。
- 状态只用五种，文字可改（「已上线」），颜色不改。

## 图标与图片

组件内的小图形（提示图标、勾选、箭头、折叠箭头）都是组件自带的简单线条，跟随色调。没有品牌标志与插画：内容图片通过 `Figure` 和 `Achievement` 的 `media` 放入。

## 迭代顺序

第一版优先打磨：文字、结论、指标、事项、对比表、时间线。其余组件已可用，后续按实际汇报的使用情况补充变体。

## 仓库结构与使用

```
index.html              组件总览页（含舒适 / 紧凑切换），直接用浏览器打开
tokens.json             设计令牌（颜色、字号、间距、圆角、阴影）——唯一来源
tokens.css              由 tokens.json 生成的 CSS 变量
components/bundle.js    全部组件，挂在 window.Huibao 上（依赖 React 18）
components/bundle.css   组件样式，只引用 tokens.css 的变量
components/index.d.ts   组件属性类型
docs/components/*.md    每个组件的使用说明
```

在任意页面中使用：

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>
```
