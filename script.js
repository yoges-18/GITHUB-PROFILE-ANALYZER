
async function getProfile() {

    let username = document.getElementById("username").value.trim();

    let profile = document.getElementById("profile");
    let repositories = document.getElementById("repositories");

    if (username === "") {
        profile.innerHTML = "Please enter a username";
        return;
    }
        let response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            profile.innerHTML = "User not found";
            repositories.innerHTML = "";
            return;
        }

        let data = await response.json();

        profile.innerHTML = `
            <img src="${data.avatar_url}" width="100">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Repositories: ${data.public_repos}</p>
            <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        `;

        let repoResponse = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100`
        );

        let repoData = await repoResponse.json();

        repositories.innerHTML = "<h2>Repositories</h2>";

        repoData.forEach(function(repo) {

            repositories.innerHTML += `
                <div>
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description"}</p>
                    <p>Language: ${repo.language || "Not specified"}</p>
                    <p>Stars: ${repo.stargazers_count}</p>
                    <a href="${repo.html_url}" target="_blank">
                        View Repository
                    </a>
                </div>
            `;

        });
}
