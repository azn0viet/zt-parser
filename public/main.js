$( document ).ready(function() {
    $("#go").click(function() {
        console.log("Click on #go button with following URL: " + $('#url').val());
        var url = 'http://localhost:3000/?url=' + $('#url').val();

        $('#results_text_are').val('');

        $.get(url, function(json) {
            console.log(json);
            if (json.data) {
                var listOfUrls = "";
                json.data.forEach(link => {
                    listOfUrls += link + "\n";
                });

                $("#results_text_area").val(listOfUrls.trim());
                $('#results_text_area').trigger('autoresize');
            }
        });
	});
});