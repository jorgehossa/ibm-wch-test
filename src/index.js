import './_scss/main.scss';
import { WCHRequest } from './functions/WCHRequest';
import { ChunkArray } from './functions/ChunkArray';

const { Request } = require('./classes/Request');
// Capturamos todos los elementos que tengan la clase asignada
const imageNodes = document.querySelectorAll('.wch-image');
// Convertimos todo el objeto de elementos en un array
const imageNodesToArray = Object.values(imageNodes);
// Creamos un nuevo array solo con los Id's de cada imagen
const imagesNodesIds = imageNodesToArray.map(image => image.dataset.id);
const chunkSize = 25; // Límite de elemento spor petición
// Dividimos el arreglo de Id's en las cantidades permitidas por la API.(25 en este caso)
const imageIdsPackage = ChunkArray(imagesNodesIds, chunkSize);

const getImageData = array => {
  for (let i = 0; i < array.length; i += 1) {
    const dataIds = WCHRequest(array);
    return dataIds;
  }
};

const imageData = getImageData(imageIdsPackage);
debugger;

// Recorremos el arreglo para realizar la petición.
imageIdsPackage.forEach(idsPackage => {
  const request = new Request(idsPackage);
  async function getImages() {
    const data = await request.getImagesData();
    data.forEach(media => {
      // Recorremos cada elemento de imagen en el DOM y le asignamos el src correspondiente segun sus datos.
      imageNodes.forEach(imageTag => {
        // Validamos que los ID coincidan y realizamos un switch segun el tipo y tamaño de la imagen
        if (media.id === imageTag.dataset.id) {
          const domain =
            'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9';

          let src;
          // Validación de imágenes rectangulares
          if (imageTag.dataset.imageType === 'r') {
            switch (imageTag.dataset.imageSize) {
              case 's':
                src = media.elements.images.values[0].renditions.small_r.source;
                break;
              case 'm':
                src =
                  media.elements.images.values[0].renditions.medium_r.source;
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
                src =
                  media.elements.images.values[0].renditions.medium_c.source;
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
            imageTag.onload = () => {
              imageTag.setAttribute('alt', imageTag.dataset.alt);
              imageTag.setAttribute('title', imageTag.dataset.title);
              imageTag.parentElement.classList.replace(
                'loading',
                'image-loaded'
              );
            };
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
