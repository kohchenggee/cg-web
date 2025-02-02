import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="py-4 sm:px-24 px-4 flex items-center justify-end">
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
