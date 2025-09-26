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

let array

window.onload = async () => {
    const count = await fetch('/videoCount').then(async response => await response.text())

    array = shuffledRange(count)

    for (let i = 0; i < 2; i++) {
        const n = array.shift()

        swiper.appendSlide(`
            <div class="media swiper-slide">
                <video loop>
                    <source src="videos/${n}.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `)
    }

    document.body.addEventListener('click', () => {
        const activeVideo = swiper.slides[swiper.activeIndex].querySelector('video')

        if (activeVideo.paused) {
            activeVideo.play()
        } else {
            activeVideo.pause()
        }
    })
}

let previousIndex = swiper.activeIndex
let swipeUpCount = 0

swiper.on('slideChange', async () => {
    let currentIndex = swiper.activeIndex

    console.log(currentIndex)

    if (currentIndex > previousIndex && swipeUpCount == 0) {
        const n = array.shift()

        if (n) swiper.appendSlide(`
            <div class="media swiper-slide">
                <video loop>
                    <source src="videos/${n}.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `)
    } else if (currentIndex > previousIndex && swipeUpCount > 0) {
        swipeUpCount--
    } else if (currentIndex < previousIndex) {
        swipeUpCount++
    }

    previousIndex = currentIndex;

    Array.from(document.querySelectorAll('video')).forEach(video => video.fastSeek(0))
});

function shuffledRange(n) {
    const arr = Array.from({ length: n }, (_, i) => i)

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}
