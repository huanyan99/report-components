# Progress 进度条

完成程度。`value`（默认满分 100，可设 `max`）、`label`、`description`。

- `tone` 跟着状态走：`accent`（进行中，默认）、`success`（已完成）、`warning`（有风险）、`danger`（受阻）。
- `valueText` 可替换右侧百分比，如「32 / 40 项」。
- 多条进度并列时放进 `Section`，保持标签长度相近。
