// Ported from includes/sidebar.php's $drawerItems array.
export const drawerItems = [
  { icon: '🏠', label: 'Dashboard', href: '/' },
  { icon: '👥', label: 'Members', href: '/members' },
  { icon: '✅', label: 'Attendance', href: '/attendance' },
  { icon: '📅', label: 'Events & Activities', href: '/events' },
  { icon: '🕑', label: 'Sabbath Times', href: '/sabbath-times' },
  { icon: '💬', label: 'Connect with Pastor', href: '/connect-pastor' },
  { icon: '🗣️', label: 'Community', href: '/community' },
  { icon: '📍', label: 'Find Church', href: '/find-church' },
  { icon: '🖼️', label: 'Gallery', href: '/gallery' },
  { icon: '📖', label: 'Bible', href: '/bible' },
  { icon: '📚', label: 'Books', href: '/books' },
  { icon: '🧭', label: 'Pathfinders', href: '/pathfinders' },
  { icon: '💰', label: 'Church Budget', href: '/church-budget' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
];

// Subset shown on the mobile bottom nav bar.
export const bottomNavItems = [
  { icon: '🏠', label: 'Home', href: '/' },
  { icon: '👥', label: 'Members', href: '/members' },
  { icon: '📅', label: 'Events', href: '/events' },
  { icon: '🗣️', label: 'Community', href: '/community' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
];

// Ported from pages/dashboard.php's $features array.
export const dashboardFeatures = [
  { icon: '👥', label: 'Members', href: '/members' },
  { icon: '✅', label: 'Attendance', href: '/attendance' },
  { icon: '📖', label: 'Bible', href: '/bible' },
  { icon: '📚', label: 'Books', href: '/books' },
  { icon: '💬', label: 'Connect Pastor', href: '/connect-pastor' },
  { icon: '📍', label: 'Find Church', href: '/find-church' },
  { icon: '📅', label: 'Events', href: '/events' },
  { icon: '🕑', label: 'Sabbath Times', href: '/sabbath-times' },
  { icon: '🗣️', label: 'Community', href: '/community' },
  { icon: '🌐', label: 'Website', href: '/website' },
  { icon: '💰', label: 'Church Budget', href: '/church-budget' },
];

// Ported from admin/dashboard.php's $sections array.
export const adminSections = [
  { icon: '👥', label: 'Members', href: '/admin/members' },
  { icon: '✅', label: 'Attendance', href: '/admin/attendance' },
  { icon: '📅', label: 'Events', href: '/admin/events' },
  { icon: '🗣️', label: 'Community', href: '/admin/community' },
  { icon: '💬', label: 'Pastor', href: '/admin/pastor' },
  { icon: '🖼️', label: 'Gallery', href: '/admin/gallery' },
  { icon: '📚', label: 'Books & Bible', href: '/admin/books' },
  { icon: '📍', label: 'Churches', href: '/admin/churches' },
  { icon: '💰', label: 'Budget', href: '/admin/budget' },
  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
];
