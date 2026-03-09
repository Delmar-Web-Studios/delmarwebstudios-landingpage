import { motion } from "framer-motion";

const bubbles = [
  { size: 300, x: "5%", y: "10%", delay: 0, duration: 20 },
  { size: 200, x: "80%", y: "20%", delay: 2, duration: 25 },
  { size: 150, x: "60%", y: "60%", delay: 4, duration: 18 },
  { size: 250, x: "15%", y: "70%", delay: 1, duration: 22 },
  { size: 180, x: "90%", y: "80%", delay: 3, duration: 19 },
  { size: 120, x: "40%", y: "30%", delay: 5, duration: 24 },
];

export function BlueBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(circle, hsl(var(--electric-blue) / 0.04) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
