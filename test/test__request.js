const ids = [
  '0ccba18a-0143-421e-a47b-4d0f5c35e760',
  '0d641353-293b-4365-ba09-94f94629e559',
  '58791f28-42a5-4961-9218-4418274f1bb5',
  'fef5a532-4b49-41d1-b6a4-521f5aafbe77',
  '89ccbe0f-c6ef-430d-b26f-ad38fc70fa98',
  'ec5091bb-6420-4c1f-917d-339b31bcbe61',
  'bbb33564-6f2f-4d94-b3c6-0c469db87a54',
  '96f2b4ce-2f88-41b2-aa98-1bf108df62a0',
  '29d572b7-6e7c-44e1-a749-98a2a85952de',
  '645ee8a2-a68e-4e6f-8cb8-d2179c017e1a',
  '12c7a38d-5678-408f-8534-3db6e09cfc99',
  'd514c336-3983-4a8f-b11f-d83029462300',
  '78cad934-d6e6-49a7-95b1-7b3a5edb91c8',
  '70df02eb-145a-417e-b398-0b707e0b2647',
  '7d34496a-62c8-4f79-8af2-accd45524b3b',
  '17db4adf-e129-463e-961b-6e23f251f060',
  '8d64304a-827c-45ef-bdd8-60da661f29c3',
  'cb3917be-0022-4f51-8b8e-f7142e52c785',
  'b4993102-f7c2-4ed3-bfc6-c7b9af6e9c58',
  '5166d9ba-d040-4fe2-b07e-41c236ed9a82',
  '652ab821-be19-4807-835b-b29399414d30',
  'fbe99ea0-b47c-43fd-9cb0-e2b1ec513fad',
  'de368a8b-65b8-4b90-95c5-dd925f4746d7',
  'b92c339c-e129-457a-885d-e23cf69321e4',
  'b62e32ab-0d37-41b9-bffd-d39bd06c70f0',
];
const data = JSON.stringify({
  fields: ['elements'],
  ids,
});

const reqHeader = new Headers();
reqHeader.append('Content-Type', 'application/json');
const initObject = {
  method: 'POST',
  headers: reqHeader,
  body: data,
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
    response.json().then(function(elements) {
      console.log('this is data:', elements);
    });
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
