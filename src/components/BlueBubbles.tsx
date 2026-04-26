import { motion } from "framer-motion";

const bubbles = [
  { size: 380, x: "5%", y: "8%", delay: 0, duration: 20 },
  { size: 260, x: "78%", y: "18%", delay: 2, duration: 25 },
  { size: 200, x: "58%", y: "58%", delay: 4, duration: 18 },
  { size: 320, x: "12%", y: "68%", delay: 1, duration: 22 },
  { size: 240, x: "85%", y: "78%", delay: 3, duration: 19 },
  { size: 160, x: "40%", y: "28%", delay: 5, duration: 24 },
  { size: 220, x: "30%", y: "90%", delay: 2.5, duration: 21 },
  { size: 180, x: "70%", y: "40%", delay: 1.5, duration: 23 },
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
            background: `radial-gradient(circle, hsl(var(--electric-blue) / 0.18) 0%, hsl(var(--electric-blue) / 0.06) 45%, transparent 75%)`,
            filter: "blur(8px)",
          }}
          animate={{
            y: [0, -40, 0, 25, 0],
            x: [0, 20, -15, 8, 0],
            scale: [1, 1.08, 0.94, 1.04, 1],
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
