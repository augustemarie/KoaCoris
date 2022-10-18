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
                    let userData = response.data;

                    if (userData.role == "USERS") {
                        window.location.replace('/index');
                    } else if (userData.role == "ADMIN") {
                        window.location.replace('/dashboard/articles');
                        window.localStorage.setItem("user_id", userData.id);
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
                        window.localStorage.setItem("user_id", response.data.id);
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
                let become = "";
                $.each(post, function (key, value) {
                    let post_type = value.post_type.name;
                    html_output = `<div class="cc-card-custom">

                <div class="cc-card-custom-img">

                    <img src="${api_base_url}${value.banner}" alt="alvdan picture" class="cc-card-custom-self cc-img-full cc-img-cover cc-border-radius-1_25rem">

                </div>

                <a class="cc-card-custom-body single-post" href="#" data-id="${value.id}">

                    <div class="cc-card-custom-infos">

                        <h3 class="cc-card-title">${value.title}</h3>

                        <div class="cc-card-description">${value.description}</div>

                    </div>

                    <span class="cc-badge cc-bg-film">${post_type}</span>

                </a>

            </div>`;

                    movies_series = `<div class="cc-card cc-column-4 cc-mb-4rem">

                <a href="#" class="cc-card-img cc-display-block single-post" data-id="${value.id}">

                    <img src="${api_base_url}${value.banner}" alt="alvdan picture" class="cc-card-custom-self cc-img-full cc-img-cover cc-border-radius-1_25rem">

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
                    if (value.status == 'COMING') {
                        become = `<div class="cc-card-custom cc-column-3 cc-mb-3rem">

                    <div class="cc-card-custom-img">

                        <img src="${api_base_url}${value.banner}" alt="alvdan picture" class="cc-card-custom-self cc-img-full cc-img-cover cc-border-radius-1_25rem">

                    </div>

                    <a class="cc-card-custom-body" href="#">

                        <div class="cc-card-custom-infos">

                            <h3 class="cc-card-title">${value.title}</h3>

                            <div class="cc-card-description">${value.description}</div>

                        </div>

<!--                        <span class="cc-badge cc-bg-primary cc-color-black-default-important">10/12/2022</span>-->

                    </a>

                </div>`
                    }

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

                    $('.become-post').append(become);


                })
            },
            error: function (xhr, status, error) {
                console.error(xhr);
            }

        });

    },

    display_details: function () {

        $(document).on('click', '.single-post', function (e) {
            e.preventDefault();
            let id = $(this).data('id')
            $.ajax({
                type: "GET",
                url: api_base_url + '/post/' + id,
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    let film = response.data;
                    window.localStorage.setItem("title", film.title);
                    window.localStorage.setItem("banner", film.banner);
                    window.localStorage.setItem("content", film.content);
                    window.localStorage.setItem("description", film.description);
                    window.location.replace('/discover');

                },
                error: function (xhr, status, error) {
                    console.error(xhr);
                }

            });
        })
    }
}
