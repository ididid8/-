import React from 'react'
import {Table, Button, Tooltip, Form, Modal, Input, Select} from 'antd';
const FormItem = Form.Item
const Option = Select.Option;

const ID = [
    '主任',
    '老师',
    '学生',
    '实习',
];

class DetailForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemCfg_small = {
            labelCol:{ span: 8 },
            wrapperCol: { span: 8 },
            style: {marginBottom: 1},
        };
        return (
            <Form layout="horizontal">
                <FormItem label={'姓名'} {...formItemCfg_small}>
                    {
                        getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input name!'
                            }],
                        })(
                            <Input placeholder={'Name'} />
                        )
                    }
                </FormItem>
                <FormItem label={'年龄'} {...formItemCfg_small}>
                    {
                        getFieldDecorator('age', {
                            rules: [{
                                required: true, message: 'Please input age!'
                            }],
                        })(
                            <Input placeholder={'Age'} />
                        )
                    }
                </FormItem>
                <FormItem label={'性别'} {...formItemCfg_small}>
                    {
                        getFieldDecorator('sex', {
                            rules: [{
                                required: true, message: 'Please select sex!'
                            }],
                        })(
                            <Select>
                                <Option key={0} value={'男'}>男</Option>
                                <Option key={1} value={'女'}>女</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'身份'} {...formItemCfg_small}>
                    {
                        getFieldDecorator('id', {
                            rules: [{
                                required: true, message: 'Please select id!'
                            }],
                        })(
                            <Select>
                                {
                                    ID.map((value, key) => {
                                        return <Option key={key} value={value}>{value}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label={'个人描述'} {...formItemCfg_small}>
                    {
                        getFieldDecorator('descrip', {
                        })(
                            <Input type={'textarea'} placeholder={'请输入个人描述...'} rows={4} />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedDetailForm = Form.create()(DetailForm);

class DetailModal extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: this.props.visible,
        confirmLoading: false,
        data: this.props.data,
    }


    onChildrenIsMounted(){
        const { info } = this.state.data;
        let demo = this.getFormValue;
        demo.setFieldsValue(info);
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                visible: nextProps.visible,
                data: nextProps.data,
            }
        )
    }


    handleOk = (e) => {
        this.setState(
            {
                visible: false,
                data: {},
            }
        )
        let demo = this.getFormValue;
        demo.validateFields((err, values) => {
            if(!err){
                let data = this.state.data;
                data.info = values;
                this.props.editDetail(data)
            }
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            data: {},
        });
    }

    render(){
        debugger
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Modal title={'Title'}
                visible={visible}
                onOk={this.handleOk.bind(this)}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel.bind(this)}>
                    <WrappedDetailForm ref={v => (this.getFormValue = v)} data={this.props.data} />
                </Modal>
            </div>
        );
    }
}

export default class ItemPanel extends React.Component{
    state = {
        visible: false,
        detail: {}
    }

    columns = [{
        title: '姓名',
        dataIndex: 'info.name',
        key: 'name',
    },{
        title: '年龄',
        dataIndex: 'info.age',
        key: 'age',
    },{
        title: '身份',
        dataIndex: 'info.id',
        key: 'id',
    },{
        title: '性别',
        dataIndex: 'info.sex',
        key: 'sex',
    },{
        title: '操作',
        key:'action',
        render: (record) => {
            return (
                <span>
                    <Tooltip title={'详情'}>
                        <Button icon="inbox" onClick={this.showDetail.bind(this, record)} />
                    </Tooltip>

                    <Tooltip title={'删除'}>
                        <Button icon="delete" onClick={this.deleteItem.bind(this, record)} />
                    </Tooltip>
                </span>
            )
        }

    }];

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                visible: false
            }
        )
    }

    deleteItem(record){
        Modal.confirm({
            title: "确认",
            content: `确认要删除[${record.info.name}]?`,
            onOk: () => {
                this.props.removeStaffItem(record.key);
            }
        })
    }

    showDetail(record){
        const {key} = record;
        const data = this.props.data;
        const detail = data.filter(
            (item) => {
                return item.key == key;
            }
        )[0];
        this.setState({
            visible: true,
            detail: detail,
        })
        window.setTimeout(x => {
            const { setFieldsValue } = this.refs.detail.getFormValue;
            setFieldsValue(detail.info);
            console.log(detail.info);
        }, 0);
    }

    render(){

        return (
            <div>
                <Table columns={this.columns} dataSource={this.props.data} />
                <DetailModal
                    data={this.state.detail}
                    visible={this.state.visible}
                    editDetail={this.props.editDetail.bind(this)}
                    ref={'detail'}
                />
            </div>
        )
    }
}