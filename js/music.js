document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const songSelector = document.getElementById("songSelector");
    const musicDisc = document.getElementById("musicDisc");
    const musicPlayer = document.querySelector(".music-player");
    const imageUpload = document.getElementById("imageUpload");
    const collageContainer = document.getElementById("collageContainer");

    let heartInterval = null;
    let songs = ["music/Fallen.mp3", "music/Perfect.mp3", "music/Pasilyo.mp3", "music/247, 365.mp3",
        "music/Gitna.mp3", "music/Ikaw Lang Patutunguhan.mp3", "music/Sa Bawat Sandali.mp3"
    ];
    let currentSongIndex = 0;

    // Set default song
    audioPlayer.src = songs[currentSongIndex];

    // Autoplay
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Autoplay blocked. Waiting for user interaction.");
            document.addEventListener("click", () => audioPlayer.play(), { once: true });
        });
    }

    // Raining Hearts Effect
    function createFallingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("falling-heart");
        heart.innerHTML = "❤️";
        document.body.appendChild(heart);

        // Random horizontal position
        heart.style.left = Math.random() * window.innerWidth + "px";

        // Random animation duration
        const duration = Math.random() * 3 + 3;
        heart.style.animationDuration = duration + "s";

        // Remove heart after animation
        setTimeout(() => heart.remove(), duration * 1000);
    }

    // Generate falling hearts every second
    setInterval(createFallingHeart, 700);

    // Start vinyl animation when playing
    audioPlayer.addEventListener("play", function () {
        musicDisc.classList.add("rotate");
        if (!heartInterval) heartInterval = setInterval(createFallingHeart, 1000);
    });

    // Stop vinyl animation when paused
    audioPlayer.addEventListener("pause", function () {
        musicDisc.classList.remove("rotate");
        clearInterval(heartInterval);
        heartInterval = null;
    });

    // **✅ Fixed Manual Song Selection**
    songSelector.addEventListener("change", function () {
        audioPlayer.src = this.value; // Use the exact value from <option>
        audioPlayer.play();
    });

    // Automatically loop between songs
    audioPlayer.addEventListener("ended", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
    });

    // Handle Image Upload for Collage
    imageUpload.addEventListener("change", function (event) {
        const files = event.target.files;
        collageContainer.innerHTML = ''; // Clear previous images

        if (files.length) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.classList.add("collage-img");
                    collageContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        }
    });
});
