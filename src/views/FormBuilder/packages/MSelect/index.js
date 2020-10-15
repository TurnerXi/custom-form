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
            placeholder: '请选择默认值',
            clearable: true,
            multiple: false,
            allowCreate: false,
            filterable: true,
            defaultFirstOption: true,
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

    const clearableConf = {
        field: 'clearable',
        fieldName: '是否可清除',
        cType: 'switch',
        config: {
            isRequire: false,
            defaultValue: true,
            options: [true, false]
        }
    }

    const multipleConf = {
        field: 'multiple',
        fieldName: '是否可多选',
        cType: 'switch',
        config: {
            isRequire: false,
            defaultValue: false,
            options: [true, false]
        },
        listeners: {
            change: (v, form) => {
                form.defaultValue = null;
                setTimeout(() => {
                    defaultValueConf.config.multiple = v;
                    if (v) {
                        form.defaultValue = [];
                    }
                }, 0);
            }
        }
    }

    const allowCreateConf = {
        field: 'allowCreate',
        fieldName: '是否可创建',
        cType: 'switch',
        config: {
            isRequire: false,
            defaultValue: false,
            options: [true, false]
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

    return [fieldConf, defaultValueConf, optionsConf,
        clearableConf, multipleConf, allowCreateConf, requireConf
    ];
}

const createDefaultConf = () => {
    return {
        field: '字段名称',
        defaultValue: '选项一',
        options: ['选项一', '选项二'],
        multiple: false,
        clearable: true,
        allowCreate: false,
        filterable: true,
        defaultFirstOption: true,
        isRequire: false,
    }
}


export default {
    component,
    createDefaultConf,
    createConfItems
};