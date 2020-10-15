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
        cType: 'inputlist',
        config: {
            isRequire: true,
            placeholder: '请输入默认值',
        }
    };

    const requireConf = {
        field: 'isRequire',
        fieldName: '是否必填',
        cType: 'switch',
        config: {
            defaultValue: false,
            options: [true, false]
        }
    }

    return [fieldConf, defaultValueConf, requireConf];
}

const createDefaultConf = () => {
    return {
        field: '字段名称',
        defaultValue: [''],
        isRequire: false
    }
}


export default {
    component,
    createDefaultConf,
    createConfItems
};