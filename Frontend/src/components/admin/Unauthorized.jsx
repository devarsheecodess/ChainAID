import React, { useEffect, useRef } from 'react';

const Unauthorized = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasDimensions();
        window.addEventListener('resize', setCanvasDimensions);

        // Create particles
        const particlesArray = [];
        const numberOfParticles = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 255)}, 0.8)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1a1a2e');
            gradient.addColorStop(1, '#16213e');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            // Connect nearby particles with lines
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 100, 255, ${0.2 - distance / 500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
            {/* Canvas background */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full -z-10"
            />

            {/* Content container */}
            <div className="max-w-md w-full mx-4 md:mx-auto bg-black bg-opacity-40 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                {/* Red top border */}
                <div className="h-1 w-full bg-gradient-to-r from-red-500 to-red-600"></div>

                {/* Content */}
                <div className="p-8">
                    {/* Lock icon */}
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 rounded-full bg-gray-800 bg-opacity-50 border-2 border-red-500 flex items-center justify-center">
                            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Title with glitch effect */}
                    <h1 className="text-center text-3xl font-bold text-white mb-2 relative">
                        <span className="relative inline-block after:content-['ACCESS_DENIED'] after:absolute after:left-0 after:top-0 after:-ml-0.5 after:text-red-500 after:opacity-70">ACCESS DENIED</span>
                    </h1>

                    <div className="h-0.5 w-24 bg-red-500 mx-auto mb-6"></div>

                    <p className="text-center text-gray-300 mb-6">
                        You don't have permission to access this resource.
                    </p>

                    {/* Error code */}
                    <div className="text-center mb-6">
                        <span className="inline-block px-3 py-1 rounded-md bg-red-500 bg-opacity-20 text-white font-mono text-sm">
                            Error 401: Unauthorized
                        </span>
                    </div>

                    {/* Action button */}
                    <div className="text-center">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200 shadow-lg"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;