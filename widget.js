// Using provided form ID and API key
const formID = "243172322440344"; 
const apiKey = "74bccaeb08a966037164e1ef72ad327e"; 

// Construct the API URL with the custom domain
const apiUrl = `https://forms.medicaretags.com/form/${formID}/submissions?apiKey=${apiKey}`;

// Function to fetch submissions and count entries with the first name "Shain"
async function fetchSubmissions() {
  try {
    // Fetch submission data from JotForm API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Filter submissions to count entries with the first name "Shain"
    const count = data.content.filter(submission => 
      submission.answers["3"] && submission.answers["3"].answer.first === "Shain"
    ).length;

    // Display the count in the widget
    document.getElementById("submission-count").innerText = `Previous submissions with first name "Shain": ${count}`;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    document.getElementById("submission-count").innerText = "Error fetching data.";
  }
}

// Event listener to refresh count when the user types a name
document.getElementById("name-input").addEventListener("input", (event) => {
  const name = event.target.value;
  if (name === "Shain") {
    fetchSubmissions();
  } else {
    document.getElementById("submission-count").innerText = "Previous submissions with first name 'Shain': 0";
  }
});
