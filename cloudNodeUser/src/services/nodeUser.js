//import {stringify} from "qs";
import request from '@/utils/request';

export async function queryUser() {
  return request(`/api/users`);
}

export async function deleteUser(params) {
  // console.log(params.ids[0]);
  return request(`/api/users/${params.ids[0]}`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addUser(params) {
  //console.log(params);
  return request(`/api/users`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params) {
  //console.log(params.user.id);
  return request(`/api/users/${params.user.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
