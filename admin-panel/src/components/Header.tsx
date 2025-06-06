import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white shadow-sm dark:bg-dark-surface dark:shadow-none dark:ring-1 dark:ring-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <span className="text-xl font-bold text-lavender dark:text-lavender/80">
            Panel Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
} 