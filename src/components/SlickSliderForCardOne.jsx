import Slider from 'react-slick';
import { styled } from 'styled-components';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Style = styled.section`
	overflow: hidden;
	.swiper {
		padding-bottom: 38px;
		/* overflow: visible !important; */
	}
	.slick-dots li {
		position: relative;
		display: inline-block;
		width: 13px;
		height: 13px;
		margin: 0 5px;
		padding: 0;
		cursor: pointer;
	}
	.swiper-pagination-bullet-active {
		width: 32px;
		border-radius: 16px;
	}
	.slick-prev {
		left: -95px;
		transform: translate(0, -40px);
		z-index: 2;
	}
	.slick-next {
		right: -65px;
		transform: translate(0, -40px);
		z-index: 2;
	}
	/* .slick-slide {
    .card {
      transition: 200ms;
      border-radius: 24px;
      .layer {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 4;
        background: rgb(248, 248, 247);
        top: 0;
        left: 0;
        border-radius: 24px;
        opacity: 0.4000000059604645;
        transition: 200ms;
      }
    }
  } */
	.slick-active {
		.layer {
			opacity: 0 !important;
		}
	}
	.slick-dots {
		bottom: 0;
	}
	.slick-track {
		padding-bottom: 22px;
	}
	.slick-dots {
		ul {
			li {
				margin: 0;
			}
		}
		.custompage {
			background: #e0e0e0;
			width: 8px;
			height: 8px;
			border-radius: 50%;
		}
		.slick-active {
			width: 32px;
			margin-right: 5px;
			overflow: hidden;
			.custompage {
				transition: 250ms ease-in-out;
				overflow: hidden;
				position: relative;
				background: #e0e0e0;
				width: 32px;
				height: 8px;
				border-radius: 8px;
			}
		}
	}
	.slick-prev:before,
	.slick-next:before {
		display: none;
	}
`;
const SlickSliderForCardOne = ({ list, h388 = false, shadowShow = false }) => {
	let settings = {
		infinite: list?.length === 1 ? false : true,
		dots: list?.length === 1 ? false : true,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		spaceBetween: 30,
		autoplay: list?.length === 1 ? false : true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		//     prevArrow: <ArrowPrev />,
		//     nextArrow: <ArrowNext />,
		appendDots: dots => (
			<div>
				<ul style={{ margin: '0px' }}> {dots} </ul>
			</div>
		),
		customPaging: i => <div className='custompage'></div>,
	};

	return (
		<>
			<Style>
				<div className='container_main px-4'>
					{list && list?.length > 0 ? (
						<Slider {...settings}>
							{list?.map((item, index) => (
								<div className={`rounded-[15px] overflow-hidden group ${h388 ? 'h-[388px] ' : 'h-[173px]'}`} key={index}>
									<img
										src={item?.image}
										style={shadowShow ? { boxShadow: '4px 8px 24px 0px #235DFF26' } : {}}
										className='rounded-[15px] w-full h-full object-cover duration-500 transition-transform transform group-hover:scale-105'
										alt=''
									/>
								</div>
							))}
						</Slider>
					) : null}
				</div>
			</Style>
		</>
	);
};

export default SlickSliderForCardOne;
