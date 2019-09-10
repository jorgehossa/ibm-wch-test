export const WCHRequest = idsPackage => {
  const xhr = new XMLHttpRequest();
  const reqBody = JSON.stringify({
    fields: ['id', 'elements'],
    ids: idsPackage,
  });
  const APIUrl =
    'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
  xhr.open('POST', APIUrl, true);
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(data) {
    if (this.status === 200) {
      return JSON.parse(data.currentTarget.response);
    }
    console.log('Error', xhr);
  };
  xhr.send(reqBody);
};
