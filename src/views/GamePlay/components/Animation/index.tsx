import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import _ from 'lodash';

const options2 = {
	items: 1,
	nav: false,
	dots: false,
	autoplay: true,
	smartSpeed: 500,
	animateOut: 'fadeOut',
	animateIn: 'fadeIn',
	loop: true,
};

const Animation: React.FC = () => {
	return (
		<>
			<div className="hoatop fixed shake">
				<div>
					<img src={require('src/image/hoamai.png')} />
				</div>
			</div>
			<div className="canhhoa fixed">
				<div className="snowflakes">
					{_.times(10).map(() => (
						<div className="snowflake">
							<img src={require('src/image/hoamai1.png')} alt="" />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default React.memo(Animation);
