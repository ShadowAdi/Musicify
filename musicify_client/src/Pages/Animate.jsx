import { motion } from "framer-motion";
import "../App.css";

 const Animate = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="slide-in"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="slide-Out"
      />
    </>
  );
};
export default Animate;
