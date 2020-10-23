// import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import { is } from 'bpmn-js/lib/util/ModelUtil';


export default function (group, element, translate) {

    // Only return an entry, if the currently selected
    // element is a start event.
    if (is(element, 'bpmn:UserTask')) {
        // group.entries.push(entryFactory.selectBox(translate, {
        //     id: 'isStartableInTasklist',
        //     label: translate('assignee'),
        //     modelProperty: 'assignee',
        //     selectOptions: function () {
        //         return require('~/views/WorkFlow2/person.json');
        //     }
        // }));
        group.entries.push({
            id: 'Assignee',
            label: translate('assignee'),
            modelProperty: 'assignee',
            html: '<div>abc</div>'
            // selectOptions: function () {
            //     return require('~/views/WorkFlow2/person.json');
            // }
        });
    }
}