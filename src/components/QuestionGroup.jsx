import React, { useState, useMemo } from 'react';

// --- Componente QuestionGroup ---
const QuestionGroup = ({ questions, answers, onSubmit }) => {
  const [localAnswers, setLocalAnswers] = useState(answers);

  const visibleQuestions = questions.filter(
    (q) => !q.showIf || q.showIf(localAnswers)
  );

  const handleInputChange = (id, value) => {
    setLocalAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allVisibleAnswered = useMemo(() => {
    return visibleQuestions.every(q => {
        const answer = localAnswers[q.id];
        if (q.type === 'multi') return Array.isArray(answer) && answer.length > 0;
        return answer !== undefined && answer !== null && answer !== '';
    });
  }, [visibleQuestions, localAnswers]);

  const renderInput = (q) => {
    const value = localAnswers[q.id];
    switch (q.type) {
      case "options":
      case "boolean":
        return (
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleInputChange(q.id, opt.value)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 border ${
                  value === opt.value
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case "number":
      case "text":
      case "date":
        return (
          <input
            type={q.type}
            value={value || ""}
            onChange={(e) => handleInputChange(q.id, e.target.value)}
            placeholder={q.placeholder || ""}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {visibleQuestions.map((q) => (
        <div key={q.id}>
          <label className="block text-md font-medium text-gray-700 mb-2">{q.text}</label>
          {renderInput(q)}
        </div>
      ))}
      <button
        onClick={() => onSubmit(localAnswers)}
        disabled={!allVisibleAnswered}
        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continuar
      </button>
    </div>
  );
};

export default QuestionGroup;