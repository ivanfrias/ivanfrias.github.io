// Subtle warm glowing ambient ember/light wave animation across the hero header
(function () {
    var canvas = document.getElementById('hero-waveform-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
        var parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
    }

    window.addEventListener('resize', resize);
    resize();

    var time = 0;
    var waves = [
        { freq: 0.007, speed: 0.012, amp: 26, color: 'rgba(251, 146, 60, 0.42)', lineWidth: 2 }, // Warm amber
        { freq: 0.011, speed: 0.018, amp: 34, color: 'rgba(239, 68, 68, 0.35)', lineWidth: 2 },  // Wine ruby
        { freq: 0.005, speed: 0.009, amp: 20, color: 'rgba(253, 224, 71, 0.28)', lineWidth: 1.5 } // Fireplace gold
    ];

    function drawWave(w) {
        ctx.beginPath();
        var yBase = canvas.height * 0.82;
        ctx.moveTo(0, yBase);

        for (var x = 0; x < canvas.width; x += 3) {
            var y = yBase +
                Math.sin(x * w.freq + time * w.speed) * w.amp * Math.sin(x * 0.003 + time * 0.008) +
                Math.sin(x * 0.018 + time * 0.02) * 5;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;
        ctx.shadowBlur = 12;
        ctx.shadowColor = w.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 1;

        for (var i = 0; i < waves.length; i++) {
            drawWave(waves[i]);
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
