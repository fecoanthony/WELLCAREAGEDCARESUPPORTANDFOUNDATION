import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-sm shadow-md"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* LOGO */}
          <HashLink smooth to="/#home" className="flex items-center space-x-3">
            <img
              src="logo.png"
              alt="wellcare aged care logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold text-white leading-tight">
                WELLCARE AGED CARE
              </h1>

              <p className="text-blue-400 text-base tracking-wide -mt-1">
                SUPPORT AND FOUNDATION
              </p>
            </div>
          </HashLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Home (hash link) */}
            <HashLink
              smooth
              to="/#home"
              className="text-gray-300 hover:text-white"
            >
              Home
            </HashLink>

            {/* About Us (normal route) */}
            <Link to="/about-us" className="text-gray-300 hover:text-white">
              About Us
            </Link>

            {/* Services (hash link) */}
            <HashLink
              smooth
              to="/#services"
              className="text-gray-300 hover:text-white"
            >
              Services
            </HashLink>

            {/* Blog (normal route or keep hash) */}
            <HashLink
              smooth
              to="/#blog"
              className="text-gray-300 hover:text-white"
            >
              Blog
            </HashLink>

            {/* FAQ (normal route) */}
            <Link to="/faq" className="text-gray-300 hover:text-white">
              FAQ
            </Link>

            {/* Contact (normal route) */}
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>

            {/* CTA BUTTON */}
            <HashLink
              smooth
              to="/#contact"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
            >
              Get a Caregiver
            </HashLink>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 text-gray-200"
            onClick={() => setMenuOpen((p) => !p)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in duration-200">
          <div className="px-4 py-6 space-y-6">
            <HashLink
              smooth
              to="/#home"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Home
            </HashLink>

            <Link
              to="/about-us"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              About Us
            </Link>

            <HashLink
              smooth
              to="/#services"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Services
            </HashLink>

            <HashLink
              smooth
              to="/#blog"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Blog
            </HashLink>

            <Link
              to="/faq"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Contact
            </Link>

            <HashLink
              smooth
              to="/#contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-2 text-center px-4 py-2 bg-blue-600 rounded-md text-white font-semibold"
            >
              Get a Caregiver
            </HashLink>
          </div>
        </div>
      )}
    </header>
  );
}
