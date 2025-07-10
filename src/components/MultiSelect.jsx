import React, { useState } from 'react';

// --- Componente MultiSelect ---
const MultiSelect = ({ question, value, onChange }) => {
  const [selected, setSelected] = useState(value || []);

  const handleSelect = (optionValue) => {
    let newSelected;
    if (optionValue === "ninguno") {
      newSelected = selected.includes("ninguno") ? [] : ["ninguno"];
    } else {
      if (selected.includes(optionValue)) {
        newSelected = selected.filter((v) => v !== optionValue && v !== "ninguno");
      } else {
        newSelected = [...selected.filter((v) => v !== "ninguno"), optionValue];
      }
    }
    setSelected(newSelected);
    onChange(question.id, newSelected);
  };

  return (
    <div className="flex flex-col space-y-2">
      {question.options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={`p-3 rounded-lg text-left transition-colors duration-200 border ${
            selected.includes(option.value)
              ? "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MultiSelect;