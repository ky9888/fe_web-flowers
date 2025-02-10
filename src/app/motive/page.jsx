"use client";

import { motion } from "framer-motion";

function Motive() {
  return (
    <motion.div
      initial={{ scale:0.7 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      className="text-center text-[30px]"
    >
      heloo
    </motion.div>
  );
}

export default Motive;
