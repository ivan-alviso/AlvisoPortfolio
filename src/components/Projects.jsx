import React, { useState, useRef, useEffect } from "react";
import { projects } from "../data/projects";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const containerRef = useRef(null);

  // Determine which project to display (active > hover)
  const displayIndex =
    activeIndex !== null
      ? activeIndex
      : hoverIndex !== null
        ? hoverIndex
        : null;
  const activeProject = displayIndex !== null ? projects[displayIndex] : null;

  // Reset image index only when the project changes
  const prevDisplayIndex = useRef(null);

  useEffect(() => {
    if (displayIndex !== null && displayIndex !== prevDisplayIndex.current) {
      setImageIndex(0);
      prevDisplayIndex.current = displayIndex;
    }
  }, [displayIndex]);

  // Click outside to reset selection
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveIndex(null);
        setHoverIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handlers for previous/next image
  const handleNext = () => {
    
    if (!activeProject || !activeProject.images?.length) {
      return;
    }
    
    setImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % activeProject.images.length;
      return newIndex;
    });
  };

  const handlePrev = () => {
    
    if (!activeProject || !activeProject.images?.length) {
      return;
    }
    
    setImageIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + activeProject.images.length) % activeProject.images.length;
      return newIndex;
    });
  };

  return (
    <div
      className="projects-layout"
      ref={containerRef}
      onMouseLeave={() => {
        setActiveIndex(null);
        setHoverIndex(null);
      }}
    >
      <div className="project-display">
        {activeProject ? (
          <div className="project-preview-card full-image">
            <div className="project-image-gallery full">
              <button
                type="button"
                className="gallery-btn prev"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handlePrev(); 
                }}
                aria-label="Previous image"
                disabled={activeProject.images.length <= 1}
              >
                &#8592;
              </button>

              <div className="gallery-image-wrapper full">
                <img
                  key={`${displayIndex}-${imageIndex}`}
                  src={activeProject.images[imageIndex]}
                  alt={activeProject.name}
                  draggable="false"
                  className="project-image"
                />
              </div>

              <button
                type="button"
                className="gallery-btn next"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleNext(); 
                }}
                aria-label="Next image"
                disabled={activeProject.images.length <= 1}
              >
                &#8594;
              </button>
            </div>
          </div>
        ) : (
          <div className="project-preview-empty">
            <div className={`radar-sweep ${isHoveringList ? "paused" : ""}`} />
            <div className={`holo-ring ring-1 ${isHoveringList ? "paused" : ""}`} />
            <div className={`holo-ring ring-2 ${isHoveringList ? "paused" : ""}`} />
            <div className={`holo-ring ring-3 ${isHoveringList ? "paused" : ""}`} />
            <div className="crosshair-x" />
            <div className="crosshair-y" />
            <div className="sonar-core" />
            <div className="project-display-label empty">
              SELECT A PROJECT TO PREVIEW
            </div>
          </div>
        )}
      </div>

      <div
        className="project-list"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => setIsHoveringList(false)}
      >
        {projects.map((proj, index) => (
          <div
            key={proj.name}
            className={`project-card
              ${activeIndex === index ? "active" : ""} 
              ${hoverIndex === index && activeIndex === null ? "hovered" : ""}
              `}
            onMouseEnter={() => {
              if (activeIndex === null) setHoverIndex(index);
            }}
            onMouseLeave={() => {
              if (activeIndex === null) setHoverIndex(null);
            }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="project-card-title-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <span className="project-card-title">{proj.name}</span>
              <div className="project-languages">
                {proj.languages?.map((lang) => (
                  <span key={lang} className="language-pill">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-details">
              {activeIndex === index ? (
                <>
                  <p>{proj.desc}</p>
                </>
              ) : (
                <p className="project-preview-hint">Click to view details</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;