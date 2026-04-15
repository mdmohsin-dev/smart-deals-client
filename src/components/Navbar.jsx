import { useState, useEffect, useRef, useContext } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  const navLinks = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/">All Products</NavLink></li>
  </>


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


  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);


  return (
    <>
      <style>{`

        /* Frosted glass after scroll */
        .navbar.scrolled {
          background: rgba(8, 8, 13, 0.52);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .sidebar {
          z-index: 1100;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar.open { transform: translateX(0); }
      `}</style>

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""} fixed z-50 w-full box-content`}>

        <div className="max-w-350 w-full mx-auto px-6 py-3">
          <div className="flex justify-between items-center w-full transition-all duration-500 ease-in-out">

            {/* <Link to="/"><img className="w-14" src={logo} alt="" /></Link> */}
            <h3>SmartDeals</h3>

            <div className="flex gap-10 items-center">
              <ul className="lg:flex hidden gap-6 text-white text-[17px] font-semibold font-inter italic">
                {navLinks}
              </ul>

              <div className="flex items-center gap-4">
                <div>
                  {/* {
                    user ?
                      <div className="relative">
                        <img
                          onClick={() => setOpen(!open)}
                          className="w-12 h-12 object-cover rounded-full border cursor-pointer"
                          src={user?.photoURL || userLogo}
                          alt=""
                        />

                        {open && (
                          <div className="absolute right-1 top-14 w-52 bg-white text-black p-4 shadow rounded-md">
                            <h3 className="text-center text-xl font-semibold">{user.displayName}</h3>
                            <Link className="btn bg-[#FF02CB] mt-3 w-full border-none" to="/dashboard">Dashobard</Link>
                            <button onClick={handleLogout}
                              className="btn w-full mt-3 bg-red-500 border-none">Logout</button>
                          </div>
                        )}
                      </div>

                      :

                      <Link to="/login"
                        className="hidden btn rounded-lg bg-red-500 border-none lg:flex gap-4 text-lg py-4 px-6 font-exo hover:rounded-3xl transition-all duration-500 hover:bg-black">Sign In</Link>
                  } */}
                </div>

                <button
                  className="flex lg:hidden"
                  aria-label="Open"
                  onClick={() => setSidebarOpen(true)}
                >
                  <IoIosMenu size={34} color="#FF02CB"></IoIosMenu>
                </button>
              </div>

            </div>

          </div>
        </div>
      </nav >

      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? " open" : ""} fixed w-72 h-dvh bg-[#EDE8E3] pl-4 pt-4 pr-2`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex text-black justify-between items-center">
          <h3 className="text-3xl font-marker bg-linear-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">Elite Arena</h3>
          <button
            aria-label="Close"
            onClick={() => setSidebarOpen(false)}
          >
            <IoMdClose size={34} color="black"></IoMdClose>
          </button>
        </div>

        <ul onClick={handleNavClick}
          className="flex flex-col gap-6 text-black text-xl font-semibold pt-6">
          {navLinks}
        </ul>

        <div>
          {/* {
            !user &&
            <button
              onClick={() => setSidebarOpen(false)}
            >
              <Link to="/login" className="absolute bottom-4 btn bg-red-500 border-none flex gap-4 text-lg py-4 px-6 font-exo hover:rounded-3xl transition-all duration-500 hover:bg-black">Sign In</Link>
            </button>
          } */}
        </div>
      </aside>
    </>
  );
}