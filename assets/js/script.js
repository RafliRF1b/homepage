(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var scrollY = $(window).scrollTop();
			var header = $('.main-header');
			var headerTop = $('.header-top'); // Marquee lo

			if (scrollY <= 200) {
				// STATE: ATAS (Sticky/Absolute)
				header.removeClass('header-fixed').addClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
				// Marquee tetap tampil di atas
				// headerTop.show(); 
				
			} else if (scrollY > 200 && scrollY <= 350) {
				// STATE: SEMBUNYI (Transisi kabur ke atas)
				header.css({
					"transform": "translateY(-100px)",
					"opacity": "0"
				});
				
			} else {
				// STATE: BAWAH (Fixed Glassy)
				header.addClass('header-fixed').removeClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
				// Marquee diumpetin pas lagi melayang biar ringkas
				// headerTop.hide();
			}
		}
	}
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
	
	headerStyle();

	$(window).on('scroll', function() {
		headerStyle();
	});

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}

	$(window).on('scroll', function() {
		var scrollPos = $(window).scrollTop();
		var btn = $('#backToTop');

		if (scrollPos > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	// Fungsi Klik: Balik ke Atas
	$('#backToTop').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 0);
	});
	
	// Loading masuk page akan di gantikan dengan fungsi berikut
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);

  // Mencegah Inspect Element dan View Source
  document.addEventListener("keydown", function (event) {
	if (
	  (event.ctrlKey &&
		(event.key === "u" ||
		  event.key === "i" ||
		  event.key === "j" ||
		  event.key === "s")) ||
	  (event.ctrlKey &&
		event.shiftKey &&
		(event.key === "I" || event.key === "J" || event.key === "C")) ||
	  event.key === "F12"
	) {
	  event.preventDefault();
	  console.log("Inspect Element telah dinonaktifkan!"); // Debugging
	}
  });
  // Mencegah Klik Kanan
  document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
  });
  // Mencegah Drag & Drop pada Semua Gambar
  document.addEventListener("dragstart", function (event) {
	event.preventDefault();
  });
  // Mencegah Klik Kanan pada Gambar Secara Spesifik
  document.querySelectorAll("img").forEach((img) => {
	img.addEventListener("contextmenu", (event) => event.preventDefault());
  });


// NUMBER COUNTING ANIMATION
const semuaAngka = document.querySelectorAll("#card-statistik span");
const container = document.getElementById("counters");

let activated = false;

window.addEventListener("scroll", () => {
    // tambahan
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // if (pageYOffset > container.offsetTop - container.offsetHeight - 200
    if (containerTop < windowHeight - 50 && !activated) {
        semuaAngka.forEach(angka => {
            angka.innerText = 0;
            let count = 0;
            function updateCount(){
                const target = parseInt(angka.dataset.count);
                if (count < target){
                    count++;
                    angka.innerText = count;
                    setTimeout(updateCount, 40);
                } else {
                    angka.innerText = target;
                }
            }
            updateCount();
            activated = true;
        });
    }
    // } else if (pageYOffset < container.offsetTop - container.offsetHeight - 500
    //     || pageYOffset === 0 && activated === true
    // ) {
    //     semuaAngka.forEach(angka => {
    //         angka.innerText = 0;
    //     });
    //     activated = false;
    // }
    if (containerTop > windowHeight) {
        semuaAngka.forEach((angka) => {
        angka.innerText = 0;
        });
        activated = false;
    }
})
// NUMBER COUNTING ANIMATION


//  FAQ SECTION - ACCORDION
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-toggle");
    accordions.forEach((accordion) => {
        accordion.addEventListener("change", function () {
        // Menutup accordion lainnya saat yang ini dibuka
        accordions.forEach((item) => {
            if (item !== this) item.checked = false;
        });
        });
    });
});

const swiper = new Swiper('.card-wrapper', {
	loop: true,
	spaceBetween: 40,

	// Pagination bullets
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// Responsive breakpoints
	breakpoints: {
		0: {
			slidesPerView: 1
		},
		768: {
			slidesPerView: 2
		},
		1280: {
			slidesPerView: 3
		},
	}
});

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-video');
    const closeBtn = document.getElementById('close-video');
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('youtube-player');
    
    const videoUrl = "https://www.youtube.com/embed/L37ebiX-0-g?autoplay=1&rel=0";

    // Buka Modal
    openBtn.addEventListener('click', () => {
        player.setAttribute('src', videoUrl);
        modal.classList.add('active'); // Memakai class CSS biasa (.active)
        document.body.style.overflow = 'hidden'; 
		document.body.classList.add('modal-open');
    });

    // Tutup Modal
    const closeModal = () => {
        player.setAttribute('src', ''); 
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
		document.body.classList.remove('modal-open');
    };

    closeBtn.addEventListener('click', closeModal);

    // Klik luar area video untuk menutup
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Tombol ESC keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

document.querySelectorAll('.btn-seemore').forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const text = btn.previousElementSibling;

		text.classList.toggle('line-clamp-1');

		if (text.classList.contains('line-clamp-1')) {
			btn.textContent = 'Lihat selengkapnya...';
		} else {
			btn.textContent = 'Lihat lebih sedikit...';
		}
	});
});

// ================= SLIDER SECTION KENALI =================
document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.querySelector(".kenali-slider-viewport");
    const sliderTrack = document.getElementById("kenali-slider-track");
    const previousButton = document.getElementById("kenali-prev");
    const nextButton = document.getElementById("kenali-next");
    const currentSlideElement = document.getElementById(
        "kenali-current-slide"
    );
    const totalSlideElement = document.getElementById(
        "kenali-total-slide"
    );

    if (
        !viewport ||
        !sliderTrack ||
        !previousButton ||
        !nextButton ||
        !currentSlideElement ||
        !totalSlideElement
    ) {
        return;
    }

    const slides = sliderTrack.querySelectorAll(".kenali-slide");
    const totalSlides = slides.length;

    let currentSlideIndex = 0;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let isDragging = false;

    const formatSlideNumber = (number) => {
        return String(number).padStart(2, "0");
    };

    const getSlideGap = () => {
        const trackStyle = window.getComputedStyle(sliderTrack);
        const gapValue =
            trackStyle.columnGap ||
            trackStyle.gap ||
            "0";

        return Number.parseFloat(gapValue) || 0;
    };

    const getSlideDistance = () => {
        return viewport.clientWidth + getSlideGap();
    };

    const getBaseTranslate = () => {
        return -(currentSlideIndex * getSlideDistance());
    };

    const setTrackPosition = (translateX, animate = true) => {
        sliderTrack.classList.toggle("is-dragging", !animate);
        sliderTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    const updateNavigation = () => {
        currentSlideElement.textContent = formatSlideNumber(
            currentSlideIndex + 1
        );

        totalSlideElement.textContent = formatSlideNumber(totalSlides);

        previousButton.disabled = currentSlideIndex === 0;
        nextButton.disabled =
            currentSlideIndex === totalSlides - 1;
    };

    const moveToCurrentSlide = (animate = true) => {
        setTrackPosition(getBaseTranslate(), animate);
        updateNavigation();
    };

    const showPreviousSlide = () => {
        if (currentSlideIndex <= 0) {
            moveToCurrentSlide();
            return;
        }

        currentSlideIndex -= 1;
        moveToCurrentSlide();
    };

    const showNextSlide = () => {
        if (currentSlideIndex >= totalSlides - 1) {
            moveToCurrentSlide();
            return;
        }

        currentSlideIndex += 1;
        moveToCurrentSlide();
    };

    const startDrag = (clientX) => {
        isDragging = true;
        dragStartX = clientX;
        dragCurrentX = clientX;

        sliderTrack.classList.add("is-dragging");
    };

    const dragSlider = (clientX) => {
        if (!isDragging) {
            return;
        }

        dragCurrentX = clientX;

        let dragDistance = dragCurrentX - dragStartX;

        const isDraggingPastFirstSlide =
            currentSlideIndex === 0 && dragDistance > 0;

        const isDraggingPastLastSlide =
            currentSlideIndex === totalSlides - 1 &&
            dragDistance < 0;

        // Resistance ketika ditarik melewati batas awal/akhir
        if (
            isDraggingPastFirstSlide ||
            isDraggingPastLastSlide
        ) {
            dragDistance *= 0.25;
        }

        const dragTranslate =
            getBaseTranslate() + dragDistance;

        setTrackPosition(dragTranslate, false);
    };

    const endDrag = () => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        sliderTrack.classList.remove("is-dragging");

        const dragDistance = dragCurrentX - dragStartX;
        const slideDistance = getSlideDistance();

        // Minimal sekitar 18% lebar slide
        const dragThreshold = Math.min(
            slideDistance * 0.18,
            120
        );

        if (
            dragDistance < -dragThreshold &&
            currentSlideIndex < totalSlides - 1
        ) {
            currentSlideIndex += 1;
        } else if (
            dragDistance > dragThreshold &&
            currentSlideIndex > 0
        ) {
            currentSlideIndex -= 1;
        }

        moveToCurrentSlide(true);
    };

    previousButton.addEventListener(
        "click",
        showPreviousSlide
    );

    nextButton.addEventListener(
        "click",
        showNextSlide
    );

    viewport.addEventListener("touchstart", (event) => {
        startDrag(event.touches[0].clientX);
    }, {
        passive: true
    });

    viewport.addEventListener("touchmove", (event) => {
        dragSlider(event.touches[0].clientX);
    }, {
        passive: true
    });

    viewport.addEventListener("touchend", endDrag);
    viewport.addEventListener("touchcancel", endDrag);

    viewport.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showPreviousSlide();
        }

        if (event.key === "ArrowRight") {
            showNextSlide();
        }
    });

    window.addEventListener("resize", () => {
        moveToCurrentSlide(false);
    });

    moveToCurrentSlide(false);
});
// ================= END SLIDER SECTION KENALI =================