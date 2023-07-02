import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumb";
import "./publicEstatePageCarousel.css";

const PublicEstatePageCarousel = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
	const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
		containScroll: "keepSnaps",
		selectedClass: "",
		dragFree: true,
	});

	const onThumbClick = useCallback(
		(index) => {
			if (!embla || !emblaThumbs) return;
			if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
		},
		[embla, emblaThumbs]
	);

	const onSelect = useCallback(() => {
		if (!embla || !emblaThumbs) return;
		setSelectedIndex(embla.selectedScrollSnap());
		emblaThumbs.scrollTo(embla.selectedScrollSnap());
	}, [embla, emblaThumbs, setSelectedIndex]);

	useEffect(() => {
		if (!embla) return;
		onSelect();
		embla.on("select", onSelect);
	}, [embla, onSelect]);

	const SLIDE_COUNT = 10;
	const slides = Array.from(Array(SLIDE_COUNT).keys());

	return (
		<>
			<div className="embla">
				<div className="embla__viewport" ref={mainViewportRef}>
					<div className="embla__container">
						{slides.map((index) => (
							<div className="embla__slide" key={index}>
								<div className="embla__slide__inner">
									<img
										className="embla__slide__img"
										src="/images/main_banner.png"
										alt="A cool cat."
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="embla embla--thumb">
				<div className="embla__viewport" ref={thumbViewportRef}>
					<div className="embla__container embla__container--thumb">
						{slides.map((index) => (
							<Thumb
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								imgSrc="/images/login_real_estate_2.jpg"
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default PublicEstatePageCarousel;
