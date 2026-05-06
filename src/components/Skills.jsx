import React from "react";

export default function Skills({ onHoverSkill }) {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Java", level: 80, logo: "https://www.vectorlogo.zone/logos/java/java-icon.svg" },
        { name: "Kotlin", level: 70, logo: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg" },
        { name: "Python", level: 80, logo: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
        { name: "JavaScript", level: 50, logo: "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React", level: 65, logo: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" },
        { name: "Node.js", level: 50, logo: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" },
        { name: "Vite", level: 45, logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" },
        { name: "Tailwind", level: 30, logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL", level: 65, logo: "https://www.vectorlogo.zone/logos/mysql/mysql-ar21~bgwhite.svg" },
        { name: "Firebase Database", level: 80, logo: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" }
      ]
    },
    {
      title: "Design",
      skills: [
        { name: "Photoshop", level: 100, logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/adobe-photoshop-icon.png" },
        { name: "Illustrator", level: 90, logo: "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" },
        { name: "Figma", level: 65, logo: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg" },
        { name: "HTML", level: 70, logo: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg" },
        { name: "CSS", level: 60, logo: "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg" }
      ]
    }
  ];

  return (
    <div className="skills-container">
      {skillCategories.map((category, idx) => (
        <div key={idx} className="skill-category">
          <div className="category-header">
            <h3 className="category-title">{category.title}</h3>
          </div>

          <div className="skills-grid">
            {category.skills.map((skill, i) => (
              <div
                key={i}
                className="skill-tile"
                onMouseEnter={() => onHoverSkill(skill.level, skill.name)}
                onMouseLeave={() => onHoverSkill(0, null)}
              >
                <div className="skill-logo">
                  <img src={skill.logo} alt={skill.name} draggable="false" />
                </div>
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}