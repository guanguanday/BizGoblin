'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

var _goblinBase = require('goblin-base');

var _goblinBase2 = _interopRequireDefault(_goblinBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};

function firstLowerCase(str) {
    return str.replace(/^\S/, function (s) {
        return s.toLowerCase();
    });
}
function retain(obj, attr) {
    var newObj = Object.create(null);
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            var arrAttr = Array.isArray(attr) ? attr : [attr];
            if (arrAttr.indexOf(item) >= 0) {
                newObj[item] = obj[item];
            }
        }
    }
    return newObj;
}
function isOwnEmpty(obj) {
    for (var name_1 in obj) {
        if (obj.hasOwnProperty(name_1)) {
            return false;
        }
    }
    return true;
}
var Chart = function (_super) {
    __extends(Chart, _super);
    function Chart(props) {
        var _this = _super.call(this, props) || this;
        _this.windowWidth = 0;
        _this.config = {};
        _this.centralizedUpdates = function (unit) {
            var config = _this.config;
            var props = unit.props;
            var displayName = unit.displayName;
            _this.combineContentConfig(displayName, props, config);
        };
        _this.portalRef = function (el) {
            if (!_this.el) {
                _this.el = el;
            }
        };
        return _this;
    }
    Chart.prototype.getChildContext = function () {
        return {
            centralizedUpdates: this.centralizedUpdates
        };
    };
    Chart.prototype.createChartInstance = function (config) {
        if (this.chart) {
            this.chart.destroy();
        }
        this.combineChartConfig(this.props, config);
        this.combineDataConfig(this.props, config);
        this.combineAnimateConfig(this.props, config);
        config.chart.el = this.el;
        this.chart = (0, _goblinBase2.default)(config);
    };
    Chart.prototype.repaintChartInstance = function (config) {
        this.combineChartConfig(this.props, config);
        this.combineDataConfig(this.props, config);
        this.combineAnimateConfig(this.props, config);
        if (this.chart) {
            this.chart.repaint(config);
        } else {
            config.chart.el = this.el;
            this.chart = (0, _goblinBase2.default)(config);
        }
    };
    Chart.prototype.clearConfigData = function () {
        this.config = {};
    };
    Chart.prototype.combineChartConfig = function (props, config) {
        var chartRetain = ['height', 'width', 'padding', 'pixelRatio'];
        config.chart = retain(props, chartRetain);
    };
    Chart.prototype.combineDataConfig = function (props, config) {
        if (props.data) {
            config.data = props.data;
        }
        if (props.defs) {
            config.defs = props.defs;
        }
    };
    Chart.prototype.combineAnimateConfig = function (props, config) {
        if (props.animate) {
            config.animate = props.animate;
        }
    };
    Chart.prototype.combineContentConfig = function (displayName, props, config) {
        var realName = firstLowerCase(displayName);
        var nameLowerCase = displayName.toLowerCase();
        var regSeries = ['line', 'area', 'bar', 'interval', 'point', 'schema'];
        if (regSeries.indexOf(realName) < 0 && isOwnEmpty(props)) {
            config[nameLowerCase] = true;
        } else if (regSeries.indexOf(realName) >= 0) {
            if (!config.series) {
                config.series = [];
            }
            config.series.push(__assign({ geom: realName }, props));
        } else if (nameLowerCase === 'axis') {
            if (!config.axis) {
                config.axis = [];
            }
            config.axis.push(props);
        } else if (nameLowerCase === 'series') {
            if (!config.series) {
                config.series = [];
            }
            config.series.push(props);
        } else if (nameLowerCase === 'guide') {
            if (!config.guide) {
                config.guide = [];
            }
            config.guide.push(props);
        } else {
            config[nameLowerCase] = props;
        }
        return config;
    };
    Chart.prototype.componentDidMount = function () {
        this.windowWidth = window.innerWidth;
        this.createChartInstance(this.config);
        this.clearConfigData();
    };
    Chart.prototype.componentDidUpdate = function (prevProps) {
        this.repaintChartInstance(this.config);
        this.clearConfigData();
    };
    Chart.prototype.componentWillReceiveProps = function (nextProps) {};
    Chart.prototype.componentWillUnmount = function () {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        this.el = null;
    };
    Chart.prototype.render = function () {
        return React.createElement("canvas", { ref: this.portalRef }, this.props.children);
    };
    Chart.childContextTypes = {
        centralizedUpdates: PropTypes.func
    };
    return Chart;
}(React.Component);
exports.default = Chart;
//# sourceMappingURL=Chart.js.map