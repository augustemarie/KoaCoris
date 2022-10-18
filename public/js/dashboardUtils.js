$(document).ready(function () {

    // AXIOS REQUEST BEGIN
    const api_base_url = "https://test3.afrikastream.com/";

    axios
        .get(api_base_url + "post")
        .then((response) => {
            display_post(response.data.data)
        })
        .catch((error) => console.error(error));

    axios
        .get(api_base_url + "post/type")
        .then((response) => {
            display_post_attributes(response.data.data, "post-type")
        })
        .catch((error) => console.error(error));

    axios
        .get(api_base_url + "post/category")
        .then((response) => {
            display_post_attributes(response.data.data, "post-category")
        })
        .catch((error) => console.error(error));


    axios
        .get(api_base_url + "post/category")
        .then((response) => {
            display_categories(response.data.data, "post-category")
        })
        .catch((error) => console.error(error));

    $(document).on('submit', '#categories-form', async function (e) {
        e.preventDefault();
        //
        let data = JSON.stringify({
            "user_id": localStorage.getItem("user_id"),
            "name": $("#category-name").val(),
            "description": $("#category-description").val()
        });

        var config = {
            method: 'post',
            url: api_base_url + "/post/category/create",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                alert(response.data.message);
                display_categories(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    $(document).on('submit', '#post-form', async function (e) {
        e.preventDefault();
        let file = $('#banner')[0].files[0];
        let form = new FormData();
        form.append("file", file, file.name);

        //Data Post
        let postData = new FormData(this)
        postData.append('user_id', localStorage.getItem("user_id"));

        let config = {
            method: 'post',
            url: api_base_url + "/upload/video/",
            data: form
        };

        axios(config)
            .then(function (response) {
                postData.set('banner', response.data.data.name);
                let formDataObject = Object.fromEntries(postData.entries())
                axios
                    .post(api_base_url + "/post/create", formDataObject)
                    .then((response) => {
                        alert(response.data.message);
                        display_post(response.data.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            });
    });


    // AXIOS REQUEST ENDING

    function display_post(posts) {
        let posts_content = "";
        $.each(posts, function (key, value) {
            posts_content = `<tr>
                <td>${value.title}</td>
                <td>${value.description}</td>
                <td>${value.status}</td>
                <td>${value.post_type.name}</td>
                <td>${value.post_categories.name}</td>
            </tr>`;

            $("#post-content").append(posts_content);
        });
    }

    function display_post_attributes(post, selector) {
        let post_attributes = "";
        $.each(post, function (key, value) {
            post_attributes = `<option value=${value.id}>${value.name}</option>`
            $("#" + selector).append(post_attributes);
        });
    }

    function display_categories(categories) {
        let categories_content = "";
        $.each(categories, function (key, value) {
            categories_content = `  <tr>
                                        <td>${value.id}</td>
                                        <td>${value.name}</td>
                                        <td>${value.description}</td>
                                    </tr>`;

            $("#categories-list").append(categories_content);
        });
    }
});