import { useState, useEffect, useRef } from "react";

const ResumeCarousel = () => {
  const images = [
    "/images/resumes/cv.png",
    "/images/resumes/cv2.png",
    "/images/resumes/cv3.png",
    "/images/resumes/cv4.png",
    "/images/resumes/cv5.png",
    "/images/resumes/cv6.png",
  ];

  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Ajuster la vitesse selon la taille d'écran
    const isMobile = window.innerWidth < 640;
    const scrollSpeed = isMobile ? 0.5 : 1; // pixels per frame

    const animate = () => {
      if (!isHovered) {
        positionRef.current -= scrollSpeed;
        if (positionRef.current <= -scrollElement.scrollWidth / 2) {
          positionRef.current = 0;
        }
        scrollElement.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div className="w-full overflow-hidden py-4 sm:py-8">
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 md:gap-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "200%", // Double width for seamless loop
        }}
      >
        {/* First set of images */}
        {images.map((src, index) => (
          <img
            key={`first-${index}`}
            src={src}
            alt={`Resume ${index + 1}`}
            className="w-48 sm:w-56 md:w-64 h-72 sm:h-84 md:h-96 object-contain rounded-lg shadow-lg flex-shrink-0 bg-white p-1 sm:p-2"
          />
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((src, index) => (
          <img
            key={`second-${index}`}
            src={src}
            alt={`Resume ${index + 1}`}
            className="w-48 sm:w-56 md:w-64 h-72 sm:h-84 md:h-96 object-contain rounded-lg shadow-lg flex-shrink-0 bg-white p-1 sm:p-2"
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeCarousel;
