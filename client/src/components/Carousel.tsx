import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string;
  image: string;
  alt: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

export default function Carousel({ slides, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlay, autoPlayInterval, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const handleMouseEnter = () => {
    setIsAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlay(true);
  };

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full bg-gradient-to-b from-slate-50 to-white py-8 md:py-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        {/* 轮播主容器 - 左右布局 */}
        <div className="flex items-center gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* 左侧信息面板 */}
          <div className="hidden lg:flex flex-col justify-center items-start w-32 xl:w-40 flex-shrink-0">
            <div className="space-y-3">
              {/* 幻灯片编号 */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {String(currentIndex + 1).padStart(2, '0')}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  / {String(slides.length).padStart(2, '0')}
                </div>
              </div>

              {/* 装饰线 */}
              <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>

              {/* 导航提示 */}
              <div className="text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-700">浏览学术</p>
                <p className="text-slate-500 mt-1">发现数据驱动的研究</p>
              </div>
            </div>
          </div>

          {/* 中间轮播容器 */}
          <div className="relative overflow-hidden rounded-xl shadow-lg bg-slate-900 flex-1 min-w-0">
            {/* 图片容器 */}
            <div className="relative w-full aspect-[16/6]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* 左箭头按钮 */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              {/* 右箭头按钮 */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              {/* 深色渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* 指示器点 */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 w-2.5 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 右侧快速导航 */}
          <div className="hidden lg:flex flex-col justify-center items-end w-32 xl:w-40 flex-shrink-0">
            <div className="space-y-3 w-full">
              {/* 快速导航按钮 */}
              <div className="flex flex-col gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`text-xs px-3 py-2 rounded-lg transition-all duration-300 text-right ${
                      index === currentIndex
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <span className="font-semibold">{index + 1}</span>
                  </button>
                ))}
              </div>

              {/* 装饰线 */}
              <div className="w-8 h-1 bg-gradient-to-l from-blue-600 to-transparent ml-auto"></div>
            </div>
          </div>
        </div>

        {/* 移动端指示器 */}
        <div className="lg:hidden text-center mt-4 text-slate-600 text-sm">
          {currentIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}
