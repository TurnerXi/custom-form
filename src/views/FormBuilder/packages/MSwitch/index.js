import component from './main';

const createConfItems = () => {
    const fieldConf = {
        field: 'field',
        fieldName: '字段名称',
        cType: 'input',
        config: {
            isRequire: true,
            placeholder: '请输入字段名称'
        }
    }

    const defaultValueConf = {
        field: 'defaultValue',
        fieldName: '默认值',
        cType: 'select',
        config: {
            isRequire: false,
            options: ['是', '否']
        }
    };

    return [fieldConf, defaultValueConf];
}

const createDefaultConf = () => {
    return {
        field: '字段名称',
        defaultValue: '否',
        options: ['是', '否']
    }
}


export default {
    component,
    createDefaultConf,
    createConfItems
};