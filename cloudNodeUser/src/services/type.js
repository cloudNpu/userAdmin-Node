import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryType() {
  return request(`/api/types`);
}
