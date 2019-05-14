const ids = [
  '12ee3e2f-f483-4a7b-ba38-941c568f1e47',
  '0d641353-293b-4365-ba09-94f94629e559',
  '58791f28-42a5-4961-9218-4418274f1bb5',
];

const reqHeader = new Headers();
reqHeader.append('Content-Type', 'text/json');
reqHeader.append('x-ibm-client-id', '5f03cf27-39e3-4fa6-a1b4-c5e1e63b3fb1');
reqHeader.append(
  'x-ibm-client-secret',
  'Y4rA3eA3yT5iA3dW5pF2bR6sX4sR1kL4kS1rP4wN4rI5wK2oX4'
);
const initObject = {
  method: 'POST',
  headers: reqHeader,
};
const url =
  'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
fetch(url, initObject);
