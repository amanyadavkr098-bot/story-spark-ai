import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";
import ThemeToggle from "../theme/theme_toggle.component";

const NavListComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = () => {
    removeUserInfo();
    setLoggedIn(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? "text-white bg-slate-800/70" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10"}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1120]/80 backdrop-blur-md border-b border-white/10">
      <div className="relative z-10 mx-auto max-w-8xl px-5 py-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-400 hover:text-custom transition">HOME</Link>
            <Link to="/explore" className="text-gray-400 hover:text-custom transition">EXPLORE</Link>
            <Link to="/contact-us" className="text-gray-400 hover:text-custom transition">CONTACT US</Link>
            <Link to="/community" className="text-gray-400 hover:text-custom transition">COMMUNITY</Link>
            {isLogin && (
              <>
                <Link to="/bookmarks" className="text-gray-400 hover:text-custom transition">SAVED STORIES</Link>
                {isAdmin && (
                  <Link to="/dashboard" className="text-gray-400 hover:text-custom transition">DASHBOARD</Link>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            <button type="button" aria-label="Search" className="p-2 text-gray-400 hover:text-gray-500">
              <i className="fas fa-search"></i>
            </button>
            <div className="relative inline-flex" ref={notificationMenuRef}>
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-full p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                data-notification-trigger="true"
                onClick={toggle}
              >
                <i className="fa-solid fa-bell"></i>
                {unreadCount > 0 && (
                  <span className="absolute right-0 top-0 grid min-h-[18px] min-w-[18px] -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
            </div>
            {isLogin ? (
              <button onClick={handelLogout} className="text-gray-400 px-6 py-2 font-medium cursor-pointer">
                LOGOUT
              </button>
            ) : (
              <Link to="/login">
                <button className="text-gray-400 px-6 py-2 font-medium cursor-pointer">
                  LOGIN
                </button>
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-gray-400 hover:text-gray-300 p-2"
            onClick={() => setMenuOpen((prev) => !prev)}>
            <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden px-5 pb-4 flex flex-col gap-3 border-t border-white/10 mt-2">
          <Link to="/" className="text-gray-400 hover:text-white py-2">HOME</Link>
          <Link to="/explore" className="text-gray-400 hover:text-white py-2">EXPLORE</Link>
          <Link to="/community" className="text-gray-400 hover:text-white py-2">COMMUNITY</Link>
          {isLogin && (
            <>
              <Link to="/bookmarks" className="text-gray-400 hover:text-white py-2">SAVED STORIES</Link>
              {isAdmin && (
                <Link to="/dashboard" className="text-gray-400 hover:text-white py-2">DASHBOARD</Link>
              )}
            </>
          )}
          <button type="button" className="text-left text-gray-400 py-2" data-notification-trigger="true" onClick={toggle}>
            NOTIFICATIONS {unreadCount > 0 && `(${unreadCount})`}
          </button>
          {
            isLogin ? (
              <button onClick={handelLogout} className="text-left text-gray-400 py-2">
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="text-gray-400 py-2">LOGIN</Link>
            )
          }
        </div>
      )}
    </header>
  );
};

export default NavListComponent;
