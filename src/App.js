import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import Lifecycle from './lifecycle';

import FromValidation from './form-validation';
function App() {
  return (
    <div className="App">
      <FromValidation />
    </div>
  );
}

export default App;
