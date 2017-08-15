import './layer.less';
import ejs from './layer.ejs'

function layer() {
    return {
        name: 'layer',
        ejs: ejs
    }
}

export default layer;