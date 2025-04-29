import Image from "next/image";

export default function StrengthsSection() {
  return (
    <section className="bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-green-400 uppercase">
            Thế Mạnh Của Greenla Home
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Cột 1: Đội Ngũ Chuyên Nghiệp */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full h-48 md:h-64">
              {/* Vòng viền 1 (ngoài cùng) */}
              <div className="absolute inset-0 border-2 border-green-400 border-opacity-20 custom-border loop-1"></div>
              {/* Vòng viền 2 */}
              <div className="absolute inset-1 border-2 border-green-400 border-opacity-40 custom-border loop-2"></div>
              {/* Vòng viền 3 */}
              <div className="absolute inset-2 border-2 border-green-400 border-opacity-60 custom-border loop-3"></div>
              {/* Vòng viền 4 (trong cùng) */}
              <div className="absolute inset-3 border-2 border-green-400 border-opacity-80 custom-border loop-4">
                <Image
                  src="/images/team-tan-truong-giang.webp"
                  alt="Đội Ngũ Chuyên Nghiệp"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  onError={() => console.error("Không thể tải hình ảnh: /images/team.jpg")}
                />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-green-400 mt-4 uppercase">
              Đội Ngũ Chuyên Nghiệp
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-2">
             Greenla Home tự hào có đội ngũ kiến trúc sư và thợ thi công dày dạn kinh nghiệm, luôn nhiệt huyết với nghề. Sự sáng tạo và chuyên môn của họ giúp biến những ý tưởng độc đáo của khách hàng thành hiện thực.
            </p>
          </div>

          {/* Cột 2: Cá Nhân Hóa Thiết Kế */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full h-48 md:h-64">
              <div className="absolute inset-0 border-2 border-green-400 border-opacity-20 custom-border loop-1"></div>
              <div className="absolute inset-1 border-2 border-green-400 border-opacity-40 custom-border loop-2"></div>
              <div className="absolute inset-2 border-2 border-green-400 border-opacity-60 custom-border loop-3"></div>
              <div className="absolute inset-3 border-2 border-green-400 border-opacity-80 custom-border loop-4">
                <Image
                  src="/images/ca-nhan-hoa.webp"
                  alt="Cá Nhân Hóa Thiết Kế"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  onError={() => console.error("Không thể tải hình ảnh: /images/design.jpg")}
                />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-green-400 mt-4 uppercase">
              Cá Nhân Hóa Thiết Kế
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-2">
              Chúng tôi tin rằng mỗi khách hàng đều có cá tính và sở thích riêng, vì vậy chúng tôi tạo ra các thiết kế nội thất mang đậm dấu ấn cá nhân. Sự kết hợp giữa phong cách sống và sở thích của khách hàng là ưu tiên hàng đầu.
            </p>
          </div>

          {/* Cột 3: Bảo Hành Trọn Đời */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full h-48 md:h-64">
              <div className="absolute inset-0 border-2 border-green-400 border-opacity-20 custom-border loop-1"></div>
              <div className="absolute inset-1 border-2 border-green-400 border-opacity-40 custom-border loop-2"></div>
              <div className="absolute inset-2 border-2 border-green-400 border-opacity-60 custom-border loop-3"></div>
              <div className="absolute inset-3 border-2 border-green-400 border-opacity-80 custom-border loop-4">
                <Image
                  src="/images/bao-hanh-tron-doi.webp"
                  alt="Bảo Hành Trọn Đời"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  onError={() => console.error("Không thể tải hình ảnh: /images/warranty.jpg")}
                />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-green-400 mt-4 uppercase">
              Bảo Hành Trọn Đời
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-2">
              Greenla Home tự hào có đội ngũ kiến trúc sư và thợ thi công dày dạn kinh nghiệm, luôn nhiệt huyết với nghề. Sự sáng tạo và chuyên môn của họ giúp biến những ý tưởng độc đáo của khách hàng thành hiện thực.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}