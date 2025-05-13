function lenisAnimation(){
	const lenis=new Lenis({
		duration: 2,
		smooth: true,
		smoothTouch: true,
		direction: 'vertical',
		easing: t => Math.min(1, 1.001-Math.pow(2, -10*t))
	});

	function raf(time){
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
}