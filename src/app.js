import './css/common.css';
import Layer from './components/layer/layer.js';


const App = function () {
    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.ejs({
        name: 'Shawn',
        arr: ['apple', 'xiaomi', 'huawei', 'oppo']
    });
    //console.log(layer);
};

new App();