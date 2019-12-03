"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var fs_1 = require("fs");
function nUnitTime(time) {
    return time.toISOString().split(".")[0].replace("T", " ") + "Z";
}
;
var TestRun = (function () {
    function TestRun() {
        this.id = "2";
        this.testcasecount = 0;
        this.result = "Passed";
        this.total = 0;
        this.passed = 0;
        this.failed = 0;
        this.inconclusive = 0;
        this.skipped = 0;
        this.asserts = 0;
        this["engine-version"] = "3.6.1.0";
        this["clr-version"] = "4.X";
        this["start-time"] = nUnitTime(new Date());
        this["end-time"] = nUnitTime(new Date());
        this.duration = 0;
        this.suites = [];
    }
    TestRun.prototype.props = function () {
        return [
            "id",
            "testcasecount",
            "result",
            "total",
            "passed",
            "failed",
            "inconclusive",
            "skipped",
            "asserts",
            "engine-version",
            "clr-version",
            "start-time",
            "end-time",
            "duration"
        ];
    };
    ;
    ;
    TestRun.prototype.toString = function () {
        var _this = this;
        var COMMANDLINE = "<command-line><![CDATA[npx intern]]></command-line>";
        var outer = "<test-run ";
        outer += this.props().map(function (propertyName) {
            return propertyName + "=\"" + _this[propertyName] + "\"";
        }).join(" ");
        outer += ">";
        outer += COMMANDLINE;
        outer += this.suites.map(function (suite) {
            return suite.toString();
        }).join("");
        outer += "</test-run>";
        return outer;
    };
    ;
    return TestRun;
}());
;
var Settings = (function () {
    function Settings() {
    }
    Settings.prototype.toString = function () {
        var outer = "<settings>";
        outer += "</settings>";
        return outer;
    };
    return Settings;
}());
var TestCase = (function () {
    function TestCase(testCase) {
        var time = new Date();
        var endTime = nUnitTime(time);
        time.setMilliseconds(time.getMilliseconds() - testCase.timeElapsed || 0);
        var startTime = nUnitTime(time);
        this.id = "0-0";
        this.name = testCase.name;
        this.fullname = testCase.name;
        this.classname = "unspecified";
        this.runstate = "unspecified";
        this.seed = "null";
        this.result = "" + (testCase.error ? "Failed" : "Passed");
        this.label = "" + (testCase.error ? testCase.error : "unspecified");
        this.site = "Test";
        this["start-time"] = startTime;
        ;
        this["end-time"] = endTime;
        this.duration = (testCase.timeElapsed || 0) / 1000;
        this.asserts = 1;
    }
    ;
    TestCase.prototype.properties = function () {
        return [
            "id",
            "name",
            "fullname",
            "methodname",
            "classname",
            "runstate",
            "seed",
            "result",
            "label",
            "site",
            "start-time",
            "end-time",
            "duration",
            "asserts"
        ];
    };
    ;
    TestCase.prototype.toString = function () {
        var _this = this;
        var outer = "<test-case ";
        outer += this.properties().map(function (propertyName) {
            return propertyName + "=\"" + _this[propertyName] + "\"";
        }).join(" ");
        outer += "/>";
        return outer;
    };
    ;
    return TestCase;
}());
var Environment = (function () {
    function Environment() {
        this["framework-version"] = "3.5.0.0";
        this["clr-version"] = "2.0.50727.8784";
        this["os-version"] = "Microsoft Windows NT 10.0.15063.0";
        this.platform = "Win32NT";
        this.cwd = process.cwd();
        this["machine-name"] = os_1.hostname();
        this.user = os_1.userInfo().username;
        this["user-domain"] = this.user;
        this.culture = "en-GB";
        this.uiculture = "en-US";
        this["os-architecture"] = os_1.arch();
    }
    ;
    Environment.prototype.props = function () {
        return [
            "framework-version",
            "clr-version",
            "cwd",
            "machine-name",
            "user",
            "user-domain",
            "culture",
            "uiculture",
            "os-architecture"
        ];
    };
    Environment.prototype.toString = function () {
        var _this = this;
        var outer = "<environment ";
        outer += this.props().map(function (propertyName) {
            if (_this[propertyName]) {
                return propertyName + "=\"" + _this[propertyName] + "\"";
            }
            else {
                return "";
            }
        }).join(" ");
        outer += "/>";
        return outer;
    };
    ;
    return Environment;
}());
;
var TestSuite = (function () {
    function TestSuite(suite) {
        var time = new Date();
        var endTime = nUnitTime(time);
        time.setMilliseconds(time.getMilliseconds() - suite.timeElapsed || 0);
        var startTime = nUnitTime(time);
        this.type = "Assembly";
        this.id = suite.id;
        this.name = suite.name;
        this.fullname = suite.name;
        this.classname = suite.name;
        this.testcasecount = suite.numTests;
        this.runstate = "" + (suite.skipped ? "Skipped" : "Runnable");
        this.result = "" + (suite.numFailedTests == 0 ? "Passed" : "Failed");
        this.label = "unspecified";
        this.site = "unspecified";
        this["start-time"] = startTime;
        this["end-time"] = endTime;
        this.duration = (suite.timeElapsed || 0) / 1000;
        this.total = suite.numTests;
        this.passed = suite.numPassedTests;
        this.failed = suite.numFailedTests;
        this.inconclusive = suite.tests.length - this.failed - this.passed - this.skipped;
        this.skipped = suite.numSkippedTests;
        this.asserts = suite.numTests;
        if (suite.tests[0].constructor.name === "Suite") {
            this["test-suites"] = suite.tests.map(function (suite, index) {
                var newTestSuite = new TestSuite(suite);
                newTestSuite.id = "0-" + (index + 1);
                return newTestSuite;
            });
        }
        else if (suite.tests[0].constructor.name === "Test") {
            this["test-cases"] = suite.tests.map(function (testCase, index) {
                var newTestCase = new TestCase(testCase);
                newTestCase.id = "0-" + (index + 1);
                return newTestCase;
            });
        }
        this.environment = new Environment();
        this.settings = new Settings();
        this.properties = null;
        this.reason = null;
        this.failure = null;
        this.output = null;
        this.attachments = null;
    }
    ;
    TestSuite.prototype.inners = function () {
        return [
            "test-cases",
            "test-suites",
            "environment",
            "settings"
        ];
    };
    ;
    TestSuite.prototype.props = function () {
        return [
            "type",
            "id",
            "name",
            "fullname",
            "classname",
            "testcasecount",
            "runstate",
            "result",
            "label",
            "site",
            "start-time",
            "end-time",
            "duration",
            "total",
            "passed",
            "failed",
            "inconclusive",
            "skipped",
            "asserts"
        ];
    };
    ;
    TestSuite.prototype.toString = function () {
        var _this = this;
        var outer = "<test-suite ";
        outer += this.props().map(function (propertyName) {
            if (_this[propertyName]) {
                return propertyName + "=\"" + _this[propertyName] + "\"";
            }
            else {
                return "";
            }
        }).join(" ");
        outer += ">";
        var inner = "";
        inner += this.inners().map(function (propertyName) {
            if (_this[propertyName] && _this[propertyName].length) {
                return _this[propertyName].map(function (val) {
                    return val.toString();
                }).join("");
            }
            else if (_this[propertyName]) {
                return _this[propertyName].toString();
            }
            else {
                return;
            }
        }).join("");
        outer += inner;
        outer += "</test-suite>";
        return outer;
    };
    ;
    return TestSuite;
}());
;
var HEADER = "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\"?>";
intern.on("runStart", function () {
    _this.testRun = new TestRun();
    _this.start = new Date().getMilliseconds();
});
intern.on("runEnd", function () {
    _this.testRun["end-time"] = nUnitTime(new Date());
    _this.testRun.duration = Math.abs(_this.start - new Date().getMilliseconds());
    fs_1.writeFile("nunit3.xml", HEADER + _this.testRun.toString(), function (error) {
        if (error) {
            throw error;
        }
        console.log("nunit3.xml saved");
    });
});
intern.on("testEnd", function (test) {
    _this.testRun.testcasecount += 1;
    _this.testRun.total += 1;
    if (test.error) {
        _this.testRun.result = "Failed";
        _this.testRun.failed += 1;
    }
    else if (test.skipped) {
        _this.testRun.skipped += 1;
    }
    else {
        _this.testRun.passed += 1;
    }
});
intern.on("suiteEnd", function (suite) {
    if (suite.name == "node") {
        return;
    }
    _this.testRun.suites.push(new TestSuite(suite));
});
//# sourceMappingURL=nunit3.js.map