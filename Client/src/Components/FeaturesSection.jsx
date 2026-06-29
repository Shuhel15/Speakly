import { motion } from "framer-motion";
import { FiCpu, FiLayers, FiMessageSquare, FiShield, FiSmartphone, FiZap } from "react-icons/fi";

const features = [
  {
    icon: FiMessageSquare,
    title: "Conversational answers",
    desc: "Let visitors ask natural questions and get helpful responses in real time.",
  },
  {
    icon: FiZap,
    title: "Quick setup",
    desc: "Create, train, and embed the assistant with a fast onboarding flow.",
  },
  {
    icon: FiLayers,
    title: "Theme customization",
    desc: "Adapt the assistant's feel so it fits your site's visual language.",
  },
  {
    icon: FiShield,
    title: "Secure integration",
    desc: "Built to work smoothly with your existing site and assistant settings.",
  },
  {
    icon: FiSmartphone,
    title: "Mobile-friendly UI",
    desc: "The experience stays polished and usable on smaller screens too.",
  },
  {
    icon: FiCpu,
    title: "Smart AI behavior",
    desc: "Connect Gemini-driven responses to create an assistant that feels useful.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function FeaturesSection() {
  return (
    <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f8fafc] border border-gray-100 text-green-600 text-xs sm:text-sm font-semibold shadow-sm"
          >
            Features
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#081028]"
          >
            Everything you need to launch a helpful assistant.
          </motion.h2>
          <motion.p
            variants={item}
            className="text-[#64748b] mt-4 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto"
          >
            The product is focused on a clean setup flow, a polished live widget,
            and tools that make the assistant easy to own.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="rounded-[28px] bg-[#f8fafc] border border-gray-100 p-6 shadow-[0_12px_40px_rgba(8,16,40,0.05)] hover:bg-white hover:shadow-[0_18px_55px_rgba(8,16,40,0.08)] transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-green-400 to-emerald-500 text-white flex items-center justify-center shadow-[0_12px_24px_rgba(16,185,129,0.22)]">
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#081028]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#64748b]">{feature.desc}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;