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
	const carouselImages=document.querySelectorAll('.carouselImage');
	const track=document.querySelector('.carouselTrack');
	const slides=Array.from(track.children);
	const previousButton=document.querySelector('.carouselButtonLeft');
	const nextButton=document.querySelector('.carouselButtonRight');
	const navCircles=document.querySelector('.carouselNav');
	const dots = Array.from(navCircles.children);

	const slideSize=slides[0].getBoundingClientRect();
	const slideWidth=slideSize.width;


	//Display all once loaded
	const displayImages=(image,index)=>{	
		image.style.display='block';
	}

	//Arrangement left to right
	const setSlidePosition=(slide,index)=>{
		slide.style.left=slideWidth*index+'px';
	}

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


	nextButton.addEventListener('click', event=>{
		const currentSlide=track.querySelector('.currentSlide');
		const nextSlide=currentSlide.nextElementSibling;
		const currentDot=navCircles.querySelector('.currentSlide');
		const nextDot=currentDot.nextElementSibling;

		moveToSlide(track,currentSlide,nextSlide);
		upDateDots(currentDot, nextDot);
	});

	previousButton.addEventListener('click', event=>{
		const currentSlide=track.querySelector('.currentSlide');
		const previousSlide=currentSlide.previousElementSibling;
		const currentDot=navCircles.querySelector('.currentSlide');
		const previousDot=currentDot.previousElementSibling;

		moveToSlide(track,currentSlide,previousSlide);
		upDateDots(currentDot, previousDot);
	});

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


	//Fade "Ice Cream"
	const iceCream = document.getElementById('siteDesc');
	document.addEventListener('scroll',function(){
		iceCream.style.opacity=iceCream.getBoundingClientRect().top/100;
	});
}