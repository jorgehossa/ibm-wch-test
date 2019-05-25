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
    image.tagName,
    image.dataset.alt,
    image.dataset.title
  );
  imagesData.push(imageData);
});

/* Creamos un nuevo array solo con los Id's de cada imagen */

const imagesIds = imagesData.map(image => image.id);

/* Creamos un nuevo request pasandole como parametro los Id's */

const request = new Request(imagesIds);

// Función para ejecutar petición y renderizar imágenes

async function getData() {
  const data = await request.getImagesData();
  // Itereamos cada imagen
  images.forEach(image => {
    // Iteramos en cada dato retornado
    data.forEach(element => {
      // Validamos si el ID de la info correcponde con el del elemento y asignamos la url
      if (element.id === image.dataset.id) {
        const domain =
          'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9';

        let src;
        if (image.dataset.imageType === 'r') {
          switch (image.dataset.imageSize) {
            case 's':
              src = element.elements.images.values[0].renditions.small_r.source;
              break;
            case 'm':
              src =
                element.elements.images.values[0].renditions.medium_r.source;
              break;
            case 'l':
              src = element.elements.images.values[0].renditions.large_r.source;
              break;
            default:
              src = element.elements.images.values[0].renditions.default.source;
              break;
          }
        }
        if (image.dataset.imageType === 'c') {
          switch (image.dataset.imageSize) {
            case 's':
              src = element.elements.images.values[0].renditions.small_c.source;
              break;
            case 'm':
              src =
                element.elements.images.values[0].renditions.medium_c.source;
              break;
            case 'l':
              src = element.elements.images.values[0].renditions.long_c.source;
              break;
            default:
              src = element.elements.images.values[0].renditions.default.source;
              break;
          }
        } else {
          src = element.elements.images.values[0].renditions.default.source;
        }

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
