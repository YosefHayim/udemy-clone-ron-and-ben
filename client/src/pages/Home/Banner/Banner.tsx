import { useState, useEffect } from "react";
import banner1 from "/images/banner1.png";
import banner2 from "/images/banner2.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const slides = [
  {
    title: "Make 2025 the year of your career",
    description:
      "The skills you need are on sale from ₪39.90. [Sale ends January 10]",
    img: banner1,
  },
  {
    title: "Certifications — the ultimate career move",
    description:
      "Prepare for certification exams in COMPTIA, AWS Cloud, and so much more — on sale now.",
    img: banner2,
  },
];

// Clone first and last slides for smooth looping
const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real slide
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Reset transition instantly when reaching cloned slides
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length);
      }, 500); // Wait for transition to complete
    }
    if (currentIndex === slides.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[30rem] overflow-hidden">
      <div
        className={`flex w-full h-full ${
          isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="absolute left-10 top-1/4 bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {slides[(currentIndex - 1) % slides.length].title}
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          {slides[(currentIndex - 1) % slides.length].description}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
        onClick={handlePrev}
      >
        <MdKeyboardArrowLeft size={24} className="text-black" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
        onClick={handleNext}
      >
        <MdKeyboardArrowRight size={24} className="text-black" />
      </button>
    </div>
  );
};

export default Banner;
