
document.addEventListener("DOMContentLoaded", () => {
  // 1. Animated rain background
  const rainLayer = document.getElementById("rainLayer");

  if (rainLayer) {
    const dropCount = window.innerWidth < 600 ? 65 : 125;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement("span");
      drop.className = "raindrop";

      drop.style.left = `${Math.random() * 105}%`;
      drop.style.setProperty("--length", `${35 + Math.random() * 65}px`);
      drop.style.setProperty("--duration", `${0.8 + Math.random() * 1.5}s`);
      drop.style.setProperty("--delay", `${-Math.random() * 5}s`);
      drop.style.setProperty("--opacity", `${0.12 + Math.random() * 0.4}`);

      fragment.appendChild(drop);
    }

    rainLayer.appendChild(fragment);
  }

  // 2. Animated changing headline
  const changingText = document.getElementById("changingText");
  const words = ["story.", "magic.", "emotion.", "art."];
  let wordIndex = 0;

  if (changingText) {
    window.setInterval(() => {
      changingText.classList.add("word-changing");

      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        changingText.textContent = words[wordIndex];
        changingText.classList.remove("word-changing");
      }, 250);
    }, 2600);
  }

  // 3. Scroll reveal animation
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${(index % 4) * 80}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // 4. Video controls and audio
  const videos = [...document.querySelectorAll("video")];

  videos.forEach(video => {
    // Native controls provide play, sound, timeline and fullscreen.
    video.controls = true;
    video.playsInline = true;

    // Do not force mute: retain the video's original audio.
    video.addEventListener("play", () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });

    video.addEventListener("error", () => {
      console.warn("Check that this video exists:", video.currentSrc);
    });
  });

  // 5. WhatsApp: Connect My Brother
  const phoneNumber = "917028185852";
  const message =
    "Assalamualaikum, I want to connect with your brother regarding video editing. I would like to learn video editing and discuss getting my videos edited.";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll(".whatsapp-button").forEach(button => {
    button.href = whatsappURL;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });

  // 6. Subtle navbar effect on scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    navbar.style.boxShadow = window.scrollY > 40
      ? "0 12px 40px rgba(0,0,0,.38)"
      : "0 12px 45px rgba(0,0,0,.2)";
  }, { passive: true });

  // 7. Current year in footer
  const footer = document.querySelector(".footer");

  if (footer) {
    const copyright = document.createElement("span");
    copyright.className = "footer-year";
    copyright.textContent = `© ${new Date().getFullYear()}`;
    footer.appendChild(copyright);
  }

  console.log("Suhana Edits is ready ✨");
});
