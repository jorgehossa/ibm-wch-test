import './_scss/main.scss';

const { Image } = require('./classes/Image');
const { Request } = require('./classes/Request');

const images = document.querySelectorAll('.wch-image');
const imagesIds = [];

images.forEach(image => {
  const imageData = new Image(
    image.dataset.id,
    image.dataset.imageType,
    image.dataset.imageSize,
    image.tagName
  );
  imagesIds.push(imageData.id);
});

const reqData = JSON.stringify({
  fields: ['id', 'elements'],
  ids: imagesIds,
});

const reqHeader = new Headers();
reqHeader.append('Content-Type', 'application/json');
const initObject = {
  method: 'POST',
  headers: reqHeader,
  body: reqData,
};
const url =
  'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
fetch(url, initObject)
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        `Looks like there was a problem. Status Code: ${response.status}`
      );
      return;
    }
    // Examine the text in the response
    response.json().then(function(data) {
      console.log(data[0]);
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
