import { motion } from "framer-motion";

type Props = {
	children: JSX.Element;
};

const BasicTransition = ({ children }: Props) => {
	return (
		<motion.div
			className="w-full"
			initial={{ opacity: 0.4, z: -2000 }}
			animate={{
				opacity: 1,
				z: 0,
				transition: {
					duration: 0.3,
					ease: [0.1, 0.3, 0.88, 0.4],
				},
			}}
		>
			{children}
		</motion.div>
	);
};

export default BasicTransition;
