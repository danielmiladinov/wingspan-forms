/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ControlCommon, ImmutableOptimizations) {
    'use strict';


    var KendoDateTime = React.createClass({
        mixins: [ImmutableOptimizations],

        fieldClass: 'formFieldDatetimepicker',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                format: 'MM/dd/yyyy h:mm tt'
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.props.value ? kendo.toString(this.props.value, this.props.format) : ''}</span>)
                : (<input id={this.props.id} type="text" />));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            console.assert(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            console.assert($el);

            $el.kendoDateTimePicker({
                change: this.onChange,
                format: this.props.format
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            console.assert(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            console.assert($el);

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();
            this.props.onChange(val);
        }
    });

    return KendoDateTime;
});
