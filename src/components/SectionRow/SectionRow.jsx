import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SectionRow.css";

const SCROLL_AMOUNT = 480; // px, approximate width of 3 cards

const SectionRow = ({ title, items, onCardClick, genreNames }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const el = rowRef.current;
      if (!el) return;
      // Allow a small tolerance for scrollWidth to clientWidth comparison
      setCanScrollLeft(el.scrollLeft > 0);
      setScrollRightState(el);
    };

    const setScrollRightState = (el) => {
       const scrollRight = el.scrollLeft + el.clientWidth;
       // Check if scrollRight is very close to scrollWidth (within 5px tolerance)
       setCanScrollRight(scrollRight < el.scrollWidth - 5);
    }

    checkScroll();
    rowRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", () => setScrollRightState(rowRef.current)); // Only check right scroll on resize

    // Initial check and re-check after a short delay to allow content to render
    const initialCheckTimer = setTimeout(checkScroll, 100);

    return () => {
      rowRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", () => setScrollRightState(rowRef.current));
      clearTimeout(initialCheckTimer);
    };
  }, [items]);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <motion.section
      className="section-row relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      key={title + items.length}
    >
      <h3 className="section-title">{title}</h3>
      <div className="relative">
         {canScrollLeft && (
          <button
            className="scroll-arrow left-arrow"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
        )}
        {canScrollRight && (
          <button
            className="scroll-arrow right-arrow"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        )}
        <div
          ref={rowRef}
          className="section-cards"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item) => (
            <div
              className="section-card"
              key={item.id}
              onClick={() => onCardClick(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={item.title || item.name}
                className="section-card-img"
              />
              <div className="section-card-title">{item.title || item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SectionRow; 