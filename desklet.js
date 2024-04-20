const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const MainLoop = imports.mainloop
const Lang = imports.lang

let green = "🟩";
let red = "🟥";
let purple = "🟪";

function HelloDesklet(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}

HelloDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function (metadata, desklet_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);

        const startDate = new Date("April 20, 2024 19:10:00");
        this.START_TIME = startDate.getTime();

        const endDate = new Date("April 20, 2024 19:11:00");
        this.END_TIME = endDate.getTime()
        this.MAX_INTERVALS = 10;
        this.SECONDS_PER_INTERVAL = (this.END_TIME - this.START_TIME) / this.MAX_INTERVALS;

        this.setupUI();

        this._updateTimeLoop()
    },

    setupUI: function () {
        // main container for the desklet
        this.window = new St.Bin();
        this.text = new St.Label();
        this.text.set_text("Hello!");

        const DateObj = new Date();

        let current_time = "" + DateObj.getTime();


        this.text.set_text(current_time);

        this.window.add_actor(this.text);
        this.setContent(this.window);

    },

    _updateTimeLoop: function () {
        this.text.set_text(this._timeToEmoji())
        this.timeout = MainLoop.timeout_add_seconds(1, Lang.bind(this, this._updateTimeLoop));
    },

    _timeToEmoji: function () {

        const d = new Date();
        let nGreens = Math.floor((d.getTime() - this.START_TIME) / this.SECONDS_PER_INTERVAL);

        if (nGreens >= this.MAX_INTERVALS) {
            return purple.repeat(this.MAX_INTERVALS);
        }

        let nReds = this.MAX_INTERVALS - nGreens;
        return green.repeat(nGreens) + red.repeat(nReds);

    }

};

// Is this run in a loop?
function main(metadata, desklet_id) {
    return new HelloDesklet(metadata, desklet_id);
}