import {BreadCrumbs} from '@/features/index'
import { Mail } from "lucide-react";
import { useState } from "react";
import { FAQItem } from "@/components/ui/FAQ/FAQItem";
import { faqData } from "@/libs/constants/featuredFAQ";
import toast from 'react-hot-toast';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const isNameValid = /^[A-ZА-ЯЁ][a-zа-яё]+$/.test(name);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isQuestionValid = question.trim().length > 0;

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid || !isNameValid || !isQuestionValid) return;

    try {
      await toast.promise(
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 500);
        }),
        {
          loading: 'Sending message...',
          success: 'Message sent',
          error: 'Failed to send message'
        }
      )
      setEmail('');
      setName('');
      setQuestion('');
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <section className="container w-full text-white sm:px-6">
      <div className="flex flex-col mt-[2rem]">
        <BreadCrumbs />

        <div className="container w-full py-8">
          <h1 className="text-4xl font-semibold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Find answers to common questions about orders, shipping, returns, and
            our collection of Hallownest artifacts. Can't find what you're looking
            for? Contact us below.
          </p>
        </div>
      </div>

      <div className="container w-full flex flex-col gap-3 mb-10">
        {faqData.map(item => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>

      <div className="container w-full mb-10">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-semibold">Didn't Find Your Answer?</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Send us a message and we'll get back to you within 24-48 hours.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={name}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition"
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameValid && name && (<div className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                  Name must start with a capital letter and contain only letters
                </div>)
                }
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && email && (<div className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                  Invalid email format (e.g., your@email.com)
                </div>)
                }
              </div>
            </div>
            <textarea
              placeholder="Your Question"
              value={question}
              rows="4"
              className="px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition resize-none"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="submit"
              className="cursor-pointer p-3 inline-flex justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              disabled={!isEmailValid || !isNameValid || !isQuestionValid}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};