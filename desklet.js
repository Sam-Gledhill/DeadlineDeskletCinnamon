const Desklet = imports.ui.desklet;
const GLib = imports.gi.GLib;
const St = imports.gi.St;
const MainLoop = imports.mainloop;
const Lang = imports.lang;
const Util = imports.misc.util;
const Settings = imports.ui.settings

let greenEmoji = "🟩";
let redEmoji = "🟥";
let purpleEmoji = "🟪";

function DeadlineBar(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}

DeadlineBar.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function (metadata, desklet_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);

        this.initialiseSettings(desklet_id);

        this.setupUI();

        this.refreshUI();

        this._updateTimeLoop()
    },

    initialiseSettings: function (desklet_id) {

        //Settings defined in settings-schema.json
        //BindingDirection.IN means code cannot affect config
        //Binds settings defined in config to instance variables with the same name
        this.settings = new Settings.DeskletSettings(this, this.metadata["uuid"], desklet_id);
        this.settings.bindProperty(Settings.BindingDirection.IN, "numberOfSegments", "numberOfSegments", this.refreshUI);
        this.settings.bindProperty(Settings.BindingDirection.IN, "startDate", "startDate", this.refreshUI);
        this.settings.bindProperty(Settings.BindingDirection.IN, "endDate", "endDate", this.refreshUI);
    },

    refreshUI: function () {

        this.segmentNewLine = this.segmentNewLine;

        const startDate = new Date(this.startDate);
        this.START_TIME = startDate.getTime();

        const endDate = new Date(this.endDate);
        this.END_TIME = endDate.getTime()

        this.MAX_INTERVALS = this.numberOfSegments;
        this.SECONDS_PER_INTERVAL = (this.END_TIME - this.START_TIME) / this.MAX_INTERVALS;

        this.MAX_INTERVALS = this.numberOfSegments
        this.SECONDS_PER_INTERVAL = (this.END_TIME - this.START_TIME) / this.MAX_INTERVALS;
    },

    setupUI: function () {
        // main container for the desklet
        this.window = new St.Bin();
        this.text = new St.Label();
        this.window.add_actor(this.text);
        this.setContent(this.window);

        this.configFile = GLib.get_home_dir() + "/.local/share/cinnamon/desklets/DeadlineBar@SG/metadata.json";

        this._menu.addAction(_("Edit Metadata"), Lang.bind(this, function () {
            Util.spawnCommandLine("xdg-open " + this.configFile);
        }));

    },

    on_desklet_removed: function () {
        MainLoop.source_remove(this.timeout)
    },

    _updateTimeLoop: function () {
        let _text = this._timeToEmoji();

        this.text.set_text(_text);
        this.timeout = MainLoop.timeout_add_seconds(1, Lang.bind(this, this._updateTimeLoop));
    },

    _timeToEmoji: function () {

        const d = new Date();
        let nGreens = Math.floor((d.getTime() - this.START_TIME) / this.SECONDS_PER_INTERVAL);

        if (nGreens >= this.MAX_INTERVALS) {
            return purpleEmoji.repeat(this.MAX_INTERVALS);
        }

        if (nGreens < 0) {
            nGreens = 0;
        }

        let nReds = this.MAX_INTERVALS - nGreens;
        return greenEmoji.repeat(nGreens) + redEmoji.repeat(nReds);

    }

};

// Is this run in a loop?
function main(metadata, desklet_id) {
    return new DeadlineBar(metadata, desklet_id);
}