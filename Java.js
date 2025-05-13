document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("scoreForm");
    const resultArea = document.getElementById("resultArea");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get values from inputs
        const internationalAwards = parseInt(document.getElementById("internationalAwards").value) || 0;
        const nationalAwards = parseInt(document.getElementById("nationalAwards").value) || 0;
        const regionalAwards = parseInt(document.getElementById("regionalAwards").value) || 0;

        const academicsScore = parseFloat(document.getElementById("academicsScore").value) || 0;
        const projectsScore = parseFloat(document.getElementById("projectsScore").value) || 0;

        const weightOlympiads = parseFloat(document.getElementById("weightOlympiads").value) || 0;
        const weightAcademics = parseFloat(document.getElementById("weightAcademics").value) || 0;
        const weightProjects = parseFloat(document.getElementById("weightProjects").value) || 0;

        const universityName = document.getElementById("universityName").value;
        const acceptanceRate = parseFloat(document.getElementById("acceptanceRate").value) || 0;

        // Check if weights sum to 100
        if (weightOlympiads + weightAcademics + weightProjects !== 100) {
            resultArea.innerHTML = `<p style="color:red;">⚠️ The weights must sum to 100%. Please correct them.</p>`;
            return;
        }

        // Compute individual scores
        const internationalScore = internationalAwards * 10;
        const nationalScore = nationalAwards * 10;
        const regionalScore = regionalAwards * 10;
        const olympiadScore = ((internationalScore + nationalScore + regionalScore) / 3).toFixed(2);

        // Compute total profile score
        const totalScore = (
            olympiadScore * (weightOlympiads / 100) +
            academicsScore * (weightAcademics / 100) +
            projectsScore * (weightProjects / 100)
        ).toFixed(2);

        // Admission logic
        const actualRate = 100 - acceptanceRate;
        let admissionMessage = "";
        let scholarshipChance = "";

        if (totalScore >= actualRate) {
            admissionMessage = `✅ <strong>Likely to be accepted</strong> into ${universityName}`;
            scholarshipChance = "💰 <strong>Scholarship chances: High</strong> (75–100%)";
        } else if (totalScore >= actualRate - 30) {
            admissionMessage = `🤔 <strong>Borderline chance</strong> of admission into ${universityName}`;
            scholarshipChance = "💰 <strong>Scholarship chances: Medium</strong> (40–60%)";
        } else {
            admissionMessage = `❌ <strong>Low chance of admission</strong> into ${universityName}`;
            scholarshipChance = "💰 <strong>Scholarship chances: Low</strong> (0–30%)";
        }

        // Output all results
        resultArea.innerHTML = `
            <h3>📊 Results Summary:</h3>
            <ul>
                <li><strong>International Olympiad Awards:</strong> ${internationalAwards}</li>
                <li><strong>National Olympiad Awards:</strong> ${nationalAwards}</li>
                <li><strong>Regional Olympiad Awards:</strong> ${regionalAwards}</li>
                <li><strong>Olympiad Score:</strong> ${olympiadScore}</li>
                <li><strong>Academic Score:</strong> ${academicsScore}</li>
                <li><strong>Projects Score:</strong> ${projectsScore}</li>
                <li><strong>Total Weighted Profile Score:</strong> ${totalScore}%</li>
                <li><strong>University:</strong> ${universityName}</li>
                <li><strong>University Acceptance Rate:</strong> ${acceptanceRate}%</li>
                <li>${admissionMessage}</li>
                <li>${scholarshipChance}</li>
            </ul>
        `;
    });
});
