import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

export const SpeakingVisualizer = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const mainControls = useAnimation();
  const circle1Controls = useAnimation();
  const circle2Controls = useAnimation();
  const circle3Controls = useAnimation();

  const circleControls = useMemo(
    () => [circle1Controls, circle2Controls, circle3Controls],
    [circle1Controls, circle2Controls, circle3Controls],
  );

  useEffect(() => {
    if (isSpeaking) {
      mainControls.start({
        scale: [1, 1.1, 1],
        backgroundColor: ["#22d3ee", "#06b6d4", "#22d3ee"],
        opacity: [0.9, 0.8, 0.9],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      });

      // Animate the surrounding circles in a wave pattern
      circleControls.forEach((control, index) => {
        control.start({
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, index % 2 === 0 ? 10 : -10, 0],
          y: [0, index % 2 === 0 ? -10 : 10, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: index * 0.2,
          },
        });
      });
    } else {
      // Reset all animations when not speaking
      mainControls.start({
        scale: 1,
        backgroundColor: "#22d3ee",
        transition: { duration: 0.3 },
      });

      circleControls.forEach((control) => {
        control.start({
          scale: 1,
          opacity: 0.5,
          x: 0,
          y: 0,
          transition: { duration: 0.3 },
        });
      });
    }
  }, [isSpeaking, mainControls, circleControls]);

  return (
    <div className="relative">
      {circleControls.map((control, index) => (
        <motion.div
          key={index}
          animate={control}
          className="absolute w-16 h-16 rounded-full bg-cyan-400/50"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <motion.div
        animate={mainControls}
        className="relative w-20 h-20 rounded-full bg-cyan-400/60"
      />
    </div>
  );
};
