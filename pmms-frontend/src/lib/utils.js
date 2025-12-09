/**
 * Utility function to merge Tailwind CSS classes
 * This is a simplified version of the cn() utility from shadcn/ui
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
