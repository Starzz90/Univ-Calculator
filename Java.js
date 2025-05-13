document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("scoreForm");
    const resultArea = document.getElementById("resultArea");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get input values
        const internationalAwards = parseInt(document.getElementById("internationalAwards").value);
        const nationalAwards = parseInt(document.getElementById("nationalAwards").value);
        const regionalAwards = parseInt(document.getElementById("regionalAwards").value);

        const academicsScore = parseFloat(document.getElementById("academicsScore").value);
        const projectsScore = parseFloat(document.getElementById("projectsScore").value);

        const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value);
        const weightAcademics = parseFloat(document.getElementById("weightAcademics").value);
        const weightProjects = parseFloat(document.getElementById("weightProjects").value);

        const universityName = document.getElementById("universityName").value;
        const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value);

        // Validate weight
        if (weightOlympiads + weightAcademics + weightProjects !== 100) {
            resultArea.innerHTML = `<p style="color:red;">⚠️ The weights must sum to 100%. Please correct them.</p>`;
            return;
        }

        // Calculate scores
        const internationalScore = internationalAwards * 10;
        const nationalScore = nationalAwards * 10;
        const regionalScore = regionalAwards * 10;

        const olympiadScore = ((internationalScore + nationalScore + regionalScore) / 3).toFixed(2);

        const totalScore = (
            olympiadScore * (weightOlympiads / 100) +
            academicsScore * (weightAcademics / 100) +
            projectsScore * (weightProjects / 100)
        ).toFixed(2);

        // Evaluate result
        const actualRate = 100 - acceptanceRate;
        let message = "";

        if (totalScore >= actualRate) {
            message = `✅ Congratulations! You are likely to be accepted into <strong>${universityName}</strong>.`;
        } else if (totalScore >= actualRate - 30) {
            message = `🤔 You are on the borderline for acceptance into <strong>${universityName}</strong>.`;
        } else {
            message = `❌ You may need to improve your profile for a better chance at <strong>${universityName}</strong>.`;
        }

        // Output results
        resultArea.innerHTML = `
            <h3>📊 Results:</h3>
            <p>Olympiad Score: ${olympiadScore}</p>
            <p>Academics Score: ${academicsScore}</p>
            <p>Projects Score: ${projectsScore}</p>
            <p><strong>Total Weighted Score:</strong> ${totalScore}%</p>
            <p>${message}</p>
        `;
    });
});
