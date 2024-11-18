(function($) {
    // Wait until the DOM is fully loaded
    $(document).ready(function() {
        var apiUrl = 'https://eu-api.jotform.com/form/243172322440344/submissions?apiKey=74bccaeb08a966037164e1ef72ad327e';

        // Debounce delay in milliseconds
        var debounceDelay = 500; // Delay for API calls
        var debounceTimer;

        // Function to fetch and filter the submissions based on the name entered
        function fetchSubmissions(name) {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log("API Response:", response); // Debugging

                    if (response.responseCode === 200) {
                        var submissions = response.content;
                        var count = 0;

                        // Filter submissions by matching the name
                        submissions.forEach(function(submission) {
                            var firstName = submission.answers["3"] && submission.answers["3"].answer.first; // Adjust based on field keys
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
                    console.log("Error fetching data from API."); // Debugging
                    $('#submission-count').text('Error retrieving data.');
                }
            });
        }

        // Monitor changes in the Short Text Properties widget
        var observeNameField = setInterval(function() {
            var name = $('#input_35').val(); // Fetch the value from Short Text Properties widget
            if (name) {
                clearInterval(observeNameField); // Stop polling once the name is detected
                fetchSubmissions(name); // Fetch submission count for the name
            }
        }, 500); // Check every 500ms until the name field is populated
    });
})(jQuery);
