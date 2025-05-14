import React from "react";
import { motion } from "framer-motion";

interface BlobGradientProps {
  className?: string;
}

const BlobGradient: React.FC<BlobGradientProps> = ({ className }) => {
  return (
    <motion.div
      className={`absolute rounded-full filter blur-xl opacity-40 ${className}`}
      style={{
        background: "radial-gradient(circle, #118B50)",
        width: "200px",
        height: "200px",
      }}
      initial="initial"
      animate="animate"
    />
  );
};

export default BlobGradient;
