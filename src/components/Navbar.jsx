import { useState, useEffect, useRef } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { BiEnvelope, BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  const { user, logout } = useAuth();

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-products">All Products</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/myProducts">My Products</NavLink></li>
          <li><NavLink to="/myBids">My Bids</NavLink></li>
          <li><NavLink to="/createProduct">Create Product</NavLink></li>
        </>
      )}
    </>
  );

  const handleNavClick = (e) => {
    if (e.target.closest("a")) {
      setSidebarOpen(false);
    }
  };

  // Frosted glass after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [sidebarOpen]);

  // Close profile panel on outside click (desktop dropdown click-away)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [profileOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const userInitial = user?.displayName?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-6 py-3">
          <div className="flex justify-between items-center w-full">

            <Link to="/">
              <h3 className="text-black text-2xl md:text-3xl font-bold">
                Smart
                <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Deals
                </span>
              </h3>
            </Link>

            <ul className="lg:flex hidden text-black gap-6 text-[17px] font-normal">
              {navLinks}
            </ul>

            <div className="flex items-center gap-4">

              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    aria-label="Open profile menu"
                    className="cursor-pointer rounded-full transition-shadow duration-300 hover:shadow-[0_0_0_4px_rgba(124,58,237,0.12)]"
                  >
                    {user?.photoURL ? (
                      <img
                        className="w-11 h-11 object-cover rounded-full border-2 border-violet-200"
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                      />
                    ) : (
                      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-violet-600 text-white font-semibold border-2 border-violet-200">
                        {userInitial}
                      </div>
                    )}
                  </button>

                  {/* Backdrop — mobile only, gives the sheet a modal feel */}
                  <div
                    onClick={() => setProfileOpen(false)}
                    className={`fixed inset-0 z-[1090] bg-black/40 transition-opacity duration-300 lg:hidden ${
                      profileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  />

                  {/* Profile panel — dropdown card on desktop, bottom sheet on mobile */}
                  <div
                    className={`fixed inset-x-0 bottom-0 z-[1100] lg:absolute lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-14 lg:z-50 lg:w-72
                      bg-white text-black rounded-t-3xl lg:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
                      transition-all duration-300 ease-out origin-top-right
                      ${
                        profileOpen
                          ? "translate-y-0 opacity-100 pointer-events-auto"
                          : "translate-y-full lg:translate-y-2 opacity-0 pointer-events-none lg:scale-95"
                      }`}
                  >
                    {/* mobile drag handle */}
                    <div className="flex justify-center pt-3 lg:hidden">
                      <span className="w-10 h-1.5 rounded-full bg-gray-200" />
                    </div>

                    {/* User info header */}
                    <div className="px-5 pt-5 pb-5 bg-linear-to-r from-blue-600/5 to-violet-600/5">
                      <div className="flex items-center gap-4">
                        {user?.photoURL ? (
                          <img
                            className="w-16 h-16 object-cover rounded-full border-2 border-violet-200 shadow"
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                          />
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-violet-600 text-white text-xl font-semibold border-2 border-violet-200 shadow">
                            {userInitial}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-base truncate">
                            {user.displayName || "User"}
                          </p>
                          {user?.email && (
                            <p className="flex items-center gap-1.5 text-sm text-gray-500 truncate mt-1">
                              <BiEnvelope size={14} className="shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Logout */}
                    <div className="p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:pb-3">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-medium bg-linear-to-r from-blue-600 to-violet-600 hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <BiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-2 rounded-md py-2.5 px-6 font-medium text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-300"
                >
                  Sign In
                </Link>
              )}

              <button
                className="flex lg:hidden cursor-pointer"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <IoIosMenu size={32} className="text-violet-600" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 z-[1090] bg-black/40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-[1100] w-72 h-dvh bg-[#EDE8E3] pl-6 pr-4 pt-6 transition-transform duration-400 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex text-black justify-between items-center">
          <h3 className="text-2xl font-bold">
            Smart
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Deals
            </span>
          </h3>
          <button aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
            <IoMdClose size={30} className="text-black" />
          </button>
        </div>

        <ul
          onClick={handleNavClick}
          className="flex flex-col gap-6 text-black text-lg font-semibold pt-8"
        >
          {navLinks}
        </ul>

        {!user && (
          <Link
            to="/login"
            onClick={() => setSidebarOpen(false)}
            className="mt-8 flex justify-center items-center gap-2 rounded-md py-3 px-6 font-medium text-white bg-linear-to-r from-blue-600 to-violet-600 hover:rounded-3xl transition-all duration-300"
          >
            Sign In
          </Link>
        )}
      </aside>

      {/* Spacer so page content doesn't sit under the fixed navbar */}
      <div className="h-[64px] md:h-[72px]" />
    </>
  );
}