import React from 'react';

import DemoList from '../component/demoList.jsx';
import DemoProducts from '../component/demoProducts.jsx';

import '../../styles/demo.css';

export class Demo extends React.Component{
    
  render(){
      return (
          <div className="container">
              <h1>Demo Context Read</h1>
              <DemoList />
              <h1>Demo Context Write</h1>
              <DemoProducts />
          </div>
      );
  }
}

