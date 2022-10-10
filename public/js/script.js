$(document).ready(function () {
    users.register();
    users.connexion();
    post.display_post();
    post.display_details();


});
const api_base_url = "https://test3.afrikastream.com/";


var users = {
    connexion: function () {
        $("#login").click(function (e) {
            e.preventDefault();
            // alert("nbjnmnm")

            var formData = new Object();

            formData.username = $("#email").val();
            formData.password = $("#password").val();

            let formDataToJson = JSON.stringify(formData);

            $.ajax({
                type: "POST",
                url: api_base_url + "users/signin",
                contentType: "application/json",
                data: formDataToJson,
                success: function (response) {
                    alert(response.message);
                    let userData = response.users;

                    if (userData.role == "USERS") {
                        window.location.replace('/index');
                    } else if (userData.role == "ADMIN") {
                        window.location.replace('/dashboard/articles');
                    }
                    window.localStorage.setItem("username", userData.email);
                },
                error: function (xhr, status, error) {
                    console.error(xhr);
                }
            });
        });
    }, register: function () {
        $("#register").click(function (e) {
            e.preventDefault();

            var formData = new Object();
            formData.firstName = $("#firstName").val();
            formData.lastName = $("#lastName").val();
            formData.email = $("#email").val();
            formData.password = $("#password").val();
            formData.phoneNumber = $("#phoneNumber").val();
            formData.role = "USERS";

            var formDataToJson = JSON.stringify(formData)

            $.ajax({
                type: "POST",
                url: api_base_url + "users/register",
                contentType: "application/json",
                data: formDataToJson,
                success: function (response) {
                    window.localStorage.setItem(formData.email, email);
                    alert(response.message)
                    if (formData.role = "USERS") {
                        window.location.replace('/index');
                    } else if (formData.role = "ADMIN") {
                        window.location.replace('/dashboard/articles');

                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr);
                }
            });

        });
    }
}

var post = {

    display_post: function () {
        $.ajax({

            type: "GET",
            url: api_base_url + '/post',
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            },
            success: function (response) {
                let post = response.data; //recuperer le data (la liste des postes dans notre cas)
                let html_output = "";
                let movies_series = "";
                $.each(post, function (key, value) {
                    let post_type = value.post_type.name;
                    html_output = `<div class="cc-card-custom">

                <div class="cc-card-custom-img">

                    <img src="/images/alvdan.jpg" alt="alvdan picture" class="cc-card-custom-self cc-img-full cc-img-cover cc-border-radius-1_25rem">

                </div>

                <a class="cc-card-custom-body" href="#">

                    <div class="cc-card-custom-infos">

                        <h3 class="cc-card-title">${value.title}</h3>

                        <div class="cc-card-description">${value.description}</div>

                    </div>

                    <span class="cc-badge cc-bg-film">${post_type}</span>

                </a>

            </div>`;
                    movies_series = `<div class="cc-card cc-column-4 cc-mb-4rem">

                <a href="#" class="cc-card-img cc-display-block">

                    <img src="/images/alvdan.jpg" alt="alvdan picture" class="cc-card-custom-self cc-img-full cc-img-cover cc-border-radius-1_25rem">

                </a>

                <div class="cc-card-body">

                    <a href="#" class="cc-card-title">${value.title}</a>

                    <div class="cc-card-description">${value.description}</div>

                    <div class="cc-stars">

                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>
                        <i class='bx bxs-star'></i>

                    </div>

                </div>

            </div>`

                    $('.for-you').trigger('add.owl.carousel', html_output).trigger('refresh.owl.carousel');
                    $('.for-you').trigger("to.owl.carousel", [$(".owl-item").length, 500,]);

                    if (post_type == "FILMS") {
                        $('.movies').trigger('add.owl.carousel', html_output).trigger('refresh.owl.carousel');
                        $('.movies').trigger("to.owl.carousel", [$(".owl-item").length, 500,]);
                        $('.single-films').append(movies_series);
                    }


                    if (post_type == "SERIES") {
                        $('.series').trigger('add.owl.carousel', html_output).trigger('refresh.owl.carousel');
                        $('.series').trigger("to.owl.carousel", [$(".owl-item").length, 500,]);
                        $('.single-series').append(movies_series);
                    }


                })
                // $('.for-you').html(html_output)

                // document.getElementsByClassName("films").innerHTML = html_output;
            },
            error: function (xhr, status, error) {
                console.error(xhr);
            }

        });

    },

    display_details: function () {

        $(document).on('click', '.film-details', function () {
            let id = $(this).data('id')
            console.log(id)

            $.ajax({
                type: "GET",
                url: api_base_url + '/post/' + id,
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    let film = response.post;
                    let film_output = "";
                    window.localStorage.setItem("title", film.title);
                    window.localStorage.setItem("content", film.content);
                    window.localStorage.setItem("description", film.description);

                    window.location.replace('/synopsis');

                },
                error: function (xhr, status, error) {
                    console.error(xhr);
                }

            });
        })


    }

}
