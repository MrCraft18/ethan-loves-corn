const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    centeredSlides: false,
    on: {
        slideChangeTransitionStart(sliderWrapper) {
            sliderWrapper.slides.forEach(slide => {
                const video = slide.querySelector('video')
                if (video) video.pause()
            })
        },
        slideChangeTransitionEnd(sliderWrapper) {
            const activeVideo = sliderWrapper.slides[sliderWrapper.activeIndex].querySelector('video')
            activeVideo.play()
        }
    }
});

window.onload = async () => {
    const count = await fetch('/videoCount').then(async response => await response.text())

    const array = shuffledRange(count)

    console.log(array)
    console.log(array.length)

    array.forEach(n => {
        swiper.appendSlide(`
            <div class="media swiper-slide">
                <video loop>
                    <source src="videos/${n}.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `)
    })

    document.body.addEventListener('click', () => {
        const activeVideo = swiper.slides[swiper.activeIndex].querySelector('video')

        if (activeVideo.paused) {
            activeVideo.play()
        } else {
            activeVideo.pause()
        }
    })
}

function shuffledRange(n) {
    const arr = Array.from({ length: n }, (_, i) => i)

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}
