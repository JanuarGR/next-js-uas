import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function odtService() {
  const url = `${ROOT_API}/${API_VERSION}/odt`;

  return callAPI({
    url,
    method: 'GET',
    isToken: true,
  });
}

export async function odtServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/odt`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function odtServiceEdit(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/odt/${id}/edit`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function odtServiceUpdate(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/odt/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
  });
}

export async function odtServiceDestroy(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/odt/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
  });
}
