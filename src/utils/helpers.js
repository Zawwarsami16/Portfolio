// helpers.js — small utility functions used across components

export const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', 'C++': '#f34b7d', Java: '#b07219',
  Rust: '#dea584', Go: '#00ADD8', Ruby: '#701516', PHP: '#4F5D95',
  Swift: '#ffac45', Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89e051',
  Vue: '#41b883', Svelte: '#ff3e00', default: '#6e7681',
}

export function langColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const m = 60_000, h = 3_600_000, d = 86_400_000
  if (diff < m * 2)  return 'just now'
  if (diff < h)      return `${Math.floor(diff / m)}m ago`
  if (diff < d)      return `${Math.floor(diff / h)}h ago`
  return                    `${Math.floor(diff / d)}d ago`
}

export const EVENT_ICONS = {
  PushEvent:         '↑',
  CreateEvent:       '✦',
  WatchEvent:        '★',
  ForkEvent:         '⑂',
  PullRequestEvent:  '⇌',
  IssueCommentEvent: '◎',
  ReleaseEvent:      '◈',
  IssuesEvent:       '⊙',
  DeleteEvent:       '×',
}
export function eventIcon(type) { return EVENT_ICONS[type] || '·' }
export function eventLabel(type) { return type.replace('Event', '') }
