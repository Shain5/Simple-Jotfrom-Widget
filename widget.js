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

        // Get the unique name of the Short Text Property field (replace q35_typeA with the actual unique name)
        var uniqueName = "name"; // Update this with the actual unique name of the Short Text field
         console.log("uniqueName:", uniqueName);

        // Check for the field value using the unique name
        setInterval(function() {
            // Get the value of the Short Text field
            var shortTextValue = $('input[name="' + uniqueName + '"]').val();
            console.log("shortTextValue:", shortTextValue);
            var fieldValue = $('#input_225').val();
            console.log("fieldValue:", fieldValue);

            // If a value is entered, fetch the submission count
            if (shortTextValue) {
                $('#submission-count').text('Checking previous submissions for: ' + shortTextValue);
                fetchSubmissions(shortTextValue); // Fetch submission count for the name
            } else {
                $('#submission-count').text('Waiting for input...');
            }
        }, 500); // Poll every 500ms until the Short Text field is populated
    });
})(jQuery);
