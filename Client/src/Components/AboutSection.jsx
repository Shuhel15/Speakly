import { motion } from "framer-motion";
import { FiArrowUpRight, FiBarChart2, FiCpu, FiMessageCircle } from "react-icons/fi";

const stats = [
  {
    value: "24/7",
    label: "always-on support",
    icon: FiMessageCircle,
  },
  {
    value: "1 min",
    label: "fast setup",
    icon: FiArrowUpRight,
  },
  {
    value: "Smarter",
    label: "AI-powered answers",
    icon: FiCpu,
  },
  {
    value: "Track",
    label: "visitor interactions",
    icon: FiBarChart2,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function AboutSection() {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center"
        >
          <motion.div variants={item} className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 text-green-600 text-xs sm:text-sm font-semibold shadow-sm">
              About Speakly AI
            </span>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#081028] leading-tight">
                A conversational assistant that feels like part of your product.
              </h2>
              <p className="text-base sm:text-lg text-[#64748b] leading-relaxed max-w-2xl">
                Speakly AI helps you turn static pages into interactive experiences.
                Visitors can ask questions, discover key information, and move toward action without leaving the page.
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={item}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="rounded-[24px] bg-white border border-gray-100 shadow-[0_12px_40px_rgba(8,16,40,0.05)] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-2xl font-black text-[#081028]">{stat.value}</p>
                        <p className="mt-1 text-sm text-[#64748b] capitalize">{stat.label}</p>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-linear-to-r from-green-400 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-[0_12px_24px_rgba(16,185,129,0.22)]">
                        <Icon size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="relative rounded-[32px] bg-white border border-gray-100 shadow-[0_18px_70px_rgba(8,16,40,0.08)] p-6 sm:p-8 overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-green-400 via-emerald-500 to-lime-400" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-green-200/30 blur-3xl" />
            <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="relative space-y-6">
              <div className="rounded-[28px] bg-[#081028] text-white p-6 sm:p-7">
                <p className="text-sm uppercase tracking-[0.25em] text-white/50">Why it works</p>
                <p className="mt-4 text-xl sm:text-2xl font-semibold leading-snug">
                  Designed for modern websites that need clarity, speed, and a more human first touch.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Matches your brand tone",
                  "Guides users to the right action",
                  "Works across desktop and mobile",
                  "Improves engagement without extra friction",
                ].map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-gray-100 bg-[#f8fafc] px-4 py-4 text-sm font-medium text-[#081028]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;