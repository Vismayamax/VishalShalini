// Register GSAP plugins
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

//AOS Animation
AOS.init();

// Detect mobile/touch device
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || ('ontouchstart' in window) || (window.innerWidth <= 991);

// Cursor Pointer (desktop only)
if (!isMobile) {
    let cursor = document.querySelector(".cursor");
    let cursor2 = document.querySelector(".cursor2");
    let cursorScale = document.querySelectorAll(".cursor-scale");
    let mouseX = 0;
    let mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY,
                },
            });
            gsap.set(cursor2, {
                css: {
                    left: mouseX,
                    top: mouseY,
                },
            });
        },
    });

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    cursorScale.forEach((link) => {
        link.addEventListener("mousemove", () => {
            cursor.classList.add("grow");
            if (link.classList.contains("small")) {
                cursor.classList.remove("grow");
                cursor.classList.add("grow-small");
            }
        });

        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("grow");
            cursor.classList.remove("grow-small");
        });
    });
}

// scroll up progress indicator
let scrollPercentage = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    // On mobile ScrollSmoother is off, so scrollTop comes from documentElement
    // On desktop with ScrollSmoother it intercepts scroll on the wrapper
    let pos = document.documentElement.scrollTop || document.body.scrollTop;
    let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    let scrollValue = calcHeight > 0 ? Math.round((pos * 100) / calcHeight) : 0;

    if (scrollProgress) {
        scrollProgress.style.background = `conic-gradient(#ef96d2 ${scrollValue}%, #c0c0ff ${scrollValue}%)`;
    }
    if (progressValue) {
        progressValue.textContent = `${scrollValue}%`;
    }

    if (scrollProgress) {
        if (pos > 20) {
            scrollProgress.classList.remove("hide");
            scrollProgress.classList.add("show");
        } else {
            scrollProgress.classList.remove("show");
            scrollProgress.classList.add("hide");
        }
    }
};

// Attach scroll progress click handler once
let scrollProgress = document.getElementById("progress");
if (scrollProgress) {
    scrollProgress.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

window.onscroll = scrollPercentage;
window.onload = scrollPercentage;

// Smooth Scroll — DISABLED on mobile to restore native touch scrolling
if (!isMobile && $("#smooth-wrapper").length > 0) {
    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        ignoreMobileResize: true,
        smooth: 0.8,
        ease: "Power3.easeOut",
        effects: true,
    });
    // ScrollSmoother auto-injects overscroll-behavior:none on html+body — remove it
    document.documentElement.style.overscrollBehavior = "";
    document.body.style.overscrollBehavior = "";
} else {
    // On mobile: remove the wrapper/content constraints so the page scrolls normally
    let wrapper = document.getElementById("smooth-wrapper");
    let content = document.getElementById("smooth-content");
    if (wrapper) {
        wrapper.style.overflow = "visible";
        wrapper.style.position = "relative";
        wrapper.style.width = "100%";
        wrapper.style.height = "auto";
    }
    if (content) {
        content.style.overflow = "visible";
        content.style.position = "relative";
        content.style.width = "100%";
    }
    // Ensure html and body can scroll vertically but NOT horizontally
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.height = "auto";
}
