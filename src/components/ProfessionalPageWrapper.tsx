import { motion } from "framer-motion";
import Header from "@/components/Header";

interface ProfessionalPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ProfessionalPageWrapper = ({ children, className = "" }: ProfessionalPageWrapperProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`pt-20 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default ProfessionalPageWrapper;
