const ids = [
  '12ee3e2f-f483-4a7b-ba38-941c568f1e47',
  '0d641353-293b-4365-ba09-94f94629e559',
  '58791f28-42a5-4961-9218-4418274f1bb5',
];
const data = JSON.stringify({
  fields: ['elements'],
  ids,
});

const initObject = {
  method: 'POST',
  headers: {
    'x-ibm-client-id': process.env.CLIENT_ID,
    'x-ibm-client-secret': process.env.CLIENT_SECRET,
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  body: data,
};
const url =
  'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
fetch(url, initObject).then(response => console.log(response));
