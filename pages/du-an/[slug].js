import { useRouter } from "next/router";
import { projects } from "../../components/tantruonggiang/data/projects";
import PropertyDetail from "../../components/tantruonggiang/PropertyDetail";
import DefaultLayout from "../../components/layout/DefaultLayout";

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-white">Dự án không tồn tại</div>;
  }

  // Dữ liệu cho SEO
  const pageTitle = `${project.title} | Thi công nội thất cao cấp`;
  const pageDescription = `Dự án ${project.title} - Khách hàng: ${project.customer}, Phong cách: ${project.style}, Loại hình: ${project.location}, Diện tích: ${project.area}. Xem chi tiết tại đây!`;
  const pageUrl = `https://greenlahome.vn/du-an/${project.slug}`; // 
  const pageImage = project.image;

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: pageDescription,
    image: pageImage,
    author: {
      "@type": "Person",
      name: project.customer,
    },
    location: {
      "@type": "Place",
      name: project.location,
    },
    areaServed: project.area,
    url: pageUrl,
  };

  return (
    <DefaultLayout> 
      <PropertyDetail project={project} />
    </DefaultLayout>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const project = projects.find((p) => p.slug === slug);

    // Nếu không tìm thấy project, trả về meta mặc định
    if (!project) {
      const defaultMeta = {
        title: "Dự Án Nội Thất – GreenLa Home",
        description:
          "Khám phá các dự án thi công nội thất cao cấp của GreenLa Home, từ biệt thự, nhà phố đến chung cư. Mỗi dự án đều mang phong cách thiết kế hiện đại, sang trọng, tối ưu không gian và chi phí cho gia đình Việt.",
        keywords:
          "dự án nội thất, thi công nội thất, GreenLa Home, thiết kế nội thất",
        author: "GreenLa Home",
        robots: "index, follow",
        canonical: "https://greenlahome.vn/du-an",
        og: {
          title: "Dự Án Nội Thất – GreenLa Home",
          description:
            "Xem các dự án thi công nội thất cao cấp từ GreenLa Home với thiết kế hiện đại, sang trọng, tối ưu không gian sống.",
          type: "website",
          image: "/images/noi-that-1.jpg",
          imageWidth: "1200",
          imageHeight: "630",
          url: "https://greenlahome.vn/du-an",
          siteName: "GreenLa Home",
          locale: "vi_VN",
        },
        twitter: {
          card: "summary_large_image",
          title: "Dự Án Nội Thất – GreenLa Home",
          description:
            "Danh sách dự án nội thất cao cấp của GreenLa Home, thiết kế hiện đại, sang trọng.",
          image: "/images/noi-that-1.jpg",
          site: "@GreenLaHome", // Thay bằng handle thật nếu có
        },
      };

      return {
        props: {
          meta: defaultMeta,
        },
      };
    }

    // Meta cho dự án cụ thể
    const meta = {
      title: `${project.title} – GreenLa Home`,
      description:
        `Khám phá dự án ${project.title} của GreenLa Home, thi công nội thất cao cấp cho ${project.customer}. Với phong cách ${project.style}, loại hình ${project.location}, diện tích ${project.area}, dự án mang đến không gian sống hiện đại, sang trọng, tối ưu chi phí và công năng.`,
      keywords: `dự án nội thất, thi công nội thất, GreenLa Home, ${project.title}, ${project.customer}, ${project.style}, ${project.location}, ${project.area}`,
      author: "GreenLa Home",
      robots: "index, follow",
      canonical: `https://greenlahome.vn/du-an/${project.slug}`,
      og: {
        title: `${project.title} – GreenLa Home`,
        description:
          `Dự án ${project.title} bởi GreenLa Home, thi công nội thất cao cấp với phong cách ${project.style}, dành cho ${project.customer}, tại ${project.location}.`,
        type: "website",
        image: project.image || "/images/noi-that-1.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: `https://greenlahome.vn/du-an/${project.slug}`,
        siteName: "GreenLa Home",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} – GreenLa Home`,
        description:
          `Dự án ${project.title} của GreenLa Home, phong cách ${project.style}, tại ${project.location}, cho ${project.customer}.`,
        image: project.image || "/images/noi-that-1.jpg",
        site: "@GreenLaHome", // Thay bằng handle thật nếu có
      },
    };

    return {
      props: {
        meta,
        project,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    const defaultMeta = {
      title: "Dự Án Nội Thất – GreenLa Home",
      description:
        "Khám phá các dự án thi công nội thất cao cấp của GreenLa Home, từ biệt thự, nhà phố đến chung cư. Mỗi dự án đều mang phong cách thiết kế hiện đại, sang trọng, tối ưu không gian và chi phí cho gia đình Việt.",
      keywords:
        "dự án nội thất, thi công nội thất, GreenLa Home, thiết kế nội thất",
      author: "GreenLa Home",
      robots: "index, follow",
      canonical: "https://greenlahome.vn/du-an",
      og: {
        title: "Dự Án Nội Thất – GreenLa Home",
        description:
          "Xem các dự án thi công nội thất cao cấp từ GreenLa Home với thiết kế hiện đại, sang trọng, tối ưu không gian sống.",
        type: "website",
        image: "/images/noi-that-1.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn/du-an",
        siteName: "GreenLa Home",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "Dự Án Nội Thất – GreenLa Home",
        description:
          "Danh sách dự án nội thất cao cấp của GreenLa Home, thiết kế hiện đại, sang trọng.",
        image: "/images/noi-that-1.jpg",
        site: "@GreenLaHome", // Thay bằng handle thật nếu có
      },
    };

    return {
      props: {
        meta,
      },
    };
  }
}