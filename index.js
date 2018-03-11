"use strict";

const pluginName = "plugin-node-handlebars-helpers";
const layouts = require("handlebars-layouts");
const helpers = require("handlebars-helpers");

function onPatternlabStart(patternlab) {
    const handlebars = patternlab.engines["handlebars"].engine;

    helpers({ handlebars: handlebars });
    layouts.register(handlebars);

    console.log("Plugin initialized: " + pluginName);
}

function pluginInit(patternlab) {
    if (!patternlab) {
        console.error("patternlab object not provided to plugin-init");
        process.exit(1);
    }

    if (!patternlab.plugins) {
        patternlab.plugins = [];
    }

    patternlab.plugins.push({
        "name": pluginName,
        "stylesheets": [],
        "javascripts": [],
        "onready": "",
        "callback": ""
    });

    if (!patternlab.config.plugins) {
        patternlab.config.plugins = {};
    }

    patternlab.events.on("patternlab-build-pattern-start", onPatternlabStart);
}

module.exports = pluginInit;