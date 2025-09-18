import { motion } from "framer-motion";
import PageWrapper from "./PageWrapper";

const cards = [
  { title: "Monthly Budget", value: "₹50,000", accent: "text-blue-600" },
  { title: "Total Expenses", value: "₹32,000", accent: "text-red-600" },
  { title: "Available Balance", value: "₹18,000", accent: "text-emerald-600" },
  { title: "Total Savings", value: "₹30,500", accent: "text-indigo-600" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ModernFinanceDashboard() {
  return (
    <PageWrapper>
      <div className="min-h-screen animated-gradient-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold">₹</div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">FinanceTracker</h1>
                <p className="text-xs text-slate-500">Professional Budget Management</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow transition">
              + Add Transaction
            </button>
          </motion.header>

          {/* Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                variants={item}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="glass-card p-5"
              >
                <div className="text-sm text-slate-500">{c.title}</div>
                <div className={`text-2xl font-semibold ${c.accent}`}>{c.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}


