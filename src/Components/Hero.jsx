
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBrand } from "../Redux/Tabs";
import CarModel from "./CarModel";

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const Hero = () => {
  const brands = [
    "Lexus",
    "BMW",
    "Ferrari",
    "Mercedes Benz",
    "Toyota",
  ];

  const branded = useSelector(
    (state) => state.tabs.brandsTab
  );

  const dispatch = useDispatch();

  return (
    <motion.section
      className="hero-content"
      initial="hidden"
      animate="visible"
    >
      {/* Hero heading */}
      <motion.div
        className="hero-heading"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          The <span>Freedom</span> to Drive Differently
        </motion.h1>

        <motion.p variants={fadeUp}>
          From short trips to long-term ownership,
          <br />
          everything starts here.
        </motion.p>

        <motion.a
          href="#vehicles"
          className="explore-button"
          variants={fadeUp}
          whileHover={{
            scale: 1.06,
            transition: { duration: 0.25 },
          }}
          whileTap={{ scale: 0.96 }}
        >
          Explore Now <span>↗</span>
        </motion.a>
      </motion.div>

      {/* 3D car stage */}
      <motion.div
        className="car-stage"
        id="vehicles"
        initial={{ opacity: 0, scale: 0.9, y: -35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="car-glow"
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Canvas
          camera={{ position: [1, 2, 7], fov: 25 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={3}
          />

          <directionalLight
            position={[-5, 3, -5]}
            intensity={2}
          />

          <Suspense fallback={null}>
            <CarModel />

            <Environment preset="city" />

            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.45}
              scale={10}
              blur={2}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </motion.div>

      {/* Performance specifications */}
      <motion.div
        className="spec spec-engine"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <strong>6.5L V12</strong>
        <small>Hybrid Powertrain</small>
      </motion.div>

      <motion.div
        className="spec spec-range"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <strong>
          600<small> KM</small>
        </strong>
        <span>Driving Range</span>
      </motion.div>

      <motion.div
        className="spec spec-years"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.9 }}
      >
        <strong>
          30<small> Year</small>
        </strong>
        <span>Forward</span>
      </motion.div>

      {/* Social links */}
      <motion.aside
        className="social-bar"
        variants={fadeLeft}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        {[
          ["f", "Facebook"],
          ["𝕏", "X"],
          ["◎", "Instagram"],
          ["＠", "Threads"],
        ].map(([symbol, label], index) => (
          <motion.a
            key={label}
            href="#"
            aria-label={label}
            className={
              index === 1 ? "social-highlight" : ""
            }
            whileHover={{
              scale: 1.2,
              y: -3,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {symbol}
          </motion.a>
        ))}
      </motion.aside>

      {/* Brand selector */}
      <motion.div
        className="brand-selector"
        variants={staggerContainer}
      >
        {brands.map((brand, index) => (
          <motion.button
            key={brand}
            className={
              branded === brand
                ? "brand active-brand"
                : "brand"
            }
            variants={fadeUp}
            whileHover={{
              y: -4,
              scale: 1.04,
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={() => dispatch(setActiveBrand(brand))}
          >
            {brand}
          </motion.button>
        ))}
      </motion.div>

      {/* Vehicle preview card */}
      <motion.div
        className="vehicle-card"
        variants={fadeRight}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.8,
          duration: 0.9,
          ease: "easeOut",
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.3 },
        }}
      >
        <motion.button
          className="add-button"
          aria-label="Add vehicle"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>

        <motion.div
          className="color-options"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {["orange", "black", "white", "blue", "green"].map(
            (color) => (
              <motion.span
                key={color}
                className={`color ${color}`}
                variants={fadeUp}
                whileHover={{ scale: 1.2 }}
              />
            )
          )}
        </motion.div>

        <motion.div
          className="vehicle-preview"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <img
            src="https://p.turbosquid.com/ts-thumb/5g/XwQsRk/q4/7/jpg/1636639357/1920x1080/fit_q87/57dab3111be94b5b69a270dc266465d11dead537/7.jpg"
            alt="Vehicle preview"
          />

          <span className="range-label">
            Driving Range
          </span>
        </motion.div>

        <p>
          Engineered for Precision, Power,
          <br />
          and Everyday Control
        </p>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
