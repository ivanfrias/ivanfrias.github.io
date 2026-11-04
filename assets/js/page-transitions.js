// Smooth SPA-style page transitions between Home, About, and Projects
(function () {
    // Only intercept internal navigation links
    if (!window.fetch || !window.history || !window.DOMParser) return;

    var isTransitioning = false;

    function normalizePath(path) {
        if (!path) return '/';
        return path.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
    }

    function updateNavActiveState(targetUrl) {
        var targetPath = normalizePath(new URL(targetUrl, window.location.origin).pathname);
        var navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(function (a) {
            var aPath = normalizePath(new URL(a.getAttribute('href'), window.location.origin).pathname);
            var li = a.querySelector('li');
            if (li) {
                if (aPath === targetPath) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            }
        });
    }

    function loadPage(url, pushState) {
        if (isTransitioning) return;
        isTransitioning = true;

        var main = document.querySelector('main');
        if (main) {
            main.classList.add('page-transitioning');
        }

        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                var newMain = doc.querySelector('main');
                var newTitle = doc.querySelector('title');

                if (newTitle) {
                    document.title = newTitle.innerText;
                }

                setTimeout(function () {
                    if (main && newMain) {
                        main.innerHTML = newMain.innerHTML;
                    }

                    updateNavActiveState(url);

                    if (pushState) {
                        window.history.pushState({ url: url }, '', url);
                    }

                    // Re-run any page scripts (like updates filter or GitHub repos loader)
                    var scripts = main.querySelectorAll('script');
                    scripts.forEach(function (s) {
                        var newScript = document.createElement('script');
                        if (s.src) {
                            newScript.src = s.src;
                        } else {
                            newScript.textContent = s.textContent;
                        }
                        document.body.appendChild(newScript);
                        document.body.removeChild(newScript);
                    });

                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    if (main) {
                        main.classList.remove('page-transitioning');
                    }
                    isTransitioning = false;
                }, 180);
            })
            .catch(function (err) {
                console.error('Page transition failed, falling back:', err);
                window.location.href = url;
            });
    }

    document.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (!a) return;

        var href = a.getAttribute('href');
        if (!href) return;

        // Skip external, anchors, mailto, etc.
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
        if (a.origin !== window.location.origin) return;

        // Allow internal project/subpage transitions smoothly
        e.preventDefault();
        var targetUrl = a.href;
        if (normalizePath(window.location.pathname) !== normalizePath(new URL(targetUrl).pathname)) {
            loadPage(targetUrl, true);
        }
    });

    window.addEventListener('popstate', function (e) {
        loadPage(window.location.href, false);
    });
})();
