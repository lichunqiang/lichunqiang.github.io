define("app/index-debug", [ "./util-debug", "./faker-debug" ], function(require, exports, module) {
    var util = require("./util-debug");
    var faker = require("./faker-debug");
    var page = {};
    page.init = function() {
        console.log("this is init function");
    };
    page.name = "light";
    function selfCall() {
        console.log("self called");
    }
    page.say = util.say;
    page.getName = faker.getName;
    page.selfCall = selfCall;
    // selfCall();
    window.fuck = module.exports = page;
});

define("app/util-debug", [], function(require, exports, module) {
    module.exports = {
        say: function() {
            console.log("say");
        }
    };
});

define("app/faker-debug", [], function(require, exports, module) {
    function Faker() {
        this.name = "faker";
    }
    Faker.prototype.getName = function() {
        return this.name;
    };
    module.exports = new Faker();
});
