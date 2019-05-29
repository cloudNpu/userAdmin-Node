import { addUser, queryUser, deleteUser, updateUser } from '../services/nodeUser';
export default {
  namespace: 'nodeUser',

  state: {
    data: {
      list: [],
      pagination: { pageSize: 8 },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      // console.log(response);
      yield put({
        type: 'save',
        payload: {
          list: response,
          pagination: { pageSize: 8 },
        },
      });
    },
    *add({ payload, callback }, { call, put, select }) {
      // console.log(payload.user);   //正常
      const response = yield call(addUser, payload);
      // console.log(response);
      let list = yield select(state => state.nodeUser.data.list);
      // console.log(list);
      list.push(payload.user);
      yield put({
        type: 'save',
        payload: {
          list: list,
          pagination: { pageSize: 8 },
        },
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put, select }) {
      // console.log(payload);
      // console.log(payload.ids);
      const response = yield call(deleteUser, payload);
      // console.log(response);
      let list = yield select(state => state.nodeUser.data.list);
      // console.log(list);
      for (let i = 0, flag = true; i < list.length; flag ? i++ : i) {
        for (let j = 0; j < payload.ids.length; j++) {
          if (list[i].id === payload.ids[j]) {
            list.splice(i, 1);
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
      }
      yield put({
        type: 'save',
        payload: {
          list: list,
          pagination: { pageSize: 8 },
        },
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put, select }) {
      console.log(payload); //
      const response = yield call(updateUser, payload);
      //  console.log(response);
      let list = yield select(state => state.nodeUser.data.list);
      // console.log(list[0].type_name);
      yield list.forEach((value, index, array) => {
        let user = array[index];
        payload.user.type_name = list[0].type_name; // 给payload.user添加type_name属性
        // let res_user = payload.user;
        if (user.id === payload.user.id) {
          array[index] = payload.user;
          //console.log(array[index]);
          // console.log(array[index].u_age);
        }
      });
      //  console.log(list);
      yield put({
        type: 'save',
        payload: {
          list: list,
          pagination: { pageSize: 8 },
        },
      });
      if (callback) callback();
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
