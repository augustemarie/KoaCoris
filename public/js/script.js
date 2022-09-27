$(document).ready(function() {
    users.register();
    users.connexion();
    post.display_post();
    post.display_details();
   
});

var users = {
    connexion: function() {
        $("#connect").click(function(e) {
            e.preventDefault();

            var formData = new Object();

            formData.username = $("#username").val();
            formData.password = $("#password").val();

            let formDataToJson = JSON.stringify(formData);

            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:3000/users/signin",
                contentType: "application/json",
                data: formDataToJson,
                success: function(response) {
                    alert(response.message);

                    window.localStorage.setItem("username", formData.username);
                    console.log(localStorage.getItem("username"));

                   window.location.replace('views/accueil.php');
                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
            });
        });
    },
    register : function (){
        $("#ins").click(function(e) {
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
                url: "http://127.0.0.1:3000/users/register",
                contentType: "application/json",
                data: formDataToJson,
                success: function(response) {
                    window.localStorage.setItem(formData.email, email);
                    alert(response.message)
                    window.location.replace('views/accueil.php');
                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
            });
    
        });
    }
}

var post = {

    display_post : function (){
        $.ajax({

            type: "GET",
            url: "http://127.0.0.1:3000/post",
            contentType: "application/json",
            dataType: 'json',
            success: function(response) {
                let post = response.data; //recuperer le data (la liste des postes dans notre cas)
    
                let html_output = "";
                $.each(post, function(key, value) {
                    html_output += "<div class='col-3 film-details' id ='' data-id='"+value.id+"'> <img src = 'images/ALVDAN_P3.jpg.jpg' class = 'movie-card'><br> <b class ='subt' id = 'title' ><a href = 'PagesSites/news.php/" + value.id + "'>" + value.title + "</a></b> <p class = 'desc_contenu' id = 'description'>" + value.description + " </p > </div > "
                })
    
                document.getElementById("films").innerHTML = html_output;
            },
            error: function(xhr, status, error) {
                console.error(xhr);
            }
    
        });

    },

    display_details : function (){

        $(document).on('click', '.film-details', function(){
            let id = $(this).data('id')
            console.log(id)

            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:3000/post/" + id,
                contentType: "application/json",
                dataType: 'json',
                success: function(response) {
                    let film = response.data; 
                    let film_output = "";
                    $.each(film, function(key, value) {
                        film_output += "<div class='col-3'><a href='' </div>"
                    })
                    document.getElementById("detail_film").innerHTML = film_output;
                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
        
            });
        })

   
    }

}

