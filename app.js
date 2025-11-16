document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const depthValueElement = document.getElementById('depth-value');
    const depthMarkerElement = document.getElementById('depth-marker');

    const START_DEPTH = 6000;
    const END_DEPTH = 10935;
    const DEPTH_RANGE = END_DEPTH - START_DEPTH;
    lenis.on('scroll', (e) => {
        const scrollTop = e.scroll;
        const scrollHeight = e.dimensions.scrollHeight;
        const clientHeight = e.dimensions.height;

        const maxScrollTop = scrollHeight - clientHeight;
        const scrollPercentage = Math.min(1, scrollTop / maxScrollTop);
        const currentDepth = Math.floor(START_DEPTH + (scrollPercentage * DEPTH_RANGE));

        depthValueElement.innerText = currentDepth;
        depthMarkerElement.style.height = `${scrollPercentage * 100}%`;
    });
    const heroButton = document.querySelector('.hero-cta-button');

    if (heroButton) {
        heroButton.addEventListener('click', (event) => {
            event.preventDefault();      
            lenis.scrollTo('#intro');
        });
    }

});