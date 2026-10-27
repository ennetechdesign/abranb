import { useCallback, useEffect, useRef, useState } from "react";

export function useCarousel(numItems: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollToCard = useCallback((index: number) => {
    const container = slideRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;

    const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
    const scroll = container.scrollLeft + cardCenter - containerCenter;
    container.scrollTo({ left: Math.max(0, scroll), behavior: "smooth" });
  }, []);

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
    container.scrollLeft = scrollLeft.current - (e.pageX - startX.current);
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  function handleRadioChange(index: number) {
    setActiveIndex(index);
  }

  useEffect(() => {
    if (numItems <= 1) return;
    const interval = setInterval(() => setActiveIndex((previous) => (previous + 1) % numItems), 15000);
    return () => clearInterval(interval);
  }, [numItems]);

  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex, scrollToCard]);

  return { activeIndex, slideRef, handleMouseDown, handleMouseMove, handleMouseUp, handleRadioChange };
}
