window.onload=function(){

	//For collapsing menu
	setInterval(function(){
		if($(window).width()>500){
			$('#linkList').show();
		}
	},10);

	$(function(){
		$('#jq-menu').click(function(){
			$('#linkList').slideToggle(500);
		});
	});

	//For carousel
	if($('.carousel').length > 0){
		const carouselImages=document.querySelectorAll('.carouselImage');
		const track=document.querySelector('.carouselTrack');
		const slides=Array.from(track.children);
		const previousButton=document.querySelector('.carouselButtonLeft');
		const nextButton=document.querySelector('.carouselButtonRight');
		const navCircles=document.querySelector('.carouselNav');
		const dots = Array.from(navCircles.children);


		//Display all once loaded
		const displayImages=(image,index)=>{	
			image.style.display='block';
		}

		//Arrangement left to right
		const setSlidePosition=(slide,index)=>{
			let slideSize=slides[0].getBoundingClientRect();
			let slideWidth=slideSize.width;
			slide.style.left=slideWidth*index+'px';
		}

		//Display images in a row
		carouselImages.forEach(displayImages);
		slides.forEach(setSlidePosition);

		const moveToSlide=(track, currentSlide, targetSlide)=>{
			track.style.transform='translateX(-'+targetSlide.style.left+')';
			currentSlide.classList.remove('currentSlide');
			targetSlide.classList.add('currentSlide');
		}

		const upDateDots=(currentDot, targetDot)=>{
			currentDot.classList.remove('currentSlide')
			targetDot.classList.add('currentSlide')
		}

		//Indicators to change slide on click
		navCircles.addEventListener('click',event=>{
			const targetDot=event.target.closest('button');
			if(!targetDot) return;
			const currentSlide=track.querySelector('.currentSlide');
			const currentDot=navCircles.querySelector('.currentSlide');
			const targetIndex=dots.findIndex(dot=> dot===targetDot);
			const targetSlide=slides[targetIndex];

			moveToSlide(track, currentSlide, targetSlide);
			upDateDots(currentDot, targetDot);
		})

		nextButton.addEventListener('click', event=>{
			const currentSlide=track.querySelector('.currentSlide');
			if(currentSlide.nextElementSibling){
				var nextSlide=currentSlide.nextElementSibling;
			} else {
				var nextSlide = slides[0];
			}

			moveToSlide(track,currentSlide,nextSlide);

			const currentDot=navCircles.querySelector('.currentSlide');
			const nextDot=currentDot.nextElementSibling;

			upDateDots(currentDot, nextDot);
		});

		previousButton.addEventListener('click', event=>{
			const currentSlide=track.querySelector('.currentSlide');
			if(currentSlide.previousElementSibling){
				var previousSlide=currentSlide.previousElementSibling;
			} else {
				var previousSlide = slides[slides.length - 1];
			}

			moveToSlide(track,currentSlide,previousSlide);

			const currentDot=navCircles.querySelector('.currentSlide');
			const previousDot=currentDot.previousElementSibling;

			upDateDots(currentDot, previousDot);
		});

		// Fix carousel on resize
		$(window).on('resize', function(){
			slides.forEach(setSlidePosition);
		});
	}


	//Fade "Ice Cream"
	const iceCream = document.getElementById('siteDesc');
	document.addEventListener('scroll',function(){
		iceCream.style.opacity=iceCream.getBoundingClientRect().top/100;
	});
}