export const WCHRequest = async idsPackage => {
  try {
    const reqBody = JSON.stringify({
      fields: ['id', 'elements'],
      ids: idsPackage,
    });
    const reqHeader = new Headers();
    reqHeader.append('Content-Type', 'application/json');
    const initObject = {
      method: 'POST',
      headers: reqHeader,
      body: reqBody,
    };
    const url =
      'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';
    const response = await fetch(url, initObject);
    const data = await response.json();
    return Array.prototype.slice.call(data);
  } catch (e) {
    console.log('error:', e);
  }
};
