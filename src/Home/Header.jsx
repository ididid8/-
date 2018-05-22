import React from 'react'
import {Row, Col, Select, Input, Button, Table, Tooltip, Form, Modal} from 'antd'
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item

const ID = [
    '全部',
    '主任',
    '老师',
    '学生',
    '实习',
];

const SORT = [
    '身份',
    '年龄升',
    '年龄降',
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
            }
        )
        let demo = this.getFormValue;
        demo.validateFields((err, values) => {
            if(!err){
                this.props.addStaffItem(values);
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

export default class Header extends React.Component{

    state = {
        visible: false,
    };

    onInputChange(input){
        this.props.searchStaff(input);
    }
    onIdChange(id){
        this.props.filtStaff(id);
    }
    onSortChange(sort){
        this.props.sortStaff(sort);
    }

    showModal(){
        this.setState({
            visible: true,
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                visible: false
            }
        )
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Search placeholder={"Search..."} style={{width: '60%'}} onSearch={this.onInputChange.bind(this)}/>
                    </Col>
                    <Col span={7}>
                        <label>人员筛选：</label>
                        <Select style={{width: '60%'}} onChange={this.onIdChange.bind(this)} defaultValue={'全部'}>
                            {
                                ID.map((value, key) => {
                                        return <Option value={key} key={key}>{value}</Option>;
                                    }
                                )
                            }
                        </Select>
                    </Col>
                    <Col span={7}>
                        <label>排序方式：</label>
                        <Select style={{width: '60%'}} onChange={this.onSortChange.bind(this)} defaultValue={'身份'}>
                            {
                                SORT.map((value, key) => {
                                    return <Option value={key} key={key}>{value}</Option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Button onClick={this.showModal.bind(this)}>添加</Button>
                    </Col>
                </Row>
                <DetailModal
                    visible={this.state.visible}
                    addStaffItem={this.props.addStaffItem.bind(this)}
                    ref={'detail'}
                />
            </div>
        )
    }
}