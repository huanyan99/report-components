/* @ds-bundle: {"format":4,"namespace":"Huibao","components":[{"name":"Report"},{"name":"Heading"},{"name":"Text"},{"name":"Conclusion"},{"name":"Callout"},{"name":"Quote"},{"name":"MetricCard"},{"name":"Delta"},{"name":"Progress"},{"name":"TaskItem"},{"name":"StatusTag"},{"name":"Checklist"},{"name":"CompareTable"},{"name":"BeforeAfter"},{"name":"IssueMeasure"},{"name":"Timeline"},{"name":"Milestone"},{"name":"Figure"},{"name":"Achievement"},{"name":"Section"},{"name":"Grid"},{"name":"Divider"},{"name":"Collapse"}]} */
(function () {
  "use strict";
  var R = window.React, h = R.createElement;

  function cx() {
    var a = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) a.push(arguments[i]);
    return a.join(" ");
  }

  /* 状态的固定含义：名称 + 色调。全库只有这五种状态。 */
  var STATUS = {
    done: ["已完成", "success"],
    doing: ["进行中", "accent"],
    risk: ["有风险", "warning"],
    blocked: ["受阻", "danger"],
    todo: ["未开始", "neutral"]
  };
  function st(s) { return STATUS[s] || STATUS.todo; }

  var GLYPH = {
    info: "M8 7.2v4M8 4.9v.1",
    accent: "M8 7.2v4M8 4.9v.1",
    success: "M5 8.3l2 2 4-4.3",
    warning: "M8 4.6v3.8M8 11v.1",
    danger: "M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4",
    neutral: "M8 7.2v4M8 4.9v.1"
  };
  function Glyph(tone) {
    return h("svg", { className: "hb-glyph", viewBox: "0 0 16 16", "aria-hidden": true },
      h("circle", { cx: 8, cy: 8, r: 7.5 }),
      h("path", { d: GLYPH[tone] || GLYPH.info }));
  }

  /* ───── 组织 ───── */

  function Report(p) {
    return h("div", {
      className: cx("hb-root", "hb-report", p.density === "compact" ? "hb-compact" : "hb-comfortable",
        p.padded === false && "hb-report-flush", p.className)
    },
      (p.title || p.eyebrow) ? h("header", { className: "hb-report-head" },
        p.eyebrow ? h("div", { className: "hb-eyebrow" }, p.eyebrow) : null,
        p.title ? h("h1", { className: "hb-display" }, p.title) : null,
        p.description ? h("p", { className: "hb-report-desc" }, p.description) : null) : null,
      p.children);
  }

  function Section(p) {
    var card = p.variant === "card";
    return h("section", { className: cx("hb-section", card && "hb-card hb-section-card", p.className) },
      (p.title || p.extra) ? h("div", { className: "hb-section-head" },
        h("div", { className: "hb-section-titles" },
          p.title ? h("h3", { className: "hb-section-title" }, p.title) : null,
          p.description ? h("p", { className: "hb-section-desc" }, p.description) : null),
        p.extra ? h("div", { className: "hb-section-extra" }, p.extra) : null) : null,
      h("div", { className: cx("hb-section-body", p.layout === "list" ? "hb-list" : "hb-stack") }, p.children));
  }

  function Grid(p) {
    var n = p.columns || 2;
    return h("div", { className: cx("hb-grid", "hb-grid-" + n, p.className) }, p.children);
  }

  function Divider(p) {
    if (!p.label) return h("hr", { className: "hb-divider" });
    return h("div", { className: "hb-divider hb-divider-label", role: "separator" }, h("span", null, p.label));
  }

  function Collapse(p) {
    return h("details", { className: cx("hb-collapse", p.className), open: !!p.defaultOpen },
      h("summary", null,
        h("span", { className: "hb-collapse-titles" },
          h("span", { className: "hb-collapse-title" }, p.title),
          p.summary ? h("span", { className: "hb-collapse-summary" }, p.summary) : null),
        h("svg", { className: "hb-collapse-chev", viewBox: "0 0 16 16", "aria-hidden": true }, h("path", { d: "M4 6l4 4 4-4" }))),
      h("div", { className: "hb-collapse-body" }, p.children));
  }

  /* ───── 文字 ───── */

  function Heading(p) {
    var l = p.level || 1;
    if (l < 1) l = 1; if (l > 3) l = 3;
    return h("div", { className: cx("hb-heading", "hb-heading-" + l, p.className) },
      p.eyebrow ? h("div", { className: "hb-eyebrow" }, p.eyebrow) : null,
      h("h" + (l + 1), { className: "hb-t" + l }, p.children),
      p.description ? h("p", { className: "hb-heading-desc" }, p.description) : null);
  }

  function Text(p) {
    var v = p.variant || "body";
    return h("p", { className: cx("hb-text", "hb-text-" + v, p.className) }, p.children);
  }

  /* ───── 重点 ───── */

  function Conclusion(p) {
    return h("section", { className: cx("hb-conclusion", p.emphasis === "strong" && "is-strong", p.className) },
      h("div", { className: "hb-conclusion-label" }, p.label || "结论"),
      p.title ? h("div", { className: "hb-conclusion-title" }, p.title) : null,
      p.points && p.points.length ? h("ul", { className: "hb-bullets" },
        p.points.map(function (t, i) { return h("li", { key: i }, t); })) : null,
      p.children ? h("div", { className: "hb-conclusion-body" }, p.children) : null);
  }

  function Callout(p) {
    var tone = p.tone || "info";
    return h("div", { className: cx("hb-callout", "hb-tone-" + tone, p.className), role: "note" },
      Glyph(tone),
      h("div", { className: "hb-callout-main" },
        p.title ? h("div", { className: "hb-callout-title" }, p.title) : null,
        p.children ? h("div", { className: "hb-callout-body" }, p.children) : null));
  }

  function Quote(p) {
    return h("figure", { className: cx("hb-quote", p.className) },
      h("blockquote", null, p.children),
      p.source ? h("figcaption", null, p.source) : null);
  }

  /* ───── 数据 ───── */

  function Delta(p) {
    var v = Number(p.value) || 0;
    var suf = p.suffix == null ? "%" : p.suffix;
    var good = p.goodWhen || "up";
    var dir = v > 0 ? "up" : v < 0 ? "down" : "flat";
    var tone = dir === "flat" || good === "none" ? "neutral" : (dir === good ? "success" : "danger");
    var sign = dir === "up" ? "+" : dir === "down" ? "−" : "";
    return h("span", { className: cx("hb-delta", "hb-tone-" + tone, p.className) },
      h("span", { className: "hb-delta-val" },
        dir !== "flat" ? h("svg", { className: "hb-delta-arrow", viewBox: "0 0 10 10", "aria-hidden": true },
          h("path", { d: dir === "up" ? "M5 1.5L9 7.5H1z" : "M5 8.5L1 2.5h8z" })) : null,
        sign + Math.abs(v) + (suf && !/^[%‰]/.test(suf) ? " " + suf : suf)),
      p.label ? h("span", { className: "hb-delta-label" }, p.label) : null);
  }

  function MetricCard(p) {
    return h("div", { className: cx("hb-card", "hb-metric", p.emphasis === "strong" && "is-strong", p.className) },
      h("div", { className: "hb-metric-label" }, p.label),
      h("div", { className: "hb-metric-value" },
        h("span", { className: "hb-metric-num" }, p.value),
        p.unit ? h("span", { className: "hb-metric-unit" }, p.unit) : null),
      p.delta != null ? h(Delta, { value: p.delta, label: p.deltaLabel, goodWhen: p.goodWhen, suffix: p.deltaSuffix }) : null,
      p.description ? h("div", { className: "hb-metric-desc" }, p.description) : null);
  }

  function Progress(p) {
    var max = p.max || 100;
    var v = Math.max(0, Math.min(max, Number(p.value) || 0));
    var pct = Math.round(v / max * 100);
    var tone = p.tone || "accent";
    var showVal = p.showValue !== false;
    return h("div", { className: cx("hb-progress", "hb-tone-" + tone, p.className) },
      (p.label || showVal) ? h("div", { className: "hb-progress-head" },
        h("span", { className: "hb-progress-label" }, p.label),
        showVal ? h("span", { className: "hb-progress-val" }, p.valueText || pct + "%") : null) : null,
      h("div", {
        className: "hb-progress-track", role: "progressbar",
        "aria-valuenow": v, "aria-valuemin": 0, "aria-valuemax": max, "aria-label": p.label || "进度"
      }, h("div", { className: "hb-progress-bar", style: { width: pct + "%" } })),
      p.description ? h("div", { className: "hb-progress-desc" }, p.description) : null);
  }

  /* ───── 事项 ───── */

  function StatusTag(p) {
    var s = st(p.status);
    return h("span", { className: cx("hb-tag", "hb-tone-" + (p.tone || s[1]), p.className) },
      h("span", { className: "hb-tag-dot", "aria-hidden": true }),
      p.children || s[0]);
  }

  function TaskItem(p) {
    return h("div", { className: cx("hb-task", p.className) },
      h("div", { className: "hb-task-main" },
        h("div", { className: "hb-task-title" }, p.title),
        p.description ? h("div", { className: "hb-task-desc" }, p.description) : null,
        (p.owner || p.due) ? h("div", { className: "hb-task-meta" },
          p.owner ? h("span", null, p.owner) : null,
          p.due ? h("span", null, p.due) : null) : null),
      p.status ? h(StatusTag, { status: p.status }) : null);
  }

  function Checklist(p) {
    var items = p.items || [];
    var done = items.filter(function (i) { return i.done; }).length;
    return h("div", { className: cx("hb-checklist", p.className) },
      p.title ? h("div", { className: "hb-checklist-head" },
        h("span", { className: "hb-checklist-title" }, p.title),
        h("span", { className: "hb-checklist-count" }, done + " / " + items.length)) : null,
      h("ul", null, items.map(function (it, i) {
        return h("li", { key: i, className: it.done ? "is-done" : "" },
          h("span", { className: "hb-check", "aria-hidden": true },
            it.done ? h("svg", { viewBox: "0 0 16 16" }, h("path", { d: "M4 8.4l2.6 2.6L12 5.4" })) : null),
          h("span", { className: "hb-check-text" },
            h("span", { className: "hb-sr" }, it.done ? "已完成：" : "未完成："),
            it.text,
            it.note ? h("span", { className: "hb-check-note" }, it.note) : null));
      })));
  }

  /* ───── 分析 ───── */

  function CompareTable(p) {
    var cols = p.columns || [], hl = p.highlight;
    return h("div", { className: cx("hb-table-wrap", p.className) },
      h("table", { className: "hb-table" },
        p.caption ? h("caption", null, p.caption) : null,
        h("thead", null, h("tr", null, cols.map(function (c, i) {
          return h("th", { key: i, scope: "col", className: i > 0 && i - 1 === hl ? "is-hl" : "" }, c);
        }))),
        h("tbody", null, (p.rows || []).map(function (r, ri) {
          return h("tr", { key: ri },
            h("th", { scope: "row" }, r.label),
            (r.values || []).map(function (v, vi) {
              return h("td", { key: vi, className: vi === hl ? "is-hl" : "" }, v);
            }));
        }))));
  }

  function BAPane(x, kind, dl) {
    x = x || {};
    return h("div", { className: "hb-ba-pane is-" + kind },
      h("div", { className: "hb-ba-label" }, x.label || dl),
      x.title ? h("div", { className: "hb-ba-title" }, x.title) : null,
      x.items ? h("ul", { className: "hb-bullets" }, x.items.map(function (t, i) { return h("li", { key: i }, t); })) : null,
      x.content || null);
  }
  function BeforeAfter(p) {
    return h("div", { className: cx("hb-ba", p.className) },
      BAPane(p.before, "before", "之前"),
      h("div", { className: "hb-ba-arrow", "aria-hidden": true },
        h("svg", { viewBox: "0 0 24 24" }, h("path", { d: "M5 12h13M13 6l6 6-6 6" }))),
      BAPane(p.after, "after", "之后"));
  }

  function IssueMeasure(p) {
    return h("div", { className: cx("hb-im", p.className) },
      h("div", { className: "hb-im-row hb-im-headrow", "aria-hidden": true },
        h("div", null, "问题"), h("div", null, "措施"), h("div", null, "状态")),
      (p.items || []).map(function (it, i) {
        var n = i + 1;
        return h("div", { key: i, className: "hb-im-row" },
          h("div", { className: "hb-im-issue" },
            h("span", { className: "hb-im-idx" }, n < 10 ? "0" + n : String(n)),
            h("div", null,
              h("div", { className: "hb-im-text" }, it.issue),
              it.cause ? h("div", { className: "hb-im-sub" }, "原因：" + it.cause) : null)),
          h("div", { className: "hb-im-measure" },
            h("div", { className: "hb-im-text" }, it.measure),
            (it.owner || it.due) ? h("div", { className: "hb-im-sub" }, [it.owner, it.due].filter(Boolean).join(" · ")) : null),
          h("div", { className: "hb-im-status" }, it.status ? h(StatusTag, { status: it.status }) : null));
      }));
  }

  /* ───── 时间 ───── */

  function Timeline(p) {
    return h("ol", { className: cx("hb-timeline", p.className) }, (p.items || []).map(function (it, i) {
      var tone = it.status ? st(it.status)[1] : "neutral";
      return h("li", { key: i, className: cx("hb-tl-item", "hb-tone-" + tone, it.status === "doing" && "is-current") },
        h("div", { className: "hb-tl-time" }, it.time),
        h("div", { className: "hb-tl-rail", "aria-hidden": true }, h("span", { className: "hb-tl-dot" })),
        h("div", { className: "hb-tl-body" },
          h("div", { className: "hb-tl-title" }, h("span", null, it.title), it.status ? h(StatusTag, { status: it.status }) : null),
          it.description ? h("div", { className: "hb-tl-desc" }, it.description) : null));
    }));
  }

  function Milestone(p) {
    var items = p.items || [];
    return h("ol", { className: cx("hb-ms", p.className), style: { "--hb-ms-n": items.length } },
      items.map(function (it, i) {
        var key = it.status || "todo", s = st(key);
        return h("li", { key: i, className: "hb-ms-item hb-tone-" + s[1] + " is-" + key },
          h("span", { className: "hb-ms-node", "aria-hidden": true }),
          h("div", { className: "hb-ms-date" }, it.date),
          h("div", { className: "hb-ms-title" }, it.title),
          h("div", { className: "hb-ms-status" }, s[0]));
      }));
  }

  /* ───── 展示 ───── */

  function Figure(p) {
    return h("figure", { className: cx("hb-figure", p.className) },
      h("div", { className: "hb-figure-frame", style: p.ratio ? { aspectRatio: p.ratio } : null },
        p.src ? h("img", { src: p.src, alt: p.alt || "" }) : (p.children || h("div", { className: "hb-figure-empty" }, "图片"))),
      (p.caption || p.source) ? h("figcaption", null,
        p.caption ? h("span", { className: "hb-figure-cap" }, p.caption) : null,
        p.source ? h("span", { className: "hb-figure-src" }, p.source) : null) : null);
  }

  function Achievement(p) {
    return h("div", { className: cx("hb-card", "hb-achv", p.emphasis === "strong" && "is-strong", p.className) },
      p.media ? h("div", { className: "hb-achv-media" }, p.media) : null,
      h("div", { className: "hb-achv-body" },
        p.label ? h("div", { className: "hb-eyebrow" }, p.label) : null,
        h("div", { className: "hb-achv-title" }, p.title),
        p.highlight ? h("div", { className: "hb-achv-hl" }, p.highlight) : null,
        p.description ? h("div", { className: "hb-achv-desc" }, p.description) : null,
        p.tags && p.tags.length ? h("div", { className: "hb-achv-tags" },
          p.tags.map(function (t, i) { return h("span", { key: i, className: "hb-chip" }, t); })) : null));
  }

  var api = {
    Report: Report, Heading: Heading, Text: Text,
    Conclusion: Conclusion, Callout: Callout, Quote: Quote,
    MetricCard: MetricCard, Delta: Delta, Progress: Progress,
    TaskItem: TaskItem, StatusTag: StatusTag, Checklist: Checklist,
    CompareTable: CompareTable, BeforeAfter: BeforeAfter, IssueMeasure: IssueMeasure,
    Timeline: Timeline, Milestone: Milestone,
    Figure: Figure, Achievement: Achievement,
    Section: Section, Grid: Grid, Divider: Divider, Collapse: Collapse,
    STATUS: STATUS
  };
  window.Huibao = window.Huibao || {};
  Object.assign(window.Huibao, api);
})();
