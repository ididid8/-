import React,{Component} from 'react';
import 'antd/dist/antd.css';
import Header from './Header'
import ItemPanel from './ItemPanel'
import Staff from './STAFF'

class App extends Component{

    constructor(){
        super();
        this.state = {
            staff: new Staff,
        };

    }

    //增
    addStaffItem(item){
        this.setState({
            staff: this.state.staff.addStaffItem(item)
        });
    }
    //删
    removeStaffItem(key){
        this.setState({
            staff: this.state.staff.removeStaffItem(key)
        });
    }

    /*
     *详情
     */
    //打开
    detailStaffItem(key){
        this.setState({
            staffDetail: this.state.staff.staff.filter(item => {
                return item.key==key;
            })[0]
        });
    }
    //关闭
    closeDetail(){
        this.setState({
            staffDetail: null
        });
    }
    //编辑
    editDetail(item){
        console.log(item);
        debugger;
        this.setState({
            staff : this.state.staff.editStaffItem(item)
        });
    }

    /*
     * 排序
     */
    sortStaff(sortType) {
        this.setState({
            staff: this.state.staff.sortStaff(sortType)
        });
    }

    /*
     * 筛选
     */
    filtStaff(filtType) {
        this.setState({
            staff: this.state.staff.filtStaff(filtType)
        });
    }

    /*
     * 搜索
     */
    searchStaff(word) {
        this.setState({
            staff: this.state.staff.searchStaff(word)
        });
    }

    render(){
        return (
            <div style={{marginTop: 50, marginLeft: 100, marginRight: 100, }}>
                <h1 style={{textAlign: 'center'}}>人员管理系统</h1>
                <br/>
                <Header sortStaff={this.sortStaff.bind(this)} filtStaff={this.filtStaff.bind(this)} searchStaff={this.searchStaff.bind(this)} addStaffItem={this.addStaffItem.bind(this)}/>
                <br/>
                <ItemPanel data={this.state.staff.staff} editDetail={this.editDetail.bind(this)} removeStaffItem={this.removeStaffItem.bind(this)}/>
            </div>
        )
    }
}

export default App;