import './_scss/main.scss';

const { Image } = require('./classes/Image');
const { Request } = require('./classes/Request');

const images = document.querySelectorAll('.wch-image');
const imagesData = [];

/* Itereamos cada elemento con la clase para tomar los datos y crear un nuevo objeto de la clase Image, y guardamos cada elemento en un nuevo array con los objetos */

images.forEach(image => {
  const imageData = new Image(
    image.dataset.id,
    image.dataset.imageType,
    image.dataset.imageSize,
    image.tagName
  );
  imagesData.push(imageData);
});

/* Creamos un nuevo array solo con los Id's de cada imagen */

const imagesIds = imagesData.map(image => image.id);

/* Creamos un nuevo request pasandole como parametro los Id's */

const request = new Request(imagesIds);

async function getData() {
  const data = await request.getImagesData();
  console.log(data);
  images.forEach(image => {
    data.forEach(element => {
      if (element.id === image.dataset.id) {
        const src = element.elements.images.values[0].renditions.default.source;
        const domain =
          'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9';
        if (image.tagName === 'IMG') {
          image.src = `${domain}${src}`;
        } else {
          image.style.backgroundImage = `url(${domain}${src})`;
          image.style.backgroundPosition = `center`;
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getData();
});
