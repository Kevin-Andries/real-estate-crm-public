import { motion } from "framer-motion";

type Props = {
	children: JSX.Element;
};

const BasicTransitionB = ({ children }: Props) => {
	return (
		<motion.div
			className="bg-white w-screen h-screen fixed top-0 right-0 overflow-y flex flex-col z-50"
			initial={{ opacity: 0.4, x: -200, y: 0 }}
			animate={{
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.4,
					ease: [0.2, 0.4, 0.8, 0.9],
				},
			}}
		>
			{children}
		</motion.div>
	);
};

export default BasicTransitionB;
