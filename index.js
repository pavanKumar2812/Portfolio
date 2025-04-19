$(document).ready(function () 
{
    // Mobile Menu Toggle
    $('#mobile-menu-button').click(function () 
    {
        $('#mobile-menu').toggleClass('hidden');
        $(this).attr('aria-expanded', !$(this).attr('aria-expanded') === 'true');
    });

    $('.video-container').each(function() 
    {
        const videoContainer = $(this);
        const video = videoContainer.find('video')[0];
        const playOverlay = videoContainer.find('.play-overlay');

        videoContainer.on('click', function() 
        {
            if (video.paused || video.ended) 
                {
                video.play().then(() => {
                    videoContainer.addClass('playing');
                }).catch(error => {
                    console.error("Error playing video:", error);
                });
            } else 
            {
                video.pause();
                videoContainer.removeClass('playing');
            }
        });
    });

    startPdfImageSlider(); // Initialize PDF image slider
});

function openModal(videoPath) 
{
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");
    const source = document.getElementById("modalVideoSource");

    source.src = videoPath;
    video.load(); // Load new source
    video.play();
    modal.classList.remove("hidden");
}

function closeModal() 
{
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("modalVideo");

    video.pause();
    modal.classList.add("hidden");
}

// Function for Easy PDF Craft Image Slider
function startPdfImageSlider() {
    const slider = document.getElementById('pdf-slider');
    if (!slider) return; // Exit if the slider element doesn't exist

    const slides = slider.querySelectorAll('.slide');
    const counterDisplay = slider.querySelector('.bg-opacity-50');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[n].style.display = 'block';
        if (counterDisplay) {
          counterDisplay.textContent = `${n + 1}/${slides.length}`;
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide); // Show the first slide initially
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
}