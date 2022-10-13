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

    $(document).on('submit', '#post-form', async function (e) {
        e.preventDefault();
        let file = $('#banner')[0].files[0];
        let formData = new FormData(this)
        formData.append('user_id', "1");
        let formDataObject = Object.fromEntries(formData.entries())
        await axios
            .post("http://localhost:4000/post/create", formDataObject)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    });


    // AXIOS REQUEST ENDING

    function display_post(posts) {
        let posts_content = "";
        $.each(posts, function (key, value) {
            posts_content = `<tr>
                <td>${value.title}</td>
                <td>${value.description}</td>
                <td>${value.banner}</td>
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
});