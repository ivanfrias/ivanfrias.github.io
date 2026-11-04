// Classic DOOM PSX / PC Fire Algorithm rendered onto a full-header canvas
(function () {
    var canvas = document.getElementById('doom-fire-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Classic Doom fire color palette (37 RGB colors from black through red, orange, yellow to white)
    var fireColorsPalette = [
        [7, 7, 7], [31, 7, 7], [47, 15, 7], [71, 15, 7], [87, 23, 7],
        [103, 31, 7], [119, 31, 7], [143, 39, 7], [159, 47, 7], [175, 63, 7],
        [191, 71, 7], [199, 71, 7], [223, 79, 7], [223, 87, 7], [223, 87, 7],
        [215, 95, 7], [215, 95, 7], [215, 103, 15], [207, 111, 15], [207, 119, 15],
        [207, 127, 15], [207, 135, 23], [199, 135, 23], [199, 143, 23], [199, 151, 31],
        [191, 159, 31], [191, 159, 31], [191, 167, 39], [191, 167, 39], [191, 175, 47],
        [183, 175, 47], [183, 183, 47], [183, 183, 55], [207, 207, 111], [223, 223, 159],
        [239, 239, 199], [255, 255, 255]
    ];

    var fireWidth = 240;
    var fireHeight = 70;
    var firePixelsArray = [];
    var animationFrameId = null;

    function initFireData() {
        var total = fireWidth * fireHeight;
        firePixelsArray = new Uint8Array(total);

        // Initialize top & body as black (intensity 0)
        for (var i = 0; i < total; i++) {
            firePixelsArray[i] = 0;
        }

        // Bottom row source (maximum intensity = 36)
        var overflowPixelIndex = fireWidth * fireHeight;
        for (var column = 0; column < fireWidth; column++) {
            var pixelIndex = (overflowPixelIndex - fireWidth) + column;
            firePixelsArray[pixelIndex] = 36;
        }
    }

    function calculateFirePropagation() {
        for (var col = 0; col < fireWidth; col++) {
            for (var row = 1; row < fireHeight; row++) {
                var currentPixelIndex = col + (fireWidth * row);
                updateFireIntensityPerPixel(currentPixelIndex);
            }
        }
    }

    function updateFireIntensityPerPixel(currentPixelIndex) {
        var belowPixelIndex = currentPixelIndex + fireWidth;
        if (belowPixelIndex >= fireWidth * fireHeight) return;

        var decay = Math.floor(Math.random() * 3);
        var belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
        var newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

        var wind = Math.floor(Math.random() * 3) - 1;
        var destinationPixelIndex = currentPixelIndex - wind;
        if (destinationPixelIndex >= 0 && destinationPixelIndex < fireWidth * fireHeight) {
            firePixelsArray[destinationPixelIndex] = newFireIntensity;
        }
    }

    // Off-screen canvas for low-res pixel simulation scaled smoothly to full screen
    var offCanvas = document.createElement('canvas');
    offCanvas.width = fireWidth;
    offCanvas.height = fireHeight;
    var offCtx = offCanvas.getContext('2d');
    var imgData = offCtx.createImageData(fireWidth, fireHeight);
    var data = imgData.data;

    function renderFire() {
        for (var i = 0; i < firePixelsArray.length; i++) {
            var intensity = firePixelsArray[i];
            var color = fireColorsPalette[intensity] || [0, 0, 0];
            var idx = i * 4;
            data[idx] = color[0];
            data[idx + 1] = color[1];
            data[idx + 2] = color[2];
            // Fade alpha gracefully towards the top / dark intensity
            data[idx + 3] = intensity === 0 ? 0 : Math.min(255, 30 + intensity * 6);
        }

        offCtx.putImageData(imgData, 0, 0);

        // Draw scaled to canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(offCanvas, 0, 0, canvas.width, canvas.height);
    }

    function resize() {
        var parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
    }

    window.addEventListener('resize', resize);
    resize();
    initFireData();

    var lastTime = 0;
    var fpsInterval = 1000 / 30; // 30 FPS for authentic retro feel and ultra-light CPU usage

    function loop(currentTime) {
        animationFrameId = requestAnimationFrame(loop);
        var elapsed = currentTime - lastTime;
        if (elapsed > fpsInterval) {
            lastTime = currentTime - (elapsed % fpsInterval);
            calculateFirePropagation();
            renderFire();
        }
    }

    animationFrameId = requestAnimationFrame(loop);
})();
