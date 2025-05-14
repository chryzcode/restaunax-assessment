import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OrderDetail from './components/OrderDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/orders/:id" component={OrderDetail} />
      </Switch>
    </Router>
  );
}

export default App;
