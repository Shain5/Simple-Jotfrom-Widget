(function($) {
    // Wait until the DOM is fully loaded
    $(document).ready(function() {
        var apiUrl = 'https://eu-api.jotform.com/form/243172322440344/submissions?apiKey=74bccaeb08a966037164e1ef72ad327e';

        // Function to fetch and filter the submissions based on the name entered
        function fetchSubmissions(name) {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log("API Response:", response); // Log the API response for debugging

                    if (response.responseCode === 200) {
                        var submissions = response.content;
                        var count = 0;

                        // Iterate through submissions and filter based on first name
                        submissions.forEach(function(submission) {
                            var firstName = submission.answers["3"] && submission.answers["3"].answer.first;

                            if (firstName && firstName.toLowerCase() === name.toLowerCase()) {
                                count++;
                            }
                        });

                        // Update the display with the count
                        $('#submission-count').text('Previous submissions with first name "' + name + '": ' + count);
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
