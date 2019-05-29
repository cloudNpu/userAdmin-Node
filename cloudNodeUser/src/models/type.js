import { queryType } from '../services/type';
export default {
  namespace: 'type',

  state: {
    data: {
      list: [],
      pagination: { pageSize: 8 },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryType, payload);
      yield put({
        type: 'save',
        payload: {
          list: response,
          pagination: { pageSize: 8 },
        },
      });
    },
  },

  reducers: {
    //处理所有同步逻辑
    save(state, action) {
      return {
        ...state,
        data: action.payload, //数据返回给页面
      };
    },
  },
};
