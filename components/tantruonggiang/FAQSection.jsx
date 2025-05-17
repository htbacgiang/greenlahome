import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import Head from "next/head";

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

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "YOUR_APP_ID", // Replace with your Facebook App ID
        autoLogAppEvents: true,
        xfbml: true,
        version: "v18.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      <Head>
        <title>GreenLa Home - Câu Hỏi Thường Gặp</title>
        <meta
          name="description"
          content="Tìm hiểu thêm về sản phẩm và dịch vụ nội thất của GreenLa Home qua các câu hỏi thường gặp."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: FAQ Section */}
            <div className="md:col-span-2" role="region" aria-labelledby="faq-heading">
              <p className="text-green-500 text-xl md:text-2xl uppercase tracking-widest mb-2">
                CÂU HỎI THƯỜNG GẶP
              </p>
              <h2 id="faq-heading" className="text-lg md:text-3xl font-bold mb-8">
                Sản Phẩm & Dịch Vụ
              </h2>
              <div className="space-y-4">
                {faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-700 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                        aria-expanded={openIndex === index}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <span className="text-base md:text-lg font-semibold text-white hover:text-orange-500 transition-colors duration-200">
                          {faq.question}
                        </span>
                        {openIndex === index ? (
                          <FaChevronUp className="text-orange-500" />
                        ) : (
                          <FaChevronDown className="text-orange-500" />
                        )}
                      </button>
                      {openIndex === index && (
                        <div id={`faq-answer-${index}`} className="pb-4">
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 text-sm md:text-base">
                    Hiện tại chưa có câu hỏi nào.
                  </p>
                )}
              </div>
            </div>

            {/* Right: Contact Us Section */}
            <div className="md:col-span-1">
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Liên Hệ Với Chúng Tôi</h3>
              <p className="text-gray-300 text-sm md:text-base mb-2">
                Số 10 lô C5, KDT Geleximco Lê Trọng Tấn
              </p>
              <p className="text-gray-300 text-sm md:text-base mb-2">
                Xưởng Sx: Tả Thanh Oai - Thanh Trì - Hà Nội
              </p>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                <a
                  href="tel:+84962922332"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Hotline/Zalo: 096.292.2332
                </a>
                <br />
                <a
                  href="mailto:lienhe@greenlahome.vn"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Email: lienhe@greenlahome.vn
                </a>
              </p>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://www.facebook.com/greenlahome"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Theo dõi GreenLa Home trên Facebook"
                >
                  <FaFacebook className="text-xl md:text-2xl text-gray-300 hover:text-orange-500 transition-colors duration-200" />
                </a>
                <a
                  href="https://www.instagram.com/greenlahome"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Theo dõi GreenLa Home trên Instagram"
                >
                  <FaInstagram className="text-xl md:text-2xl text-gray-300 hover:text-orange-500 transition-colors duration-200" />
                </a>
                <a
                  href="https://www.youtube.com/greenlahome"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Theo dõi GreenLa Home trên YouTube"
                >
                  <FaYoutube className="text-xl md:text-2xl text-gray-300 hover:text-orange-500 transition-colors duration-200" />
                </a>
                <a
                  href="https://www.tiktok.com/@greenlahome"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Theo dõi GreenLa Home trên TikTok"
                >
                  <FaTiktok className="text-xl md:text-2xl text-gray-300 hover:text-orange-500 transition-colors duration-200" />
                </a>
              </div>
              <div className="mb-4">
                <div
                  className="fb-page"
                  data-href="https://www.facebook.com/greenlahome"
                  data-tabs=""
                  data-width=""
                  data-height=""
                  data-small-header="false"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="true"
                >
                  <blockquote
                    cite="https://www.facebook.com/greenlahome"
                    className="fb-xfbml-parse-ignore"
                  >
                    <a href="https://www.facebook.com/greenlahome">GreenLa Home</a>
                  </blockquote>
                </div>
              </div>
              <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
                Theo dõi fanpage Facebook của GreenLa Home để cập nhật những thiết kế mới nhất.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}