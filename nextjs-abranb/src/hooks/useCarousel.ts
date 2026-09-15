import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(numItems: number, tamCard: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollToCard = useCallback(
    (index: number) => {
      const container = slideRef.current;
      if (!container) return;

      const card = container.children[index] as HTMLElement;
      if (!card) return;

      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const centroContainer = container.offsetWidth / 2;

      let scroll = 0;
      if (window.innerWidth < 1024) {
        scroll = tamCard * index;
      } else {
        scroll = cardLeft + cardWidth / 2 - centroContainer;
      }

      container.scrollTo({
        left: scroll,
        behavior: "smooth",
      });
    },
    [tamCard],
  );

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const container = slideRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = container.scrollLeft;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const container = slideRef.current;
    if (!container || !isDragging.current) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = x - startX.current;
    container.scrollLeft = scrollLeft.current - walk;
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  function handleRadioChange(index: number) {
    setActiveIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % numItems);
    }, 15000);

    return () => clearInterval(interval);
  }, [numItems]);

  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex, scrollToCard]);

  return {
    activeIndex,
    slideRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleRadioChange,
  };
}
