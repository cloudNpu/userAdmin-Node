import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './user.less';

const FormItem = Form.Item;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="添加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('u_name', {
          rules: [{ required: true, message: '用户名不能为空！', min: 0 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="年龄">
        {form.getFieldDecorator('u_age', {
          rules: [{ required: true, message: '年龄不能为空！', min: 0 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型ID">
        {form.getFieldDecorator('type_id', {
          rules: [{ required: true, message: '类型ID不能为空！', min: 0 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      {/*<FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="出生日期">*/}
      {/*{form.getFieldDecorator("birthday", {*/}
      {/*//  rules: [{ required: true, message: '请选择时间' }],*/}
      {/*})(<Input placeholder="请输入" />)}*/}
      {/*</FormItem>*/}
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formVals: {
        id: props.values.id,
        u_name: props.values.u_name,
        u_age: props.values.u_age,
        type_id: props.values.type_id,
        type_name: props.values.type_name,
        // birthday: props.values.birthday,
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep === 0) {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    return [
      // <FormItem key="id" {...this.formLayout} label="用户ID">
      //   {form.getFieldDecorator("id", {
      //     initialValue: formVals.id
      //  })(<Input placeholder="请输入"/>)}
      // </FormItem>,
      <FormItem key="u_name" {...this.formLayout} label="用户名">
        {form.getFieldDecorator('u_name', {
          initialValue: formVals.u_name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="u_age" {...this.formLayout} label="年龄">
        {form.getFieldDecorator('u_age', {
          initialValue: formVals.u_age,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="type_id" {...this.formLayout} label="类型ID">
        {form.getFieldDecorator('type_id', {
          initialValue: formVals.type_id,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      // <FormItem key="type_name" {...this.formLayout} label="类型名称">
      //   {form.getFieldDecorator("type_name", {
      //     initialValue: formVals.type_name
      //   })(<Input placeholder="请输入"/>)}
      // </FormItem>,
      //    <FormItem key="birthday" {...this.formLayout} label="出生日期">
      //        {form.getFieldDecorator("birthday", {
      //            initialValue: formVals.birthday
      //            //rules: [{ required: true, message: '请选择时间！' }],
      //        })(<Input placeholder="请输入" />)}
      //    </FormItem>,
    ];
  };
  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
        完成
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑用户"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

@connect(({ nodeUser, loading }) => ({
  nodeUser,
  loading: loading.models.nodeUser,
}))
@Form.create()
class User extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'u_name',
    },
    {
      title: '年龄',
      dataIndex: 'u_age',
    },
    {
      title: '类型ID',
      dataIndex: 'type_id',
    },
    {
      title: '类型名称',
      dataIndex: 'type_name',
    },
    // {
    //     title: "出生日期",
    //     dataIndex: "birthday"
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // console.log(this.props);
    dispatch({
      type: 'nodeUser/fetch',
      payload: {},
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      //  currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    // console.log(params);
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'nodeUser/fetch',
      payload: params,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch, modalVisible } = this.props;
    const { selectedRows } = this.state;
    // const okHandle = () => {
    //   form.validateFields((err, fieldsValue) => {
    //     if (err) return;
    //     form.resetFields();
    //     handleAdd(fieldsValue);
    //   });
    // };

    if (!selectedRows) return;
    switch (e.key) {
      case 'delete':
        // let a = selectedRows.map(row => row.id);
        dispatch({
          type: 'nodeUser/delete',
          payload: {
            ids: selectedRows.map(row => row.id),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        //console.log(selectedRows.map(row => row.key));能输出要删除行的key
        break;
      //
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'nodeUser/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  //
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nodeUser/add',
      payload: {
        user: {
          u_name: fields.u_name,
          u_age: fields.u_age,
          // birthday: fields.birthday,
          type_id: fields.type_id,
        },
      },
    });
    //  console.log(payload);
    message.success('添加成功');
    this.handleModalVisible();
  };

  //
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'nodeUser/update',
      payload: {
        user: {
          id: fields.id,
          u_name: fields.u_name,
          u_age: JSON.parse(fields.u_age),
          // birthday: fields.birthday,
          type_id: fields.type_id,
          //  type_name: fields.type_name
        },
      },
    });
    message.success('编辑成功');
    this.handleUpdateModalVisible();
  };

  //条件查询
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    // return (
    //   <Form onSubmit={this.handleSearch} layout="inline">
    //     <Row gutter={{md: 8, lg: 24, xl: 48}}>
    //       <Col md={8} sm={24}>
    //         <FormItem label="用户名">
    //           {getFieldDecorator("u_name")(<Input placeholder="请输入"/>)}
    //         </FormItem>
    //       </Col>
    //       <Col md={8} sm={24}>
    //         <span className={styles.submitButtons}>
    //           <Button type="primary" htmlType="submit">
    //             查询
    //           </Button>
    //         </span>
    //       </Col>
    //     </Row>
    //   </Form>
    // );
  }

  // renderAdvancedForm() {
  //   const {
  //     form: {getFieldDecorator}
  //   } = this.props;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row gutter={{md: 8, lg: 24, xl: 48}}>
  //         <Col md={8} sm={24}>
  //           <FormItem label="用户名">
  //             {getFieldDecorator("u_name")(<Input placeholder="请输入"/>)}
  //           </FormItem>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      nodeUser: { data },
      loading,
    } = this.props;
    // console.log(this.props);
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />

        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default User;
