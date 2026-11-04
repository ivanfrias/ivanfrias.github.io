// Subtle glowing audio waveform canvas animation across the hero header
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
        { freq: 0.008, speed: 0.015, amp: 28, color: 'rgba(56, 189, 248, 0.45)', lineWidth: 2 },
        { freq: 0.012, speed: 0.022, amp: 38, color: 'rgba(168, 85, 247, 0.4)', lineWidth: 2 },
        { freq: 0.006, speed: 0.012, amp: 22, color: 'rgba(251, 146, 60, 0.35)', lineWidth: 1.5 }
    ];

    function drawWave(w) {
        ctx.beginPath();
        var yBase = canvas.height * 0.78;
        ctx.moveTo(0, yBase);

        for (var x = 0; x < canvas.width; x += 3) {
            // Sinusoidal wave modulated with harmonic overtones
            var y = yBase +
                Math.sin(x * w.freq + time * w.speed) * w.amp * Math.sin(x * 0.003 + time * 0.01) +
                Math.sin(x * 0.02 + time * 0.03) * 6;
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
