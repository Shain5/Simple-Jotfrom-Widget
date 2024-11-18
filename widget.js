(function($) {
    // Wait until the DOM is fully loaded
    $(document).ready(function() {
        var apiUrl = 'https://forms.medicaretags.com/API/form/243083683720861/submissions?apiKey=fd189b26c15e51452ee2a9384fe48e2e';

        // Function to fetch and filter the submissions based on the name entered
        function fetchSubmissions(name) {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                headers: {'jf-team-id': 242704765020046},
                success: function(response) {
                    console.log("API Response:", response); // Log the API response for debugging

                    if (response.responseCode === 200) {
                        var submissions = response.content;
                        var count = 0;

                        // Iterate through submissions and filter based on first name
                        submissions.forEach(function(submission) {
                           var answers = submission.answers;
                            for (var key in answers) {
                                if (
                                    answers[key].answer && 
                                    answers[key].answer.toString().toLowerCase() === valueToFilter.toLowerCase()
                                ) {
                                    count++;
                                    break; // Stop checking other fields once a match is found
                                }
                            }

                        });

                        // Update the display with the count
                        $('#submission-count').text('Previous submissions with first name "' + valueToFilter + '": ' + count);
                    } else {
                        $('#submission-count').text('Error retrieving data.');
                    }
                },
                error: function() {
                    console.log("Error fetching data from API."); // Log an error message
                    $('#submission-count').text('Error retrieving data.');
                }
            });
        }

        // Event listener for input change
        $('#name-input').on('input', function() {
            var name = $(this).val().trim();
            if (name) {
                fetchSubmissions(name); // Fetch data if the name is entered
            } else {
                $('#submission-count').text('Previous submissions with first name "": 0');
            }
        });
    });
})(jQuery);
