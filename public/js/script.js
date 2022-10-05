$(document).ready(function() {
    users.register();
    users.connexion();
    post.display_post();
    post.display_details();

   
});

// const api_base_url = "http://localhost:4000/coris-cine";

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
                url: "http://127.0.0.1:4000/users/signin",
                contentType: "application/json",
                data: formDataToJson,
                success: function(response) {
                    alert(response.message);

                    window.localStorage.setItem("username", formData.username);

                   window.location.replace('/accueil');
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
                url: "http://127.0.0.1:4000/users/register",
                contentType: "application/json",
                data: formDataToJson,
                success: function(response) {
                    window.localStorage.setItem(formData.email, email);
                    alert(response.message)
                    window.location.replace('/accueil');
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
            url: "http://127.0.0.1:4000/post",
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            },
            success: function(response) {
                let post = response.data; //recuperer le data (la liste des postes dans notre cas)
    
                let html_output = "";
                $.each(post, function(key, value) {
                    html_output += "<div class='col-3 film-details' id ='' data-id='"+value.id+"'> <img src = '../images/ALVDAN_P3.jpg.jpg' class = 'movie-card'><br> <b class ='subt' id = 'title' ><span>" + value.title + "</span></b> <p class = 'desc_contenu' id = 'description'>" + value.description + " </p > </div > "
                })
    $('#films').html(html_output)
                // document.getElementById("films").innerHTML = html_output;
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
                url: "http://127.0.0.1:4000/post/" + id,
                contentType: "application/json",
                dataType: 'json',
                success: function(response) {
                    let film = response.data; 
                    let film_output = "";
                    window.localStorage.setItem("title", film.title);
                    window.localStorage.setItem("content", film.content);
                    window.localStorage.setItem("description", film.description);

                    window.location.replace('/synopsis');

                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
        
            });
        })

   
    }

}
