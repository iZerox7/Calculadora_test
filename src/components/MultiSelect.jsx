import React, { useState } from 'react';

// --- Componente MultiSelect ---
const MultiSelect = ({ question, value, onChange }) => {
  const [selected, setSelected] = useState(value || []);

  const handleSelect = (optionValue) => {
  const selectedArr = Array.isArray(selected) ? selected : [];
  const option = question.options.find(o => o.value === optionValue);

  let newSelected;

  // 1️⃣ Si la opción es excluyente (ej: no_cumple)
  if (option?.exclusive) {
    newSelected = selectedArr.includes(optionValue) ? [] : [optionValue];
  } 
  // 2️⃣ Opción normal
  else {
    // Quitar cualquier opción excluyente previa
    const withoutExclusive = selectedArr.filter(v => {
      const opt = question.options.find(o => o.value === v);
      return !opt?.exclusive;
    });

    if (withoutExclusive.includes(optionValue)) {
      newSelected = withoutExclusive.filter(v => v !== optionValue);
    } else {
      newSelected = [...withoutExclusive, optionValue];
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