(function($) {
    $(document).ready(function() {
        var apiUrl = 'https://eu-api.jotform.com/form/243172322440344/submissions?apiKey=74bccaeb08a966037164e1ef72ad327e';

        // Function to fetch and filter the submissions based on the name entered
        function fetchSubmissions(name) {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log("API Response:", response);

                    if (response.responseCode === 200) {
                        var submissions = response.content;
                        var count = 0;

                        // Iterate through submissions and filter based on the name
                        submissions.forEach(function(submission) {
                            var firstName = submission.answers["3"] && submission.answers["3"].answer.first; // Adjust field key if needed
                            if (firstName && firstName.toLowerCase() === name.toLowerCase()) {
                                count++;
                            }
                        });

                        // Update the widget with the name and count
                        $('#submission-count').text('Previous submissions for "' + name + '": ' + count);
                    } else {
                        $('#submission-count').text('Error retrieving data.');
                    }
                },
                error: function() {
                    console.log("Error fetching data from API.");
                    $('#submission-count').text('Error retrieving data.');
                }
            });
        }

        // Monitor the widget's text box for changes
        $('#widget-name-input').on('input', function() {
            var name = $(this).val().trim(); // Get the copied name
            if (name) {
                fetchSubmissions(name); // Fetch submission count for the name
            }
        });
    });
})(jQuery);
