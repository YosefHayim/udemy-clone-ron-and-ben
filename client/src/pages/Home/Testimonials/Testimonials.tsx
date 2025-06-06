import stack from "/images/logo_stack.svg";
import alvin from "/images/Alvin_Lim.jpeg";
import ian from "/images/Ian_Stevens.png";
import william from "/images/William_A_Wachlin.jpeg";
import quoteIcon from "/images/quote.svg"; // Imagem das aspas
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.",
    author: "StackOverflow",
    details: "37,076 responses collected",
    linkText: "View Web Development courses →",
    link: "#",
    placeholderIcon: stack,
  },
  {
    quote:
      "Udemy was truly a game-changer and a great guide for me as we brought Dimensional to life.",
    author: "Alvin Lim",
    details: "Technical Co-Founder, CTO at Dimensional",
    linkText: "View this iOS & Swift course →",
    link: "#",
    placeholderIcon: alvin,
  },
  {
    quote:
      "Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
    author: "William A. Wachlin",
    details: "Partner Account Manager at Amazon Web Services",
    linkText: "View this AWS course →",
    link: "#",
    placeholderIcon: william,
  },
  {
    quote:
      "With Udemy Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    author: "Ian Stevens",
    details: "Head of Capability Development, North America at Publicis Sapient",
    linkText: "Read full story →",
    link: "#",
    placeholderIcon: ian,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 px-8 py-16">
      <h2 className="text-center font-sans text-3xl font-extrabold text-gray-900">
        See what others are achieving through learning
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="rounded-lg border bg-white p-6 text-left shadow-sm">
            {/* Aspas como imagem */}
            <div className="mb-4">
              <img src={quoteIcon} alt="Quote" className="h-6 w-6" />
            </div>
            {/* Texto do depoimento */}
            <p className="mb-4 text-gray-900">{testimonial.quote}</p>
            {/* Logo ou autor */}
            <div className="mt-4 flex items-center">
              <img
                src={testimonial.placeholderIcon}
                alt={testimonial.author}
                className="mr-4 h-8 w-8 object-contain"
              />
              <div>
                <h3 className="font-sans font-extrabold text-gray-900">{testimonial.author}</h3>
                <p className="text-sm text-gray-600">{testimonial.details}</p>
              </div>
            </div>
            {/* Link de ação */}
            <Link
              to={testimonial.link}
              className="mt-4 inline-block font-sans font-extrabold text-purple-600 hover:underline"
            >
              {testimonial.linkText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
