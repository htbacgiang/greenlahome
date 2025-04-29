import { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Tôi có thể đặt hàng nội thất theo thiết kế riêng không?",
      answer:
        "Có, chúng tôi hỗ trợ đặt hàng nội thất theo thiết kế riêng. Bạn có thể liên hệ với đội ngũ thiết kế của chúng tôi để thảo luận về ý tưởng và yêu cầu cụ thể. Chúng tôi sẽ đảm bảo sản phẩm phù hợp với phong cách và không gian của bạn.",
    },
    {
      question: "Nội thất của GreenLa Home có thân thiện với môi trường không?",
      answer:
        "Chúng tôi cam kết sử dụng các vật liệu thân thiện với môi trường, như gỗ công nghiệp đạt chuẩn FSC và sơn không chứa hóa chất độc hại. Tất cả sản phẩm đều được sản xuất với quy trình bền vững để giảm thiểu tác động đến môi trường.",
    },
    {
      question: "Thời gian giao hàng nội thất là bao lâu?",
      answer:
        "Thời gian giao hàng phụ thuộc vào loại sản phẩm và yêu cầu đặt hàng. Thông thường, các sản phẩm có sẵn sẽ được giao trong vòng 3-7 ngày làm việc. Đối với nội thất đặt thiết kế riêng, thời gian giao hàng có thể từ 2-4 tuần.",
    },
    {
      question: "GreenLa Home có cung cấp dịch vụ tư vấn thiết kế không?",
      answer:
        "Có, chúng tôi cung cấp dịch vụ tư vấn thiết kế nội thất miễn phí. Đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn từ khâu lên ý tưởng, chọn vật liệu, đến bố trí không gian để đảm bảo phù hợp với nhu cầu và phong cách của bạn.",
    },
    {
      question: "Chính sách bảo hành nội thất của GreenLa Home như thế nào?",
      answer:
        "Chúng tôi cung cấp chính sách bảo hành từ 1-5 năm tùy theo loại sản phẩm. Trong thời gian bảo hành, nếu có bất kỳ lỗi nào do sản xuất, chúng tôi sẽ sửa chữa hoặc thay thế miễn phí. Vui lòng liên hệ để biết thêm chi tiết.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: FAQ Section */}
          <div className="md:col-span-2">
            <p className="text-green-500 text-2xl uppercase tracking-widest mb-2">
              CÂU HỎI THƯỜNG GẶP
            </p>
            <h2 className="text-xl md:text-3xl font-bold mb-8">
              Sản Phẩm & Dịch Vụ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-white hover:text-orange-500 transition-colors duration-200">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <FaChevronUp className="text-orange-500" />
                    ) : (
                      <FaChevronDown className="text-orange-500" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="pb-4">
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Us Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-semibold mb-4">Liên Hệ Với Chúng Tôi</h3>
            <p className="text-gray-300 mb-2">
              Số 10 lô C5, KDT Geleximco Lê Trọng Tấn
            </p>
            <p className="text-gray-300 mb-2">
              Xưởng Sx: Tả Thanh Oai - Thanh Trì - Hà Nội
            </p>
            <p className="text-gray-300 mb-4">
              <a href="tel:+84962922332" className="hover:text-orange-500 transition-colors duration-200">
                Hotline/Zalo: 096.292.2332
              </a>{" "}
            <br/>
              <a href="mailto:tantruonggiang.noithat@gmail.com" className="hover:text-orange-500 transition-colors duration-200">
                Email: lienhe@greenlahome.vn
              </a>
            </p>
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/banner5.png"
                alt="Nội thất GreenLa Home Showroom"
                layout="fill"
                objectFit="cover"
                className="brightness-75 transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              GreenLa Home cam kết mang đến không gian sống hoàn hảo với các
              thiết kế nội thất tinh tế và hiện đại. Hãy theo dõi chúng tôi để cập
              nhật những xu hướng mới nhất.
            </p>
       
          </div>
        </div>
      </div>
    </section>
  );
}