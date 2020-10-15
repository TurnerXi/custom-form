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
        cType: 'input',
        config: {
            isRequire: false,
            placeholder: '请输入默认值'
        }
    };

    const placeholderConf = {
        field: 'placeholder',
        fieldName: '占位文本',
        cType: 'input',
        config: {
            isRequire: false,
            placeholder: '请输入占位文本'
        }
    }

    const requireConf = {
        field: 'isRequire',
        fieldName: '是否必填',
        cType: 'switch',
        config: {
            defaultValue: false,
            options: [true, false]
        }
    }

    return [fieldConf, defaultValueConf, placeholderConf, requireConf];
}

const createDefaultConf = () => {
    return {
        field: '字段名称',
        defaultValue: '',
        placeholder: '请输入内容',
        isRequire: false
    }
}


export default {
    component,
    createDefaultConf,
    createConfItems
};