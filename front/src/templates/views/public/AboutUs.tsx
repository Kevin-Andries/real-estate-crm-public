// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

const AboutUs = () => {
	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<div
					className="w-full relative flex justify-center items-center"
					style={{ height: "400px" }}
				>
					<img
						className="w-full object-cover object-center"
						src="/images/about-us-panorama.webp"
						alt=""
						style={{ height: "400px" }}
					/>
				</div>
				<div className="max-w-6xl mx-auto my-8 px-6">
					<h1 className="mb-8 mt-4 text-left">What is Easimmo?</h1>
					<p className="my-4 text-left text-lg">
						Easimmo is a tool designed to help professional and
						private individual to create an account and management
						their real estate properties. <br />
						Our goal was to offer a platform simple enough that it
						could be understood and used by anyone, but also offer
						more advanced feature to make it stand out from the
						crowd.
					</p>
					<p className="my-4 text-left text-lg">
						We are adding advanced filtering options, the public
						page generation and also premium features to the project
						very soon. <br />
						If you have any suggestion, please drop us an email at
						easimmo.crm@gmail.com so we can implement more feature
						in the future and also fix existing bugs.
					</p>
					<h1 className="mb-8 mt-16 text-left">Who built it?</h1>
					<p className="my-4 text-left text-lg">
						Kévin (full-stack) and Jon (frontend) have built this
						project. We got this idea after a chat, we were looking
						to build a project to strengthen our existing skills and
						learn new tools that we rarely used before.
					</p>

					<h3 className="text-left mt-8">
						Kévin - Full-stack developer
					</h3>
					<p className="my-4 text-left text-lg">
						He likes to build and maintain database, he has done all
						the heavy lifting (advanced filtering, geolocation,
						security, handling and developing the infrastructure).{" "}
						<br />
						He has already created its own application and works in
						the IT industry as a freelancer.
						<br />
						<br />
						You can reach out to him here.
					</p>

					<h3 className="text-left mt-8">
						Jon - Front-end developer
					</h3>

					<p className="my-4 text-left text-lg">
						He has created the design of the website (wireframes on
						Figma, making sure everything is responsive and
						cross-browser compatibility). He is mostly working with
						ReactJS and NextJS on a daily basis. <br />
						Focusing on improving his existing design skills and
						learning more about building websites that converts
						(sales).
						<br />
						<br />
						More info about him{" "}
						<a
							href="https://amethyst-fruit-de8.notion.site/Jon-Hualde-Remote-Frontend-Developer-ba5bc0561d474ff1ab80712ff8681230"
							target="_blank"
							rel="noreferrer"
							className="underline text-blue-500"
						>
							here
						</a>
						.
					</p>
				</div>
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default AboutUs;
