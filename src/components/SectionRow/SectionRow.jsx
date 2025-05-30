import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./SectionRow.css";

const SectionRow = ({ title, items, onCardClick, genreNames }) => {
  const rowRef = useRef(null);

  return (
    <motion.section
      className="section-row"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      key={title + items.length}
    >
      <h3 className="section-title">{title}</h3>
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
    </motion.section>
  );
};

export default SectionRow; 