import { useState, useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { formatPosts, readPostsFromDb } from "../../lib/utils";
import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  posts: PostDetail[];
  meta: MetaData;
};

const Blogs: NextPage<Props> = ({ posts, meta }) => {
  const postsPerPage = 20; // Hiển thị 2 bài viết trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  // Tính tổng số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Lấy danh sách bài viết cho trang hiện tại
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [currentPage, posts]);

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  // Xử lý khi nhấn nút phân trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  return (
    <DefaultLayout>
      <div className="relative h-[40vh] w-full">
        {/* Background Image */}
        <Image
          src="/images/banner5.png"
          alt="Góc Phong Thủy - GreenLa Home"
          layout="fill"
          objectFit="cover"
          className="opacity-70 brightness-75"
        />
        {/* Overlay with Breadcrumb, Title and Description */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-6 md:p-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <p className="text-sm uppercase text-gray-400">
                <Link href="/">
                  <span className="hover:text-yellow-500 cursor-pointer">
                    Trang chủ
                  </span>
                </Link>{" "}
                / Góc Phong Thủy
              </p>
            </nav>
            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Góc Phong Thủy - GreenLa Home
            </h1>
            {/* Short Description */}
            <p className="text-lg md:text-xl text-white mt-2">
              Cập nhật các bí quyết phong thủy, xu hướng và kinh nghiệm giúp tối
              ưu không gian sống và làm việc.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-12 bg-black">
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-8xl mx-auto px-4 lg:px-12">
          {/* Left Section: List of Posts (2 per row) */}
          <div className="w-full lg:w-9/12">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Danh sách bài viết */}
                <div className="flex flex-wrap gap-6 bg-black text-white py-8">
                  {paginatedPosts.map((post, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[calc(50%-1.5rem)] flex flex-col gap-4"
                    >
                      {post.thumbnail && (
                        <div
                          className="relative cursor-pointer rounded-lg overflow-hidden"
                          style={{ aspectRatio: "16/9" }}
                        >
                          <Image
                            src={post.thumbnail}
                            fill={true}
                            priority={index < 2}
                            className="object-cover hover:scale-105 transition-all ease duration-300"
                            alt={post.title}
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-orange-500 uppercase">
                          {formatDate(post.createdAt)} - {post.category}
                        </p>
                        <Link
                          href={`/goc-phong-thuy/${post.slug}`}
                          className="text-xl md:text-2xl font-bold hover:text-green-600 text-green-500"
                          aria-label={post.title}
                        >
                          {post.title}
                        </Link>
                        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                          {/* Placeholder for excerpt */}
                          {post.meta}

                        </p>
                        <Link
                          href={`/goc-phong-thuy/${post.slug}`}
                          className="text-sm text-gray-400 uppercase hover:text-green-500"
                        >
                          Xem thêm
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phân trang */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-6">
                    {/* Nút số trang */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentPage === page
                              ? "bg-orange-500 text-white"
                              : "bg-transparent text-white border border-white hover:bg-orange-500 hover:text-white"
                          } transition-all duration-300`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    {/* Nút Next */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-transparent text-white border border-white hover:bg-orange-500 hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Không có bài viết nào trong danh mục Góc Phong Thủy.</p>
              </div>
            )}
          </div>

          {/* Right Section: Sidebar with Search and Recent Posts */}
          <div className="w-full lg:w-3/12 flex flex-col gap-6 bg-black text-white py-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Recent Posts */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold uppercase">Bài đăng gần đây</h3>
              {[0, 1, 2].map(
                (index) =>
                  posts[index] && (
                    <div key={index} className="flex flex-row gap-4">
                      {posts[index]?.thumbnail && (
                        <div
                          className="w-3/6 relative cursor-pointer rounded-lg overflow-hidden"
                          style={{ aspectRatio: "1/1", maxHeight: "100px" }}
                        >
                          <Image
                            src={posts[index].thumbnail}
                            fill={true}
                            className="object-cover hover:scale-105 transition-all ease duration-300"
                            alt={posts[index].title}
                          />
                        </div>
                      )}
                      <div className="w-3/4 flex flex-col gap-1">
                        <p className="text-base text-orange-500 uppercase">
                          {formatDate(posts[index]?.createdAt)}
                        </p>
                        <Link
                          href={`/goc-phong-thuy/${posts[index]?.slug}`}
                          className="text-base font-medium hover:text-orange-500 line-clamp-2"
                          aria-label={posts[index]?.title}
                        >
                          {posts[index]?.title}
                        </Link>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  posts: PostDetail[];
  meta: MetaData;
}> = async () => {
  try {
    const limit = 5; // Tăng limit để lấy nhiều bài viết hơn (vì có phân trang)
    const posts = await readPostsFromDb(limit, 0);
    const formattedPosts: PostDetail[] = formatPosts(posts).filter(
      (post) => post.category === "Góc Phong Thủy"
    );

    const meta: MetaData = {
      title: "Góc Phong Thủy - Bài viết từ GreenLaHome",
      description:
        "Khám phá các bài viết về phong thủy, mẹo áp dụng phong thủy trong thiết kế nội thất và cuộc sống từ GreenLaHome.",
      keywords:
        "phong thủy, Góc Phong Thủy, GreenLaHome, thiết kế phong thủy, nội thất",
      author: "GreenLaHome",
      robots: "index, follow",
      canonical: "https://greenlahome.vn/goc-phong-thuy",
      og: {
        title: "Góc Phong Thủy - Bài viết từ GreenLaHome",
        description:
          "Khám phá các bài viết về phong thủy, mẹo áp dụng phong thủy trong thiết kế nội thất và cuộc sống từ GreenLaHome.",
        type: "website",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn/goc-phong-thuy",
        siteName: "GreenLaHome",
      },
      twitter: {
        card: "summary_large_image",
        title: "Góc Phong Thủy - Bài viết từ GreenLaHome",
        description:
          "Khám phá các bài viết về phong thủy, mẹo áp dụng phong thủy trong thiết kế nội thất và cuộc sống từ GreenLaHome.",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { notFound: true };
  }
};

export default Blogs;