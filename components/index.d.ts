import type * as React from 'react';

/** 五种固定状态 */
export type Status = 'done' | 'doing' | 'risk' | 'blocked' | 'todo';
/** 色调：accent 与 info 同为蓝色 */
export type Tone = 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type Emphasis = 'default' | 'strong';

// 组织
export interface ReportProps { title?: React.ReactNode; eyebrow?: React.ReactNode; description?: React.ReactNode; density?: 'comfortable' | 'compact'; padded?: boolean; className?: string; children?: React.ReactNode }
export declare function Report(props: ReportProps): React.ReactElement;
export interface SectionProps { title?: React.ReactNode; description?: React.ReactNode; extra?: React.ReactNode; variant?: 'plain' | 'card'; layout?: 'stack' | 'list'; className?: string; children?: React.ReactNode }
export declare function Section(props: SectionProps): React.ReactElement;
export interface GridProps { columns?: 2 | 3 | 4; className?: string; children?: React.ReactNode }
export declare function Grid(props: GridProps): React.ReactElement;
export interface DividerProps { label?: React.ReactNode }
export declare function Divider(props: DividerProps): React.ReactElement;
export interface CollapseProps { title: React.ReactNode; summary?: React.ReactNode; defaultOpen?: boolean; className?: string; children?: React.ReactNode }
export declare function Collapse(props: CollapseProps): React.ReactElement;

// 文字
export interface HeadingProps { level?: 1 | 2 | 3; eyebrow?: React.ReactNode; description?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Heading(props: HeadingProps): React.ReactElement;
export interface TextProps { variant?: 'body' | 'secondary' | 'caption'; className?: string; children?: React.ReactNode }
export declare function Text(props: TextProps): React.ReactElement;

// 重点
export interface ConclusionProps { title?: React.ReactNode; label?: React.ReactNode; points?: React.ReactNode[]; emphasis?: Emphasis; className?: string; children?: React.ReactNode }
export declare function Conclusion(props: ConclusionProps): React.ReactElement;
export interface CalloutProps { tone?: 'info' | 'success' | 'warning' | 'danger'; title?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Callout(props: CalloutProps): React.ReactElement;
export interface QuoteProps { source?: React.ReactNode; className?: string; children?: React.ReactNode }
export declare function Quote(props: QuoteProps): React.ReactElement;

// 数据
export interface DeltaProps { value: number; suffix?: string; goodWhen?: 'up' | 'down' | 'none'; label?: React.ReactNode; className?: string }
export declare function Delta(props: DeltaProps): React.ReactElement;
export interface MetricCardProps { label: React.ReactNode; value: React.ReactNode; unit?: React.ReactNode; delta?: number; deltaLabel?: React.ReactNode; deltaSuffix?: string; goodWhen?: 'up' | 'down' | 'none'; description?: React.ReactNode; emphasis?: Emphasis; className?: string }
export declare function MetricCard(props: MetricCardProps): React.ReactElement;
export interface ProgressProps { value: number; max?: number; label?: React.ReactNode; description?: React.ReactNode; tone?: 'accent' | 'success' | 'warning' | 'danger'; showValue?: boolean; valueText?: React.ReactNode; className?: string }
export declare function Progress(props: ProgressProps): React.ReactElement;

// 事项
export interface StatusTagProps { status?: Status; tone?: Tone; className?: string; children?: React.ReactNode }
export declare function StatusTag(props: StatusTagProps): React.ReactElement;
export interface TaskItemProps { title: React.ReactNode; description?: React.ReactNode; owner?: React.ReactNode; due?: React.ReactNode; status?: Status; className?: string }
export declare function TaskItem(props: TaskItemProps): React.ReactElement;
export interface ChecklistItem { text: React.ReactNode; done?: boolean; note?: React.ReactNode }
export interface ChecklistProps { title?: React.ReactNode; items: ChecklistItem[]; className?: string }
export declare function Checklist(props: ChecklistProps): React.ReactElement;

// 分析
export interface CompareRow { label: React.ReactNode; values: React.ReactNode[] }
export interface CompareTableProps { columns: React.ReactNode[]; rows: CompareRow[]; highlight?: number; caption?: React.ReactNode; className?: string }
export declare function CompareTable(props: CompareTableProps): React.ReactElement;
export interface BeforeAfterSide { label?: React.ReactNode; title?: React.ReactNode; items?: React.ReactNode[]; content?: React.ReactNode }
export interface BeforeAfterProps { before: BeforeAfterSide; after: BeforeAfterSide; className?: string }
export declare function BeforeAfter(props: BeforeAfterProps): React.ReactElement;
export interface IssueMeasureItem { issue: React.ReactNode; cause?: string; measure: React.ReactNode; owner?: string; due?: string; status?: Status }
export interface IssueMeasureProps { items: IssueMeasureItem[]; className?: string }
export declare function IssueMeasure(props: IssueMeasureProps): React.ReactElement;

// 时间
export interface TimelineItem { time: React.ReactNode; title: React.ReactNode; description?: React.ReactNode; status?: Status }
export interface TimelineProps { items: TimelineItem[]; className?: string }
export declare function Timeline(props: TimelineProps): React.ReactElement;
export interface MilestoneItem { date: React.ReactNode; title: React.ReactNode; status?: Status }
export interface MilestoneProps { items: MilestoneItem[]; className?: string }
export declare function Milestone(props: MilestoneProps): React.ReactElement;

// 展示
export interface FigureProps { src?: string; alt?: string; caption?: React.ReactNode; source?: React.ReactNode; ratio?: string; className?: string; children?: React.ReactNode }
export declare function Figure(props: FigureProps): React.ReactElement;
export interface AchievementProps { title: React.ReactNode; label?: React.ReactNode; highlight?: React.ReactNode; description?: React.ReactNode; tags?: React.ReactNode[]; media?: React.ReactNode; emphasis?: Emphasis; className?: string }
export declare function Achievement(props: AchievementProps): React.ReactElement;

declare global {
  interface Window {
    Huibao: {
      Report: typeof Report; Heading: typeof Heading; Text: typeof Text;
      Conclusion: typeof Conclusion; Callout: typeof Callout; Quote: typeof Quote;
      MetricCard: typeof MetricCard; Delta: typeof Delta; Progress: typeof Progress;
      TaskItem: typeof TaskItem; StatusTag: typeof StatusTag; Checklist: typeof Checklist;
      CompareTable: typeof CompareTable; BeforeAfter: typeof BeforeAfter; IssueMeasure: typeof IssueMeasure;
      Timeline: typeof Timeline; Milestone: typeof Milestone;
      Figure: typeof Figure; Achievement: typeof Achievement;
      Section: typeof Section; Grid: typeof Grid; Divider: typeof Divider; Collapse: typeof Collapse;
    };
  }
}
