export class Request {
  constructor(ids) {
    this.ids = ids;
  }

  async getImagesData() {
    const reqData = JSON.stringify({
      fields: ['id', 'elements'],
      ids: this.ids,
    });

    const reqHeader = new Headers();
    reqHeader.append('Content-Type', 'application/json');
    const initObject = {
      method: 'POST',
      headers: reqHeader,
      body: reqData,
    };
    const url =
      'https://my7.digitalexperience.ibm.com/api/1285e1d2-5151-4eab-9da2-775291879cb9/delivery/v1/content/bulk_retrieve';

    const response = await fetch(url, initObject);
    const data = await response.json();
    // debugger;
    return data;
  }
}
