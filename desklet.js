const Desklet = imports.ui.desklet;
const GLib = imports.gi.GLib;
const St = imports.gi.St;
const MainLoop = imports.mainloop;
const Lang = imports.lang;
const Util = imports.misc.util;

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

        const startDate = new Date(metadata["startDate"]);
        this.START_TIME = startDate.getTime();

        const endDate = new Date(metadata["endDate"]);
        this.END_TIME = endDate.getTime()

        this.MAX_INTERVALS = metadata["numberOfSegments"];
        this.SECONDS_PER_INTERVAL = (this.END_TIME - this.START_TIME) / this.MAX_INTERVALS;

        this.setupUI();

        this._updateTimeLoop()
    },

    setupUI: function () {
        // main container for the desklet
        this.window = new St.Bin();
        this.text = new St.Label();
        this.window.add_actor(this.text);
        this.setContent(this.window);

        this.configFile = GLib.get_home_dir() + "/.local/share/cinnamon/desklets/DeadlineBar@SG/metadata.json";

        this._menu.addAction(_("Edit Config"), Lang.bind(this, function () {
            Util.spawnCommandLine("xdg-open " + this.configFile);
        }));


    },

    _updateTimeLoop: function () {
        this.text.set_text(this._timeToEmoji())
        this.timeout = MainLoop.timeout_add_seconds(1, Lang.bind(this, this._updateTimeLoop));
    },

    _timeToEmoji: function () {

        const d = new Date();
        let nGreens = Math.floor((d.getTime() - this.START_TIME) / this.SECONDS_PER_INTERVAL);

        if (nGreens >= this.MAX_INTERVALS) {
            return purpleEmoji.repeat(this.MAX_INTERVALS);
        }

        let nReds = this.MAX_INTERVALS - nGreens;
        return greenEmoji.repeat(nGreens) + redEmoji.repeat(nReds);

    },

    on_desklet_removed: function () {
        MainLoop.source_remove(this.timeout)
    }

};

// Is this run in a loop?
function main(metadata, desklet_id) {
    return new DeadlineBar(metadata, desklet_id);
}