import React from 'react';

function Question({ question, answers, onAnswer }) {
  return (
    <div className="my-6">
      <h3
        className="text-2xl font-medium text-gray-800 mb-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow hover:shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;