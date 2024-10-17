window.onload = function () {
  const gallery = document.querySelector(".gallery");
  const previewImage = document.querySelector(".preview-img img");

  // Handle the background video toggle
  const backgroundVideo = document.getElementById('backgroundVideo');
  const videoSource = document.getElementById('videoSource');
  const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

  let currentVideo = 1; // Track the current video

  changeBackgroundBtn.addEventListener('click', function() {
    if (currentVideo === 1) {
      // Switch to the second video
      videoSource.src = "Night2.mp4"; // Replace with your second video file
      backgroundVideo.load(); // Reload the video element to apply the new source
      backgroundVideo.play();
      currentVideo = 2;
    } else {
      // Switch back to the first video
      videoSource.src = "plainsky.mp4"; // Replace with your first video file
      backgroundVideo.load(); // Reload the video element to apply the new source
      backgroundVideo.play();
      currentVideo = 1;
    }
  });

  // Existing code to handle gallery setup and mouse move interactions
  document.addEventListener("mousemove", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateX = 55 + percentY * 2;
    const rotateY = percentX * 2;

    gsap.to(gallery, {
      duration: 1,
      ease: "power2.out",
      rotateX: rotateX,
      rotateY: rotateY,
      overwrite: "auto",
    });
  });

  for (let i = 0; i < 150; i++) {
    const item = document.createElement("div");
    item.className = "item";
    const img = document.createElement("img");
    img.src = "./assets/img" + ((i % 15) + 1) + ".jpg";
    item.appendChild(img);
    gallery.appendChild(item);
  }

  const items = document.querySelectorAll(".item");
  const numberOfItems = items.length;
  const angleIncrement = 360 / numberOfItems;

  items.forEach((item, index) => {
    gsap.set(item, {
      rotationY: 90,
      rotationZ: index * angleIncrement - 90,
      transformOrigin: "50% 400px",
    });

    item.addEventListener("mouseover", function () {
      const imgInsideItem = item.querySelector("img");
      previewImage.src = imgInsideItem.src;

      gsap.to(item, {
        x: 10,
        z: 10,
        y: 10,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    item.addEventListener("mouseout", function () {
      previewImage.src = "./assets/Book2.jpg";
      gsap.to(item, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  });

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
    onRefresh: setupRotation,
    onUpdate: (self) => {
      const rotationProgress = self.progress * 360 * 1;
      items.forEach((item, index) => {
        const currentAngle = index * angleIncrement - 90 + rotationProgress;
        gsap.to(item, {
          rotationZ: currentAngle,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
  });
};

function setupRotation() {}
