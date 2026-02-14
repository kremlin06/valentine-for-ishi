import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { randomInRange, randomFromArray } from '../../utils/performance';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const Confetti = ({ active }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationId = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF006E', '#3A86FF', '#FFAFCC', '#EF476F', '#FFF5F7'];
    const particleCount = 150;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: randomInRange(0, canvas.width),
        y: randomInRange(-canvas.height, 0),
        size: randomInRange(5, 15),
        speedX: randomInRange(-2, 2),
        speedY: randomInRange(2, 5),
        color: randomFromArray(colors),
        rotation: randomInRange(0, 360),
        rotationSpeed: randomInRange(-5, 5),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Gravity
        particle.speedY += 0.1;

        // Remove particles that are off screen
        if (particle.y > canvas.height + 20) {
          particles.current.splice(index, 1);
          return;
        }

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      if (particles.current.length > 0) {
        animationId.current = requestAnimationFrame(animate);
      }
    };

    animate();

    // Cleanup after 5 seconds
    const cleanup = setTimeout(() => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      particles.current = [];
    }, 5000);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      clearTimeout(cleanup);
    };
  }, [active]);

  if (!active) return null;

  return <Canvas ref={canvasRef} />;
};

export default Confetti;
