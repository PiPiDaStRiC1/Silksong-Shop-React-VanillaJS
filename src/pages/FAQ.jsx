import {BreadCrumbs} from '@/features/index'
import { Mail } from "lucide-react";
import { useState } from "react";
import { FAQItem } from "@/components/ui/FAQ/FAQItem";
import { faqData } from "@/libs/constants/featuredFAQ";

export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="container w-full text-white px-6">
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
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            {...item}
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
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition"
              />
            </div>
            <textarea
              placeholder="Your Question"
              rows="4"
              className="px-4 py-3 rounded-lg border border-neutral-700 bg-black text-white outline-none focus:border-white transition resize-none"
            />
            <button
              type="submit"
              className="px-6 py-3 cursor-pointer rounded-lg border border-white text-white hover:bg-white hover:text-black transition-all font-semibold"
              onClick={(e) => e.preventDefault()}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};