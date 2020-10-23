import CompMap from '../components/map';
import ElementComponentMap from '../const/ElementComponentMap';

export const getComponentByEleType = type => {
    return CompMap[ElementComponentMap[type]];
}

export const getShape = (modeler, id) => {
    const registry = modeler.get('elementRegistry');
    return registry.get(id);
}