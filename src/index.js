import './_scss/main.scss';
/* FUNCTIONS DECLARATION */

function ChunkArray(array, chunk) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunk));
  }
  return results;
}

function WCHRequest(idsPackage) {
  const xhr = new XMLHttpRequest();
  const reqBody = JSON.stringify({
    fields: ['id', 'elements'],
    ids: idsPackage,
  });
  const APIUrl =
    'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
  xhr.open('POST', APIUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(data) {
    if (this.status === 200) {
      const responseData = JSON.parse(this.responseText);
      // Recorremos cada resultado
      for (let dataIndex = 0; dataIndex < responseData.length; dataIndex += 1) {
        const dataElement = responseData[dataIndex];
        const imageDomain =
          'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9';
        let src;
        /* console.log(
          dataElement.elements.images.values[0].renditions.default.url
        ); */
        // Recorremos array de nodos
        for (let nodeIndex = 0; nodeIndex < imageNodes.length; nodeIndex += 1) {
          const imageNode = imageNodes[nodeIndex];
          // Comparamos id del nodo con el id de cada dato retornado
          if (dataElement.id === imageNode.dataset.id) {
            // Comparamos el tipo de imagen
            if (imageNode.dataset.imageType === 'r') {
              switch (imageNode.dataset.imageSize) {
                case 's':
                  src =
                    dataElement.elements.images.values[0].renditions.small_r
                      .source;
                  break;
                case 'm':
                  src =
                    dataElement.elements.images.values[0].renditions.medium_r
                      .source;
                  break;
                case 'l':
                  src =
                    dataElement.elements.images.values[0].renditions.large_r
                      .source;
                  break;
                default:
                  src =
                    dataElement.elements.images.values[0].renditions.default
                      .source;
                  break;
              }
            } else if (imageNode.dataset.imageType === 'c') {
              switch (imageNode.dataset.imageSize) {
                case 's':
                  src =
                    dataElement.elements.images.values[0].renditions.small_c
                      .source;
                  break;
                case 'm':
                  src =
                    dataElement.elements.images.values[0].renditions.medium_c
                      .source;
                  break;
                case 'l':
                  src =
                    dataElement.elements.images.values[0].renditions.long_c
                      .source;
                  break;
                default:
                  src =
                    dataElement.elements.images.values[0].renditions.default
                      .source;
                  break;
              }
            } else {
              src =
                dataElement.elements.images.values[0].renditions.default.source;
            }
            // Comparamos si el elemento es IMG o DIV
            if (imageNode.tagName === 'IMG') {
              imageNode.src = imageDomain + src;
              imageNode.addEventListener('load', function() {
                imageNode.alt = imageNode.dataset.alt;
                imageNode.title = imageNode.dataset.title;
              });
            } else {
              imageNode.style.backgroundImage =
                // eslint-disable-next-line prefer-template
                'url(' + imageDomain + src + ')';
              imageNode.style.backgroundSize = 'cover';
            }
          }
        }
      }
      return responseData;
    }
    console.log('Error', xhr);
  };
  xhr.send(reqBody);
}

function getImageData(array) {
  for (let i = 0; i < array.length; i += 1) {
    const element = array[i];
    const resultados = WCHRequest(element);
  }
}
/* END FUNCTIONS DECLARATION */

// Capturamos todos los elementos que tengan la clase asignada
const imageNodes = document.getElementsByClassName('wch-image');
// Convertimos todo el objeto de elementos en un array
const imageNodesToArray = Array.prototype.slice.call(imageNodes);
// Creamos un nuevo array solo con los Id's de cada imagen
const imagesNodesIds = imageNodesToArray.map(image => image.dataset.id);
const chunkSize = 25; // Límite de elemento spor petición
// Dividimos el arreglo de Id's en las cantidades permitidas por la API.(25 en este caso)
const imageIdsPackage = ChunkArray(imagesNodesIds, chunkSize);
getImageData(imageIdsPackage);
