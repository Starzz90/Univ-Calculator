document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("scoreForm");
    const resultArea = document.getElementById("resultArea");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const internationalAwards = parseInt(document.getElementById("internationalAwards").value) || 0;
        const nationalAwards = parseInt(document.getElementById("nationalAwards").value) || 0;
        const regionalAwards = parseInt(document.getElementById("regionalAwards").value) || 0;

        const academicsScore = parseFloat(document.getElementById("academicsScore").value) || 0;
        const projectsScore = parseFloat(document.getElementById("projectsScore").value) || 0;

        const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value) || 0;
        const weightAcademics = parseFloat(document.getElementById("weightAcademics").value) || 0;
        const weightProjects = parseFloat(document.getElementById("weightProjects").value) || 0;

        const universityName = document.getElementById("universityName").value || "your selected university";
        const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

        if (weightOlympiads + weightAcademics + weightProjects !== 100) {
            resultArea.innerHTML = `<p style="color:red;">⚠️ The weights must sum to 100%.</p>`;
            return;
        }

        const olympiadScore = (
            ((internationalAwards * 10) + (nationalAwards * 10) + (regionalAwards * 10)) / 3
        ).toFixed(2);

        const totalScore = (
            olympiadScore * (weightOlympiads / 100) +
            academicsScore * (weightAcademics / 100) +
            projectsScore * (weightProjects / 100)
        ).toFixed(2);

        const actualRate = 100 - acceptanceRate;
        let admissionMessage = "";
        let scholarshipMessage = "";

        if (totalScore >= actualRate) {
            admissionMessage = `✅ Likely to be accepted into <strong>${universityName}</strong>`;
            scholarshipMessage = `💰 Scholarship chances: <strong>High (75–100%)</strong>`;
        } else if (totalScore >= actualRate - 30) {
            admissionMessage = `🤔 Borderline chance of admission to <strong>${universityName}</strong>`;
            scholarshipMessage = `💰 Scholarship chances: <strong>Medium (40–60%)</strong>`;
        } else {
            admissionMessage = `❌ Unlikely to be accepted into <strong>${universityName}</strong>`;
            scholarshipMessage = `💰 Scholarship chances: <strong>Low (0–30%)</strong>`;
        }

        resultArea.innerHTML = `
            <h3>📊 Results Summary</h3>
            <ul>
                <li>International Olympiad Awards: ${internationalAwards}</li>
                <li>National Olympiad Awards: ${nationalAwards}</li>
                <li>Regional Olympiad Awards: ${regionalAwards}</li>
                <li>Olympiad Score: ${olympiadScore}</li>
                <li>Academic Score: ${academicsScore}</li>
                <li>Projects Score: ${projectsScore}</li>
                <li>Total Weighted Score: <strong>${totalScore}%</strong></li>
                <li>University Acceptance Rate: ${acceptanceRate}%</li>
                <li>${admissionMessage}</li>
                <li>${scholarshipMessage}</li>
            </ul>
        `;
    });
});
