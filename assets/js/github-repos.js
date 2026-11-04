// Dynamic GitHub Projects loader with real-time API fallback
window.initGitHubRepos = function () {
    var container = document.getElementById('github-repos-list');
    if (!container) return;

    var username = 'ivanfrias';
    var apiUrl = 'https://api.github.com/users/' + username + '/repos?sort=updated&per_page=8';

    fetch(apiUrl)
        .then(function (res) {
            if (!res.ok) throw new Error('GitHub API ' + res.status);
            return res.json();
        })
        .then(function (repos) {
            if (!Array.isArray(repos) || repos.length === 0) return;

            // Filter out forks or keep interesting active repos
            var active = repos.filter(function (r) {
                return !r.fork && r.name !== 'ivanfrias.github.io';
            }).slice(0, 6);

            var html = '';
            active.forEach(function (repo) {
                var lang = repo.language || 'Code';
                var desc = repo.description || 'Active open source project & experiments on GitHub.';
                var date = (repo.pushed_at || repo.updated_at || '').substring(0, 10);
                var stars = repo.stargazers_count || 0;

                html += '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="gh-repo-card">';
                html += '  <div class="gh-repo-top">';
                html += '    <span class="gh-repo-name"><i class="icon-github-circled"></i> ' + repo.name + '</span>';
                html += '    <span class="gh-repo-badge">' + lang + '</span>';
                html += '  </div>';
                html += '  <p class="gh-repo-desc">' + desc + '</p>';
                html += '  <div class="gh-repo-meta">';
                html += '    <span><i class="icon-calendar"></i> Updated ' + date + '</span>';
                if (stars > 0) {
                    html += '    <span>★ ' + stars + '</span>';
                }
                html += '    <span class="gh-view-link">View Repo &rarr;</span>';
                html += '  </div>';
                html += '</a>';
            });

            container.innerHTML = html;
        })
        .catch(function (err) {
            console.warn('Could not load live GitHub repos, using pre-rendered list:', err);
        });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initGitHubRepos);
} else {
    window.initGitHubRepos();
}
