import { ChevronDown } from "lucide-react";

export const FAQItem = ({ item, isOpen, onToggle }) => {
  const { question, answer } = item;

  console.log('Rendering FAQItem:', question);
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden transition-colors hover:border-neutral-600">
      <button
        onClick={onToggle}
        className="w-full cursor-pointer flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-5 pb-5 text-gray-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
};