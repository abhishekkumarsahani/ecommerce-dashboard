import { Menu } from "lucide-react";

const Header = ({ onMenuClick }: any) => {
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu />
        </button>
        <h1 className="font-semibold">Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
