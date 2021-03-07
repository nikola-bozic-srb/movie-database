$(document).ready(function () {

    const apiKey = "5dd85494"

    $("#searchForm").submit(function (e) {
        e.preventDefault();
        let movieName = $("#searchText").val();

        getMovies(movieName);

    })



    $("body").on("click", "#details", function (e) {
        var id = this.name;
        e.preventDefault();
        console.log(id);
        $.getJSON(`https://omdbapi.com/?apikey=${apiKey}&i=` + id, function (data, status) {
            if (status === "success") {
                console.log(data);
                var picture = data.Poster;

                let output = `
                <div class='row'>
                    <div class='col-md-4'>
                        <img src='${picture}' class='thumbnail'>
                    </div>
                    <div class='col-md-8'>
                    <h2>${data.Title}</h2>
                    <ul class='list-group'>
                        <li class='list-group-item'><strong>Genre:</strong> ${data.Genre}</li>
                        <li class='list-group-item'><strong>Released:</strong> ${data.Released}</li>
                        <li class='list-group-item'><strong>Rated:</strong> ${data.Rated}</li>
                        <li class='list-group-item'><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
                        <li class='list-group-item'><strong>Director:</strong> ${data.Director}</li>
                        <li class='list-group-item'><strong>Writer:</strong> ${data.Writer}</li>
                        <li class='list-group-item'><strong>Actors:</strong> ${data.Actors}</li>
                    </ul>
                    </div>
                </div>

                <div class='row'>
                    <div class='well'>
                        <h3 style='float:center'>Plot</h3>
                        ${data.Plot}
                        <hr>
                        <a href="https://imdb.com/title/${data.imdbID}" target="_blank" class="btn" style='color:black;background-color:yellow'>View IMDb</a>
                        <a href="index.html" class="btn btn-default">Go back to search</a>
                    </div>
                </div>
            `;

                $("#movie").html(output);
                $("#movies").attr("hidden", true);
                $("#jumbotron").attr("hidden", true);
                $("#movieContainer").attr("hidden", false);
            }


        })

    })



    function getMovies(name) {
        $.getJSON(`https://omdbapi.com/?apikey=${apiKey}&s=` + name, function (data, status) {

            var container = $("#movies");
            container.empty();


            if (status === "success") {

                var movies = data.Search;
                var output = "";
                $("#searchText").val("");
                console.log(movies);

                for (var i = 0; i < movies.length; i++) {

                    var movieId = movies[i].imdbID.toString();
                    output += `
                    <div clas='col-md-3'>
                        <div class='well text-center'>
                            <img src='${movies[i].Poster}'>
                            <h5>${movies[i].Title}</h5>
                             <a href="movie.html" class='btn btn-primary' name='${movieId}' id='details'>Movie Details</a>
                        </div>
                    </div>    
                `;
                }
                $("#movies").html(output);
            }
        })

    }



})