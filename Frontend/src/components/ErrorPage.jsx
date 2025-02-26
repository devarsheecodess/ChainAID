import React, { useEffect, useRef } from 'react';
import { Home, ArrowRight } from 'lucide-react';

const ErrorPage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas dimensions to match the window
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Particles setup
        const particlesArray = [];
        const numberOfParticles = 100;

        // Chain links - will represent the blockchain theme
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = Math.random() > 0.5 ? '#38bdf8' : '#8b5cf6'; // Teal and Indigo
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary detection with bounce
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        const init = () => {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        init();

        // Connect particles with lines if they're close enough
        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(132, 90, 223, ${opacityValue})`; // Indigo with dynamic opacity
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
            {/* Background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full -z-10"
            />

            {/* Content */}
            <div className="relative z-10 bg-indigo-900 bg-opacity-30 backdrop-blur-lg p-12 rounded-xl border border-indigo-500/30 shadow-2xl text-center max-w-xl mx-4">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-white">
                            4<span className="inline-block animate-pulse text-teal-400">0</span>4
                        </div>
                        <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 to-teal-400 rounded-full"></div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-white">Oops! Connection Broken</h1>
                <p className="text-lg text-indigo-100 mb-8">
                    The route you're looking for seems to be missing from our network.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="/" className="flex items-center justify-center px-6 py-3 bg-white text-indigo-700 hover:bg-gray-400  font-medium rounded-lg transition duration-300">
                        <Home size={18} className="mr-2 text-indigo-700" />
                        <p className='text-indigo-700'>Back to Home</p>
                    </a>
                </div>

                <div className="mt-12 pt-6 border-t border-indigo-400/30">
                    <p className="text-indigo-200">
                        © {new Date().getFullYear()} ChainAid - All rights reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;