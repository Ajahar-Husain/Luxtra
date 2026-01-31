import { motion } from 'framer-motion';
import './Loader.css';

const Loader = ({ fullScreen = true, size = 'medium', text = 'Loading...' }) => {
    const sizes = {
        small: { container: 40, circle: 30 },
        medium: { container: 80, circle: 60 },
        large: { container: 120, circle: 90 },
    };

    const currentSize = sizes[size] || sizes.medium;

    const containerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    const circleVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    const dotVariants = {
        animate: (i) => ({
            y: [0, -10, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
            },
        }),
    };

    return (
        <div className={`loader-wrapper ${fullScreen ? 'fullscreen' : ''}`}>
            <div className="loader-content">
                {/* Animated Logo Circle */}
                <motion.div
                    className="loader-circle-container"
                    style={{ width: currentSize.container, height: currentSize.container }}
                    variants={containerVariants}
                    animate="animate"
                >
                    <motion.div
                        className="loader-circle"
                        style={{ width: currentSize.circle, height: currentSize.circle }}
                        variants={circleVariants}
                        animate="animate"
                    />
                    <div className="loader-orbit">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className="orbit-dot"
                                style={{
                                    transform: `rotate(${i * 120}deg) translateX(${currentSize.container / 2}px)`,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Brand Text */}
                <motion.div
                    className="loader-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="loader-brand">Luxtra</span>
                    <div className="loader-dots">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className="loader-dot"
                                custom={i}
                                variants={dotVariants}
                                animate="animate"
                            />
                        ))}
                    </div>
                </motion.div>

                {text && <p className="loader-message">{text}</p>}
            </div>
        </div>
    );
};

export default Loader;
