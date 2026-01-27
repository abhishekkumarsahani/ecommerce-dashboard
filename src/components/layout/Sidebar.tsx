import {
  Home,
  ShoppingCart,
  Users,
  BarChart,
  Package,
  Settings,
  Moon,
  Sun,
  X,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: BarChart, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = ({ open, onClose, darkMode, setDarkMode }: any) => {
  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72
          bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h1 className="text-lg font-bold">ShopSphere</h1>
          <button onClick={onClose} className="lg:hidden">
            <X />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
              text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
          >
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            Toggle Theme
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
