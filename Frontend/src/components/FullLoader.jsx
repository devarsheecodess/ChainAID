import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    // Create 6 bars for the wave effect
    const bars = Array.from({ length: 6 });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-1">
                {bars.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: '16px' }}
                        animate={{
                            height: ['16px', '32px', '16px'],
                            backgroundColor: [
                                'rgb(59, 130, 246)', // blue-500
                                'rgb(147, 51, 234)', // purple-600
                                'rgb(59, 130, 246)'  // blue-500
                            ]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                        className="w-2 rounded-full bg-blue-500"
                    />
                ))}
            </div>

            {/* Glowing circle behind the bars */}
            <div className="absolute w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" />

            {/* Loading text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute mt-20 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
                Loading...
            </motion.div>
        </div>
    );
};

export default Loader;