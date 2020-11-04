/*
*       ____         _____      _          __
*      |  _ \       / ____|    | |        / _|
*      | |_) |_   _| |     __ _| |_   ___| |_
*      |  _ <| | | | |    / _` | __| / __|  _|
*      | |_) | |_| | |___| (_| | |_ | (__| |
*      |____/ \__, |\_____\__,_|\__(_)___|_|
*             __/ |
*            |___/
*
*/

// ByCat#7797

const hitgroup = ['Head', 'Neck', 'Pelvis', 'Body', 'Thorax', 'Chest', 'Upper chest', 'Left thigh', 'Right thigh', 'Left calf', 'Right calf', 'Left foot', 'Right foot', 'Left hand', 'Right hand', 'Left upper arm', 'Left forearm', 'Right upper arm', 'Right forearm'];

const activeLogs = [];

const ragebotTarget = {};

function getMultiColorTextSize(lines) {
    var w = 5;
    for (var x = 0; x < lines.length; x++) {
        w += Render.TextSize(lines[x][1], 7)[0];
    }
    return w;
}

function drawMultiColorText(x, y, lines) {
    var x_pad = 0;
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];
        const text = line[1];
        var color = line[0];
        if (typeof line[0] == "number") {
            color = [7, 142, 180, 255];
        }
        Render.String(x + x_pad, y, 0, text, color, 8);
        const w = Render.TextSize(text, 8)[0];
        x_pad += w;
    }
}

function showLog(count, layer) {
    const text = layer.text;
    const w = getMultiColorTextSize(text);
    const expiry = Global.Realtime() < layer.delay;
    const y = 45 + (35 * (count - 1.20));
    const h = 12;
    const logW = (w < 150) ? 150 : (w + 15);
    const speed = 3;
    const layerSize = 8;

    layer.firstLayer = expiry ? Math.min(layer.firstLayer + logW * 0.025, logW + layerSize) : Math.max(layer.firstLayer - speed, 0);
    layer.secondLayer = expiry ? Math.min(layer.secondLayer + logW * 0.015, logW) : Math.max(layer.secondLayer - 2 * speed, 0);
    var color = [7, 142, 180, 255];
    Render.FilledRect(layer.firstLayer - layer.firstLayer, y, layer.firstLayer, h + 17, color);
    Render.FilledRect(layer.secondLayer - layer.secondLayer, y, layer.secondLayer, h + 17, [7, 20, 37, 255]);

    drawMultiColorText(layer.secondLayer - logW + 5, y + 3 + 6, text);
    activeLogs[count] = layer;
    if (layer.secondLayer === 0) {
        activeLogs.splice(count, 1);
    }
}

function onDraw() {
    for (var x = 0; x < activeLogs.length; x++) {
        showLog(x, activeLogs[x]);
    }
}

function onRagebotFire() {
    ragebotTarget[Entity.GetName(Event.GetInt("target_index"))] = {
        hitgroup: hitgroup[Event.GetInt("hitbox")],
        hc: Event.GetInt("hitchance"),
        safepoint: Event.GetInt("safepoint"),
        exploit: Event.GetInt("exploit")
    }
}

function onPlayerHurt() {
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    const victim = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const victimName = Entity.GetName(victim);
    if (attacker === Entity.GetLocalPlayer() && victim !== Entity.GetLocalPlayer()) {
        const target = ragebotTarget[victimName];
        if (target != null) {
            const hitMessage = [
                [[255, 255, 255, 255], "Hit "],
                [0, victimName.substring(0, 28)],
                [[255, 255, 255, 255], " in the "],
                [0, target.hitgroup],
                [[255, 255, 255, 255], " for "],
                [0, Event.GetInt("dmg_health").toString()],
                [[255, 255, 255, 255], " damage ("],
                [0, Event.GetInt("health") + " health remaining"],
                [[255, 255, 255, 255], ")"]
            ];
            activeLogs.push({
                    text: hitMessage,
                    delay: Global.Realtime() + 5,
                    firstLayer: 0,
                    secondLayer: 0
                }
            );

            Cheat.PrintColor( [7, 142, 180, 255], "Hit " + victimName + " in the " + target.hitgroup + " for " + Event.GetInt("dmg_health").toString() + " damage (" + Event.GetInt("health") + " health remaining)" + " \n" );
        }
    }
}

Global.RegisterCallback("Draw", "onDraw");
Global.RegisterCallback("ragebot_fire", "onRagebotFire");
Global.RegisterCallback("player_hurt", "onPlayerHurt");