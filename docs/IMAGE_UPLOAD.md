# Image and file upload using third party:

This article has a video tutorial: https://www.loom.com/share/75d597bfb9c64aa7822cc1d9f9ad1576

This is quick 10 min tutorial that hopefully will help you use the Cloudnary API to allow users to upload images into your application using the traditional `<input type="file>`.

You can [click here to open the example code hosted on this repository](https://github.com/4GeeksAcademy/react-flask-hello/tree/example/cloudinary_image_upload).

## Don't upload files to your database

Initially user-uploaded files and images were stored in the same database, but throught the years almost every company in the world stopped doing it with a few exceptions, here is why:

1. Security: if users can upload images, What is stopping them to upload malware?; Some malware can be easily hidden within images.
2. Performance: All of the third party storage services have CDN's available. A CDN can speed your performance in huge amounts, images will load strongly faster.
3. Price: storage services like Cloudinary, AWS S3 or Google Storage are really cheap, you will pay only cents or a couple of dollars for the most part.
4. Easy: It's easier to implement and easier to maintain.

## Architecture

We will be using Cloudinary API to save the images, its free and 100% integrated with Heroku.

![Architecture](https://github.com/4GeeksAcademy/react-flask-hello/blob/master/docs/assets/diagram.png?raw=true)

The image upload occurs in 4 steps:
1. First you create an html `<form>` with one `<input type="file" />` and use Javascript/React to send the user-selected files to the backend using the fetch API.
2. The API (backend) will receive that request, retrive the binary files and send them to the Cloud Storage (Cloudinary).
3. Cloudinary will respond with a 200 and the URL of the saved image.
4. The API saves that image url on the database end responds back to the client.

## Front-end

The front end is devided in three steps:

1. **Create the form**: You have to create a `<form>` with one `<input type="file" />` inside, `file` inputs are very simular to `text` but they are made for files (not text), instead of using `event.target.value` to retrieve its value, you use `event.target.files`.
2. **Listen to the input change**: When the file input changes, (`onChange`) you have to retrieve all the files that the user picked by the user by using `event.target.files`, then we store those files in a hooked variable for the near future when the form submission occurs.
3. **Listen to the form submit**: Finally whenever the user decides to submit the form (`onSubmit`), you fetch to the backend API endpoint those files using the FormData object provided by the browser.

```jsx
const [files, setFiles] = useState(null);

const uploadImage = evt => {
    evt.preventDefault();
    // we are about to send this to the backend.
    console.log("This are the files", files);
    let body = new FormData();
    body.append("profile_image", files[0]);
    const options = {
        body,
        method: "POST"
    };
    fetch(process.env.BACKEND_URL + "/upload", options)
        .then(resp => resp.json())
        .then(data => console.log("Success!!!!", data))
        .catch(erros => console.error("ERRORRRRRR!!!", error));
};

return (
    <div className="jumbotron">
        <form onSubmit={uploadImage}>
            <input type="file" onChange={e => setFiles(e.target.files)} />
            <button>Upload</button>
        </form>
    </div>
);
```

## Backend

The backend is expecting the files from the front end inside the `request` object, specifically in the `request.files` property.

```python
import cloudinary
import cloudinary.uploader

@api.route('/profile/image/<int:user_id>', methods=['PUT'])
def handle_upload(user_id):

    # validate that the front-end request was built correctly
    if 'profile_image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['profile_image'])

        # fetch for the user
        user1 = User.query.get(user_id)
        # update the user with the given cloudinary image URL
        user1.profile_image_url = result['secure_url']

        db.session.add(user1)
        db.session.commit()

        return jsonify(user1.serialize()), 200
    else:
        raise APIException('Missing profile_image on the FormData')
```
