import ReplaceMenuProvider from 'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';
import { forEach } from 'min-dash';

ReplaceMenuProvider.prototype._createEntries = function (element, replaceOptions) {
    var menuEntries = [];

    var self = this;

    forEach(replaceOptions, function (definition) {
        if (definition.target &&
            definition.target.type !== 'bpmn:ComplexGateway' &&
            definition.target.type !== 'bpmn:EventBasedGateway') {
            var entry = self._createMenuEntry(definition, element);
            menuEntries.push(entry);
        }
    });

    return menuEntries;
};