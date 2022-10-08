$(document).ready(function() {
    users.register();
    users.connexion();
    post.display_post();
    post.display_details();

   
});
  const api_base_url = "https://test3.afrikastream.com/";



var users = {
    connexion: function() {
        $("#login").click(function(e) {
            e.preventDefault();
            // alert("nbjnmnm")

            var formData = new Object();

            formData.username = $("#email").val();
            formData.password = $("#password").val();

            let formDataToJson = JSON.stringify(formData);

            $.ajax({
                type: "POST",
                url: api_base_url+ "users/signin",
                contentType: "application/json",
                data: formDataToJson,
                success: function(response) {
                    alert(response.message);
                    let userData = response.users;

                    if (userData.role=="USERS") {
                        window.location.replace('/index');
                    }else if (userData.role=="ADMIN"){
                        window.location.replace('/dashboard/articles');
                    }
                    window.localStorage.setItem("username", userData.email);
                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
            });
        });
    },
    register : function (){
        $("#register").click(function(e) {
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
                success: function(response) {
                    window.localStorage.setItem(formData.email, email);
                    alert(response.message)
                    if (formData.role="USERS") {
                        window.location.replace('/index');
                    }else if (formData.role="ADMIN"){
                        window.location.replace('/dashboard/articles');

                    }
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
            url: api_base_url+'/post',
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            },
            success: function(response) {
                let post = response.posts; //recuperer le data (la liste des postes dans notre cas)
                let html_output = "";
                $.each(post, function(key, value) {
                    html_output += "<div class='col-3 film-details' id ='' data-id='"+value.id+"'> <img src = '../images/ALVDAN_P3.jpg.jpg' class = 'movie-card'><br> <b class ='subt' id = 'title' ><h5>" + value.title + "</h5></b> <div class = 'desc_contenu' id = 'description'>" + value.description + " </div > </div > "
                })
    $('.films').html(html_output)
                 // document.getElementsByClassName("films").innerHTML = html_output;
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
                url: api_base_url +'/post/' + id,
                contentType: "application/json",
                dataType: 'json',
                success: function(response) {
                    let film = response.post;
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
