import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Stars, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative  bg-[#000000]  overflow-hidden bg-gradient-to-b  min-h-[60vh] flex items-center justify-center pt-8 px-2 md:px-10 text-white">
      <div className="max-w-3xl text-center">
        {/* ⭐ Floating Star on Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 text-purple-400 animate-bounce"
        >
          <Stars size={24} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 text-base font-medium  border border-purple-300 text-purple-300 rounded-full shadow-md mb-6"
        >
          <Star size={16} className="mr-2 text-purple-300" />
          AI Prompt Engineering Made Simple
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 mb-4"
        >
          Craft Perfect AI Prompts
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          Discover and share powerful prompts for AI models.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-md transition-all duration-300">
            ✨ Create Prompt
          </button>

          <button className="px-6 py-3 rounded-full bg-black/20 border border-white/30 hover:bg-white/10 text-white font-semibold shadow-inner transition-all duration-300 flex items-center space-x-2">
            <span>💬</span>
            <span>Browse Prompts</span>
          </button>
        </motion.div>

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid place-items-center mt-12 text-gray-400 animate-bounce"
        >
          <ArrowDown className="flex items-center" />
        </motion.div>
      </div>
    </section>
  );
}
