document.addEventListener("DOMContentLoaded", () => {
  const cake = document.getElementById("cake");
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("surpriseVideo");
  const closeBtn = document.getElementById("closeVideo");
  const loveReveal = document.getElementById("loveReveal");
  const closeLoveBtn = document.getElementById("closeLoveReveal");
  const bgMusic = document.querySelector(".song");

  // Cake click - show video
  if (cake) {
    cake.addEventListener("click", () => {
      videoBox.classList.remove("hidden");
      if (bgMusic) bgMusic.pause();
      video.play();
    });
  }

  // Close video button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      video.pause();
      video.currentTime = 0;
      videoBox.classList.add("hidden");
      if (bgMusic) bgMusic.play();
    });
  }

  // Video ended - show love reveal
  // Video ended - show love reveal
if (video) {
  video.addEventListener("ended", () => {
    videoBox.classList.add("hidden");

    // Small delay for smooth transition
    setTimeout(() => {
      loveReveal.classList.remove("hidden");
      loveReveal.classList.add("show");

      // 🔽 START LOVE TIMER HERE (STEP 4)
      startLoveTimer();

    }, 300);
  });
}


  // Close love reveal
  if (closeLoveBtn) {
    closeLoveBtn.addEventListener("click", () => {
      loveReveal.classList.add("hidden");
      if (bgMusic) bgMusic.play();
    });
  }
});

const circles = document.querySelectorAll(".circle");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  circles.forEach((circle, index) => {
    const delay = index * 25;
    setTimeout(() => {
      circle.style.left = x + "px";
      circle.style.top = y + "px";
    }, delay);
  });
});

/* for mobile touch */
window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  circles.forEach((circle, index) => {
    const delay = index * 25;
    setTimeout(() => {
      circle.style.left = x + "px";
      circle.style.top = y + "px";
    }, delay);
  });
});

const dock = document.querySelector(".love-dock");
const cursorLayer = document.querySelector(".cursor-circles");

if (dock && cursorLayer) {
  dock.addEventListener("mouseenter", () => {
    cursorLayer.classList.add("hide-circles");
  });

  dock.addEventListener("mouseleave", () => {
    cursorLayer.classList.remove("hide-circles");
  });
}

const dockItems = document.querySelectorAll(".dock-item");
const bgMusic = document.querySelector(".song");

function fadeVolume(target) {
  const bgMusic = document.querySelector(".song");
  if (!bgMusic) return;

  clearInterval(bgMusic._fade);
  bgMusic._fade = setInterval(() => {
    if (Math.abs(bgMusic.volume - target) < 0.02) {
      bgMusic.volume = target;
      clearInterval(bgMusic._fade);
    } else {
      bgMusic.volume += bgMusic.volume < target ? 0.02 : -0.02;
    }
  }, 30);
}

dockItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    document.body.classList.add("whisper-mode");
    fadeVolume(0.25);
  });

  item.addEventListener("mouseleave", () => {
    document.body.classList.remove("whisper-mode");
    fadeVolume(1);
  });
});

function startLoveTimer() {
  const startDate = new Date("2025-04-18T00:00:00"); // dating start
  const timerEl = document.getElementById("loveTimer");

  if (!timerEl) return;

  function updateTimer() {
    const now = new Date();
    let diff = now - startDate;

    if (diff < 0) diff = 0;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const months = Math.floor(days / 30);
    const remDays = days % 30;
    const remHours = hours % 24;
    const remmins = minutes % 60;
    const remSeconds = seconds % 60;

    timerEl.textContent =
      `${months} months · ${remDays} days · ${remHours} hrs · ${remmins} min · ${remSeconds} sec`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
