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
            placeholder: '请输入默认值',
            options: []
        }
    };

    const optionsConf = {
        field: 'options',
        fieldName: '选项列表',
        cType: 'inputlist',
        config: {
            isRequire: true,
            placeholder: '请输入选项列表'
        },
        listeners: {
            change: (v) => {
                defaultValueConf.config.options = v;
            }
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

    return [fieldConf, defaultValueConf, optionsConf, requireConf];
}

const createDefaultConf = () => {
    return {
        field: '字段名称',
        defaultValue: '选项一',
        options: ['选项一', '选项二'],
        isRequire: false
    }
}


export default {
    component,
    createDefaultConf,
    createConfItems
};