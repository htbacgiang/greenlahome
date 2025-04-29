import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { projects } from "../../components/tantruonggiang/data/projects";
import ServiceSection from "../../components/tantruonggiang/ServiceSection";
import { useState, useEffect, useRef } from "react";

const PropertyDetail = ({ project }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const touchStartX = useRef(null); // Track touch start position
  const touchEndX = useRef(null); // Track touch end position

  useEffect(() => {
    if (!project?.id) {
      setFeaturedProjects([]);
      return;
    }
    const otherProjects = projects.filter((proj) => proj.id !== project.id);
    const randomProjects = getRandomProjects(otherProjects, 3);
    setFeaturedProjects(randomProjects);
  }, [project?.id]);

  if (!project) {
    return <div className="text-center text-white py-10">Dự án không tồn tại</div>;
  }

  const images = project.images?.length > 0 ? project.images : [project.image || "/fallback-image.jpg"];

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchEndX.current - touchStartX.current;
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    if (deltaX > swipeThreshold) {
      handlePrevImage(); // Swipe right -> previous image
    } else if (deltaX < -swipeThreshold) {
      handleNextImage(); // Swipe left -> next image
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối với máy chủ");
      }

      setStatus("Gửi thông tin thành công!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Không thể gửi thông tin. Vui lòng thử lại sau."}`);
    }
  };

  const getRandomProjects = (projectsArray, count) => {
    const shuffled = [...projectsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Head>
        <title>{project.title} | Nội thất GreenLa Home</title>
        <meta
          name="description"
          content={`Khám phá dự án ${project.title} tại ${project.location} – thi công nội thất cao cấp cho ${project.customer}.`}
        />
      </Head>
      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <div className="relative md:h-[40vh] h-[30vh] w-full">
          <Image
            src={project.image || "/fallback-image.jpg"}
            alt={`Hình ảnh chính của ${project.title}`}
            layout="fill"
            quality={100}
            objectFit="cover"
            className="opacity-70 brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6 md:p-10">
              <p className="text-sm uppercase text-gray-400">
                <Link href="/">
                  <span className="hover:text-yellow-500 cursor-pointer">Trang chủ</span>
                </Link>{" "}
                /{" "}
                <Link href="/du-an">
                  <span className="hover:text-yellow-500 cursor-pointer">Dự án</span>
                </Link>{" "}
                / {project.title}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{project.title}</h1>
              <p className="text-lg md:text-xl text-white mt-2">
                Thiết kế nội thất cao cấp: {project.location} – {project.customer}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-3/4">
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">★</span>
                    <p>Khách hàng: {project.customer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">🏠</span>
                    <p>Phong cách: {project.style}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">📍</span>
                    <p>Địa điểm: {project.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">📏</span>
                    <p>Diện tích: {project.area}</p>
                  </div>
                </div>
              </div>

              {/* Image Gallery with Swipe Support */}
              <div
                className="relative mt-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={images[currentImage]}
                  alt={`Hình ảnh ${currentImage + 1} của ${project.title}`}
                  width={1920}
                  height={1080}
                  quality={100}
                  className="w-full md:h-[70vh] h-80 object-cover rounded-lg"
                  loading="lazy"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-600 transition-colors"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-600 transition-colors"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${currentImage === index ? "bg-yellow-500" : "bg-gray-400"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 md:grid-cols-5 md:gap-3 gap-2 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative w-full aspect-[3/2]">
                    <Image
                      src={image}
                      alt={`Hình ảnh phụ ${index + 1} của ${project.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg cursor-pointer"
                      onClick={() => setCurrentImage(index)}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/4 md:ml-6 mt-6 md:mt-0">
              <div className="mt-6">
                <h2 className="text-xl font-bold text-green-500 uppercase">Dự án tiêu biểu</h2>
                <div className="mt-4 space-y-4">
                  {featuredProjects.map((featuredProject) => (
                    <Link
                      key={featuredProject.id}
                      href={`/du-an/${featuredProject.slug}`}
                      className="flex flex-col items-center hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <p className="text-gray-400 text-center mt-2">{featuredProject.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg mt-4">
                <h2 className="text-xl font-bold text-yellow-500 mb-2">ĐẶT LỊCH TƯ VẤN</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên *"
                      aria-label="Họ và tên"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.name ? "border-red-500" : "border-none"}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại *"
                      aria-label="Số điện thoại"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.phone ? "border-red-500" : "border-none"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email (tùy chọn)"
                      aria-label="Email"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.email ? "border-red-500" : "border-none"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Yêu cầu của bạn (tùy chọn)"
                      aria-label="Yêu cầu của bạn"
                      className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.message ? "border-red-500" : "border-none"}`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "Đang gửi..."}
                    className="w-full bg-yellow-500 text-black p-3 rounded-lg font-bold disabled:opacity-50"
                  >
                    GỬI THÔNG TIN <span>→</span>
                  </button>
                </form>
                {status && (
                  <p
                    className={`mt-2 text-center ${status.includes("thành công") ? "text-green-600" : "text-red-600"}`}
                  >
                    {status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ServiceSection />
      </div>
    </>
  );
};

export default PropertyDetail;

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { props: { project: project || null } };
}