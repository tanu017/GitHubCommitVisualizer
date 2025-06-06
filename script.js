const Ably = require('ably');
const client = new Ably.Realtime({ key: "Github-commit-visualizer" });

const channel = client.channels.get("test");
channel.publish("greeting", "Hello World!");

function fetchCommits() {
    let owner = document.getElementById("ownerInput").value;
    let repo = document.getElementById("repoInput").value;
    fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        headers: {
            "Authorization": "GITHUB-SEARCH_TOKEN"
        }
    })
        .then(response => response.json())
        .then(data => {
            let commitBranch = data.map(commit => new Date(commit.commit.author.date).toDateString());
            let ctx = document.getElementById("commitChart").getContext("2d");
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: commitDates,
                    datasets: [{
                        label: "Commits Over Time",
                        data: commitDates.map((_, index) => index + 1),
                        borderColor: "aquamarine",
                        fill: false
                    }]
                }
            });
        })
        .catch(error => console.error("Error fetching commits:", error));
}
