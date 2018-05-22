import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import SiderDemo from './Home/myIndex';//引入自己写的组件(class)
import App from './Home/Manager'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
