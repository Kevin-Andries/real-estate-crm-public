import { Link } from "react-router-dom";

const HomePageIntro = () => {
	return (
		<section
			className="

        max-w-screen-xl
        px-6 px-xl-0
        w-full
        mx-auto
		my-8
        md:my-20
        flex
		flex-col
		lg:flex-row
        justify-center
    "
		>
			<div className="left w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start md:pr-8 max-w-3xl mx-auto lg:mx-0">
				<h1 className="text-center lg:text-left my-4">
					Everyone deserves its own property
				</h1>
				<p className="text-center lg:text-left my-4">
					We provide a service to help you to sell your property, or
					purchase a new one. Easimmo has already helped more than 150
					seller to find a buyer and vice versa.
				</p>
				<div className="flex flex-col md:flex-row justify-start my-6">
					<Link to="/registration" className="btn">
						I am a seller
					</Link>
					<Link
						to="/find-estate"
						className="my-3 md:my-0 md:ml-8 btn"
					>
						I am a buyer
					</Link>
					<Link
						to="/login"
						className="
                    md:ml-8
                    whitespace-nowrap
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-2
                    rounded-md
                    text-base
                    font-medium
                    underline
                "
					>
						Find out more
					</Link>
				</div>
			</div>
			<div className="right w-full lg:w-1/2 flex justify-center items-center">
				<img
					className="rounded-lg object-cover w-full max-h-96 max-w-2xl"
					src="images/introPicture.jpg"
					alt="introPicture"
				/>
			</div>
		</section>
	);
};

export default HomePageIntro;
