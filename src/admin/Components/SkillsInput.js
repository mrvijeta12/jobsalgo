import { useState } from "react";
import styles from "../assets/admin.module.css";
import React, { forwardRef } from "react";

const SkillsInput = React.forwardRef((props, ref) => {
  const { value, onChange } = props;
  const [input, setInput] = useState("");

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !value.includes(skill.toLowerCase())) {
      onChange([...value.map((s) => s.toLowerCase()), skill.toLowerCase()]);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (["Enter", " ", ","].includes(e.key)) {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => {
    onChange(value.filter((s) => s !== skill));
  };

  return (
    <div
      className="w-100 border rounded p-2 d-flex flex-wrap gap-2"
      style={{ cursor: "text" }}
      ref={ref}
    >
      {/* Show tags */}
      {value.map((skill) => (
        <span
          key={skill}
          className={`${styles.SkillsInput} px-2 py-1 bg-primary text-white rounded d-flex align-items-center mr-2`}
        >
          {skill}
          <button
            type="button"
            className="ms-2 text-white fw-bold ml-2"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              outline: "none",
              boxShadow: "none",
            }}
            onClick={() => removeSkill(skill)}
          >
            ×
          </button>
        </span>
      ))}

      {/* Input field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? "Type a skill and press Space…" : ""}
        className="border-0 flex-grow-1"
        style={{ outline: "none" }}
      />
    </div>
  );
});

export default SkillsInput;
