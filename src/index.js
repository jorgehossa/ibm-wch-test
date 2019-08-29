import './_scss/main.scss';

const { Request } = require('./classes/Request');

const imageElements = document.querySelectorAll('.wch-image');
const arrayImageElements = Array.prototype.slice.call(imageElements);

/* Creamos un nuevo array solo con los Id's de cada imagen */

const imagesIds = arrayImageElements.map(image => image.attributes[1].value);
const chunkSize = 25; // Límite de elemento spor petición

// Función para dividir el arreglo de Id's
const chunkArray = (array, chunk) => {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunk));
  }
  return results;
};

// Dividimos el arreglo de Id's en las cantidades permitidas por la API.
const splitArray = chunkArray(imagesIds, chunkSize);

// Recorremos el arreglo para realizar la petición.
splitArray.forEach(array => {
  const request = new Request(array);
  async function getImages() {
    const data = await request.getImagesData();
    data.forEach(media => {
      // Recorremos cada elemento de imagen en el DOM y le asignamos el src correspondiente segun sus datos.
      imageElements.forEach(imageTag => {
        // Validamos que los ID coincidan y realizamos un switch segun el tipo y tamaño de la imagen
        if (media.id === imageTag.dataset.id) {
          const domain = 'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9';

          let src;
          // Validación de imágenes rectangulares
          if (imageTag.dataset.imageType === 'r') {
            switch (imageTag.dataset.imageSize) {
              case 's':
                src = media.elements.images.values[0].renditions.small_r.source;
                break;
              case 'm':
                src = media.elements.images.values[0].renditions.medium_r.source;
                break;
              case 'l':
                src = media.elements.images.values[0].renditions.large_r.source;
                break;
              default:
                src = media.elements.images.values[0].renditions.default.source;
                break;
            }
          }
          // Validación de imágenes cuadradas
          else if (imageTag.dataset.imageType === 'c') {
            switch (imageTag.dataset.imageSize) {
              case 's':
                src = media.elements.images.values[0].renditions.small_c.source;
                break;
              case 'm':
                src = media.elements.images.values[0].renditions.medium_c.source;
                break;
              case 'l':
                src = media.elements.images.values[0].renditions.long_c.source;
                break;
              default:
                src = media.elements.images.values[0].renditions.default.source;
                break;
            }
          } else {
            src = media.elements.images.values[0].renditions.default.source;
          }
          // Validamos el tipo de elemento y le asignamos los atributos necesarios
          if (imageTag.tagName === 'IMG') {
            imageTag.src = `${domain}${src}`;
            if (imageTag.complete) {
              imageTag.setAttribute('alt', imageTag.dataset.alt);
              imageTag.setAttribute('title', imageTag.dataset.title);
              imageTag.parentElement.classList.replace('loading', 'image-loaded');
            }
            /* imageTag.onload = () => {
              imageTag.setAttribute('alt', imageTag.dataset.alt);
              imageTag.setAttribute('title', imageTag.dataset.title);
              imageTag.parentElement.classList.replace(
                'loading',
                'image-loaded'
              );
            }; */
          } else {
            imageTag.style.backgroundImage = `url(${domain}${src})`;
            imageTag.style.backgroundPosition = `center`;
          }
        }
      });
    });
  }
  // Llamamos la función
  getImages();
});
