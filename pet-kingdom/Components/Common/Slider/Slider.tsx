import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.css';
import { MdOutlineArrowForwardIos,MdOutlineArrowBackIos } from "react-icons/md";
interface SliderProps {
  slides: Slide[];
}

interface Slide {
  imageUrl: string;
  caption: string;
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update translateX when currentSlide changes
    setTranslateX(-currentSlide * (slidesRef.current?.clientWidth ?? 0));
  }, [currentSlide]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      e.preventDefault();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current || !slidesRef.current) return;

    const currentX = e.pageX - sliderRef.current.offsetLeft;
    const moveX = currentX - startX;
    const newTranslateX = translateX + moveX;
    const maxTranslateX = 0;
    const minTranslateX = -(slides.length - 1) * slidesRef.current.clientWidth;

    // Prevent sliding outside the boundaries
    if (newTranslateX < minTranslateX || newTranslateX > maxTranslateX) return;

    setTranslateX(newTranslateX);
    setStartX(currentX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    // Snap to the closest slide
    const slideWidth = slidesRef.current?.clientWidth ?? 0;
    const index = Math.round(Math.abs(translateX / slideWidth));
    setCurrentSlide(index);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <div
      className={styles.sliderContainer}
      ref={sliderRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className={styles.slides}
        ref={slidesRef}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <img src={slide.imageUrl} alt={slide.caption} className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === currentSlide ? `${styles.dot} ${styles.activeDot}` : styles.dot}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
      <button className={`${styles.arrowLeft} ${styles.arrow}`} onClick={prevSlide}><MdOutlineArrowBackIos/></button>
      <button className={`${styles.arrowRight} ${styles.arrow}`} onClick={nextSlide}><MdOutlineArrowForwardIos />
</button>
    </div>
  );
};

export default Slider;
