import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp, FaAngleDown, FaAngleRight } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "Trang chủ", link: "/" },
    { name: "Giới Thiệu", link: "/gioi-thieu" },
    {
      name: "Thiết Kế Nội Thất",
      dropdown: [
        { name: "Thiết kế nội thất nhà phố", link: "/thiet-ke-noi-that-nha-pho" },
        { name: "Thiết kế nội thất chung cư", link: "/thiet-ke-noi-that-chung-cu" },
      ],
    },
    { name: "Thi Công Nội Thất Trọn Gói", link: "/thi-cong-noi-that-tron-goi" },
    { name: "Dự Án", link: "/du-an" },
    { name: "Góc phong thủy", link: "/goc-phong-thuy" },
    { name: "Góc chuyên gia", link: "/goc-chuyen-gia" },
    { name: "Liên Hệ", link: "/lien-he" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out z-50 ${
          scrolling ? "bg-black shadow-md py-2 md:py-4" : "bg-black p-2 md:p-3"
        }`}
      >
        <div className="container mx-auto flex flex-col items-center justify-between">
          {/* Logo Row */}
          <div className="relative flex items-center justify-center w-full px-4">
            <Link href="/">
              <Image
                src="/greenlahomelogo.png"
                alt="logo"
                width={80}
                height={40}
                className={`cursor-pointer py-3 md:py-1 filter brightness-0 invert transition-all duration-300 ease-in-out ${
                  scrolling ? "md:opacity-0 md:-translate-y-4 md:h-0" : "opacity-100 translate-y-0 h-auto"
                }`}
                priority
              />
            </Link>
            <div className="md:hidden absolute right-4 flex items-center">
              <AiOutlineMenu size={25} className="text-white cursor-pointer" onClick={toggleMenu} aria-label="Open menu" />
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex justify-center w-full">
            <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 text-sm md:text-base uppercase font-semibold py-1 md:py-2">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.name === "Thiết Kế Nội Thất" ? (
                    <span
                      className="text-white hover:text-green-400 flex items-center transition-colors duration-200 cursor-pointer"
                      onClick={() => toggleDropdown(index)}
                      role="button"
                      aria-expanded={activeDropdown === index}
                      aria-controls={`dropdown-${index}`}
                    >
                      {item.name}
                      <FaChevronDown
                        className="ml-1 text-white group-hover:text-green-400 transition-transform duration-200 group-hover:rotate-180"
                        size={12}
                      />
                    </span>
                  ) : (
                    <Link
                      href={item.link || "#"}
                      className="text-white hover:text-green-400 flex items-center transition-colors duration-200"
                    >
                      {item.name}
                      {item.dropdown && (
                        <FaChevronDown
                          className="ml-1 text-white group-hover:text-green-400 transition-transform duration-200 group-hover:rotate-180"
                          size={12}
                        />
                      )}
                    </Link>
                  )}
                  {item.dropdown && (
                    <div
                      className={`absolute left-0 ${
                        activeDropdown === index || item.name !== "Thiết Kế Nội Thất"
                          ? "hidden group-hover:block"
                          : "block"
                      } bg-black text-white w-64 md:w-72 p-2 md:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 rounded-md`}
                      id={`dropdown-${index}`}
                    >
                      <ul className="space-y-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <li key={subIndex} className="flex items-center justify-between py-1 mt-1">
                            <Link
                              href={subItem.link}
                              className="hover:text-green-400 transition-colors duration-200 text-sm md:text-base uppercase"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed top-0 left-0 w-[70%] h-full max-h-full overflow-y-auto bg-black z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4">
          <Image src="/greenlahomelogo.png" alt="Logo" width={150} height={70} />
          <AiOutlineClose size={25} className="cursor-pointer text-white" onClick={toggleMenu} aria-label="Close menu" />
        </div>
        <div className="mb-4 px-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-2 border border-gray-600 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
          />
        </div>
        <ul className="space-y-4 px-4 border-b border-gray-700 pb-4 uppercase">
          {menuItems.map((item, index) => (
            <li key={index}>
              {!item.dropdown ? (
                <Link href={item.link} className="text-white text-lg font-medium hover:text-green-400">
                  {item.name}
                </Link>
              ) : (
                <>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleDropdown(index)}
                    role="button"
                    aria-expanded={activeDropdown === index}
                    aria-controls={`mobile-dropdown-${index}`}
                  >
                    <span className="text-white text-lg font-medium hover:text-green-400">{item.name}</span>
                    <span className="text-white">
                      {activeDropdown === index ? <FaChevronUp size={20} /> : <FaAngleDown size={20} />}
                    </span>
                  </div>
                  <ul
                    id={`mobile-dropdown-${index}`}
                    className={`pl-4 mt-2 ${
                      activeDropdown === index ? "max-h-96" : "max-h-0"
                    } overflow-hidden transition-all duration-300 space-y-2`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex items-center justify-between">
                        <Link
                          href={subItem.link}
                          className="py-1 text-gray-300 hover:text-green-400 uppercase"
                        >
                          {subItem.name}
                        </Link>
                        <FaAngleRight className="text-gray-300" size={12} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}