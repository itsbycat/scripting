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
// Version 1.0.0

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

var get = {
    state(state) {
        return UI.GetValue("Misc", "JAVASCRIPT", "Script items", state);
    },
    string(string) {
        return UI.GetString("Misc", "JAVASCRIPT", "Script items", string);
    }
}

var dTime, dDelay, dFillbar, dShotsfired;
function dt()
{
    iShotsFired = Event.GetInt("userid"); iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);
 
    if(Entity.GetLocalPlayer() == iShotsFired_index)
    {
        if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled"))
        {
            if(dShotsfired == 0)
            {
                dTime = Globals.Curtime();
                dDelay = dTime+0.3;
                dFillbar = 0;
            }
        }
    }
}

function getVelocity(index)
{
    players = Entity.GetPlayers();
    for (i=0; i < players.length; i++); 
    {
    var velocity = Entity.GetProp( index, "CBasePlayer", "m_vecVelocity[0]" );
    var speed = Math.sqrt( velocity[0] * velocity[0] + velocity[1] * velocity[1] );
    } 
    return speed;
}

function weaponType() {
    var local = Entity.GetLocalPlayer();
    var weapon = Entity.GetName(Entity.GetWeapon(local));
    var weapons = {
        "usp s": "PISTOL",
        "glock 18": "PISTOL",
        "p2000": "PISTOL",
        "dual berettas": "PISTOL",
        "r8 revolver": "PISTOL",
        "desert eagle": "PISTOL",
        "p250": "PISTOL",
        "tec 9": "PISTOL",
        "five seven": "PISTOL",
        "mp9": "SMG",
        "mac 10": "SMG",
        "ump 45": "SMG",
        "ak 47": "RIFLE",
        "sg 553": "RIFLE",
        "aug": "RIFLE",
        "m4a1 s": "RIFLE",
        "m4a4": "RIFLE",
        "galil": "RIFLE",
        "ssg 08": "SNIPER",
        "awp": "SNIPER",
        "g3sg1": "SNIPER",
        "scar 20": "SNIPER",
        "nova": "GENERAL",
        "xm1014": "GENERAL",
        "mag 7": "GENERAL",
        "m249": "GENERAL",
        "negev": "GENERAL"
    };
    
    if (weapons[weapon] == undefined)
        return "";
    return weapons[weapon];
}

function hcType() {
    var local = Entity.GetLocalPlayer();
    var weapon = Entity.GetName(Entity.GetWeapon(local));
    var weapons = {
        "usp s": "PISTOL",
        "glock 18": "PISTOL",
        "p2000": "PISTOL",
        "dual berettas": "PISTOL",
        "r8 revolver": "HEAVY PISTOL",
        "desert eagle": "HEAVY PISTOL",
        "p250": "PISTOL",
        "tec 9": "PISTOL",
        "five seven": "PISTOL",
        "mp9": "GENERAL",
        "mac 10": "GENERAL",
        "ump 45": "GENERAL",
        "ak 47": "GENERAL",
        "sg 553": "GENERAL",
        "aug": "GENERAL",
        "m4a1 s": "GENERAL",
        "m4a4": "GENERAL",
        "galil": "GENERAL",
        "ssg 08": "SCOUT",
        "awp": "AWP",
        "g3sg1": "AUTOSNIPER",
        "scar 20": "AUTOSNIPER",
        "nova": "GENERAL",
        "xm1014": "GENERAL",
        "mag 7": "GENERAL",
        "m249": "GENERAL",
        "negev": "GENERAL"
    };
    
    if (weapons[weapon] == undefined)
        return "";
    return weapons[weapon];
}

const x = UI.AddSliderInt("Indicator - X", 0, Global.GetScreenSize()[0])
const y = UI.AddSliderInt("Indicator - Y", 0, Global.GetScreenSize()[1])

function indicator(){
        const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Indicator - X");
        const y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Indicator - Y");
        var h = [];

        var fakeyaw, realyaw, diffrence, r, g, b;

        fakeyaw = (Local.GetFakeYaw());
        realyaw = (Local.GetRealYaw());  
        diffrence =  Math.round(realyaw - fakeyaw)
        desyncAmt = Math.abs(diffrence)

        if (desyncAmt <= 29)
        {
            r = 255
            g = 0
            b = 0
        }
        else if (desyncAmt >= 45)
        {
            r = 132
            g = 195
            b = 16
        }
        else 
        {
            r = 255 - (desyncAmt * 3)
            g = desyncAmt * 3
            b = 0
        }
        var color1, color2, color3;
        var lp = Entity.GetLocalPlayer();

        var velocity = Math.round(getVelocity(lp)).toString();
        if (Input.IsKeyPressed(0x20) & velocity > 250) {
            if(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "LBY") == true) {
                h.push("0");
            }
        }

        var rgb = HSVtoRGB(Global.Tickcount() % 350 / 350, 1, 1, 1, 255);
        if(get.string("Name") == "") {
            //
        }
        else {
            h.push("99");
        }
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "FOV") == true) {
            h.push("97");
        }
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "HC") == true) {
            h.push("96");
        }
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Legit&Rage AA R/L") == true) {
            h.push("4");
        }
        if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Enabled") == true) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fake") == true)
            {
                h.push("1");
            }
        }
        if (UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled") == true) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fake") == true)
            {
                h.push("2");
            }
        }
        if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Triggerbot") == true)
            {
                h.push("3");
            }
        }
        if (UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled") == true) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Lag") == true)
            {
                h.push("5");
            }
        }
        if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Double Tap"))
            {
                h.push("6");
            }
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Slow") == true)
            {
                h.push("7");
            }
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fake Duck") == true)
            {
                h.push("8");
            }
        }
        if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Auto Peek") == true)
            {
                h.push("9");
            }
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safe Point") == true)
            {
                h.push("10");
            }
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Invert") == true)
            {
                h.push("11");
            }
        }
        
        // https://www.onetap.com/threads/hitbox-override.20676/
        if (UI.IsHotkeyActive("Script items", "Hitbox Override Key")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Hitbox Override") == true)
            {
                h.push("12");
            }
        }
        
        // https://www.onetap.com/threads/mindmg-override-on-key.20570/
        if (UI.IsHotkeyActive("Script items", "Heavy Pistol Override") & UI.IsHotkeyActive("Script items", "Scout Override") & UI.IsHotkeyActive("Script items", "AWP Override") & UI.IsHotkeyActive("Script items", "Auto Override")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Damage Override") == true)
            {
                h.push("13");
            }
        }
       
        if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
            if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Hide Shots") == true)
            {
                h.push("14");
            }
        }
       
        var distance = 25;
        for (index = 0; index < h.length; ++index) {
            if(h[index] == 0) {
                if (velocity > 295)
                {
                    var color1 = 132
                    var color2 = 195
                    var color3 = 16
                }
                else
                {
                    var color1 = 255
                    var color2 = 0
                    var color3 = 0
                }

                Render.String( x, y - 83 - (index * distance), 0, "LBY", [0, 0, 0, 255] , 4);
                Render.String( x + 1, y - 83 - (index * distance), 0, "LBY", [ color1, color2, color3, 255 ] , 4);
            }
            if(h[index] == 1)
                {
                    color = Math.abs( Local.GetRealYaw( ) - Local.GetFakeYaw( ) );
                    if( !Entity.GetLocalPlayer( ) || !Entity.IsAlive( Entity.GetLocalPlayer( ) ) || !Entity.IsValid( Entity.GetLocalPlayer( ) ) )
                        return;
                    Render.String( x, y - 83 - (index * distance), 0, "FAKE", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "FAKE", [ color * 255 / 58, 255 - ( color * 255 / 58 ), 0, 255 ] , 4);
                }
            if(h[index] == 2)
                {
                    if( !Entity.GetLocalPlayer( ) || !Entity.IsAlive( Entity.GetLocalPlayer( ) ) || !Entity.IsValid( Entity.GetLocalPlayer( ) ) )
                        return;

                    Render.String( x, y - 83 - (index * distance), 0, "AA", [ 0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "AA", [ 255, 255, 255, 255 ] , 4);

                    Render.FilledRect(3, y - 54 - (index * distance), 42, 5, [ 0, 0, 0, 150 ]);
                    if(UI.IsHotkeyActive("Anti-Aim", "Legit Anti-Aim", "Direction key")) {
                        Render.FilledRect(4, y - 53 - (index * distance), 20, 3, [ 30, 150, 255, 150 ]);
                    }
                    else {
                        Render.FilledRect(4 + 20, y - 53 - (index * distance), 20, 3, [ 30, 150, 255, 150 ]);
                    }
                }
            if(h[index] == 3)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "TRIGGER", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "TRIGGER", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 4)
                {
                    if(UI.GetValue("Rage", "GENERAL", "Enabled") == true) {
                        if(UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
                            Render.String( x, y - 83 - (index * distance), 0, "LEFT", [0, 0, 0, 255] , 4);
                            Render.String( x + 1, y - 83 - (index * distance), 0, "LEFT", [255, 255, 255, 255] , 4);
                        }
                        else {
                            Render.String( x, y - 83 - (index * distance), 0, "RIGHT", [0, 0, 0, 255] , 4);
                            Render.String( x + 1, y - 83 - (index * distance), 0, "RIGHT", [255, 255, 255, 255] , 4);
                        }
                    }
                    else {
                        if(UI.IsHotkeyActive("Anti-Aim", "Legit Anti-Aim", "Direction key")) {
                            Render.String( x, y - 83 - (index * distance), 0, "LEFT", [0, 0, 0, 255] , 4);
                            Render.String( x + 1, y - 83 - (index * distance), 0, "LEFT", [255, 255, 255, 255] , 4);
                        }
                        else {
                            Render.String( x, y - 83 - (index * distance), 0, "RIGHT", [0, 0, 0, 255] , 4);
                            Render.String( x + 1, y - 83 - (index * distance), 0, "RIGHT", [255, 255, 255, 255] , 4);
                        }
                    }
                }
            if(h[index] == 5)
                {
                    curtime = Globals.Curtime();
                    Render.String( x, y - 83 - (index * distance), 0, "LAG", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "LAG", [ curtime * 255 / 58, 255 - ( curtime * 255 / 58 ), 0, 255 ] , 4);
                }
            if(h[index] == 6)
                {
                    curtime = Globals.Curtime();
                    if (curtime <= dDelay) {
                        Render.String( x, y - 83 - (index * distance), 0, "DT", [0, 0, 0, 255] , 4);
                        Render.String( x + 1, y - 83 - (index * distance), 0, "DT", [ curtime * 255 / 58, 255 - ( curtime * 255 / 58 ), 0, 255 ] , 4);
                      
                        dFillbar+=3;
                        dShotsfired = 1;
                     
                        if(dFillbar >= 65) dFillbar = 65;
                        Render.FilledRect(3, y - 54 - (index * distance), 67, 5, [ 0, 0, 0, 150 ]);
                        Render.FilledRect(4, y - 53 - (index * distance), dFillbar, 3, [ 30, 150, 255, 150 ]);
                    }
                    else {
                        Render.String( x, y - 83 - (index * distance), 0, "DT", [0, 0, 0, 255] , 4);
                        Render.String( x + 1, y - 83 - (index * distance), 0, "DT", [30, 150, 255, 255] , 4);
                        dShotsfired = 0;
                    }
                }
            if(h[index] == 7)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "SLOW", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "SLOW", [ 0, 252, 231, 255 ] , 4);
                }
            if(h[index] == 8)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "DUCK", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "DUCK", [255, 255, 255, 255] , 4);
                }
            if(h[index] == 9)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "AUTOPEEK", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "AUTOPEEK", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 11)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "INVERT", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "INVERT", [255, 255, 255, 255] , 4);
                }
            if(h[index] == 10)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "SAFE", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "SAFE", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 12)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "HITBOX", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "HITBOX", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 13)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "DMG", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "DMG", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 14)
                {
                    Render.String( x, y - 83 - (index * distance), 0, "HS", [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "HS", [124, 195, 13, 255] , 4);
                }
            if(h[index] == 99)
                {
                    if(get.string("Name") == "") {
                        //
                    }
                else {
                        Render.String( x, y - 83 - (index * distance), 0, get.string("Name"), [0, 0, 0, 255] , 4);
                        Render.String( x + 1, y - 83 - (index * distance), 0, get.string("Name"), [rgb.r, rgb.g, rgb.b, 255] , 4);
                    }
                }
            if(h[index] == 97)
                {
                    weaponT = weaponType();
                    fov = UI.GetValue("Legit", weaponT, "Fov");
                    
                    Render.String( x, y - 83 - (index * distance), 0, "FOV: " + fov, [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "FOV: " + fov, [124, 195, 13, 255] , 4);
                }
            if(h[index] == 96)
                {
                    weaponT = hcType();
                    if(weaponT == "") {
                        hc = "0";
                    }
                    else {
                        hc = UI.GetValue("Rage", weaponT, "Accuracy", "Hitchance");
                    }
                    
                    Render.String( x, y - 83 - (index * distance), 0, "HC: " + hc, [0, 0, 0, 255] , 4);
                    Render.String( x + 1, y - 83 - (index * distance), 0, "HC: " + hc, [124, 195, 13, 255] , 4);
                }
        }
}

Global.PrintColor([186, 235, 52, 255], "\n\n[ByCat] Indicator Loaded! \n bycat.cf \n\n\n");
Global.RegisterCallback("Draw", "indicator");
Global.RegisterCallback("weapon_fire", "dt");
UI.AddSliderInt("ByCat - Indicator", -1, -1);
UI.AddCheckbox("LBY");
UI.AddTextbox("Name");
UI.AddCheckbox("Fake");
UI.AddCheckbox("Triggerbot");
UI.AddCheckbox("Lag");
UI.AddCheckbox("Legit&Rage AA R/L");
UI.AddCheckbox("Double Tap");
UI.AddCheckbox("Slow");
UI.AddCheckbox("Fake Duck");
UI.AddCheckbox("Auto Peek");
UI.AddCheckbox("Invert");
UI.AddCheckbox("Safe Point");
UI.AddCheckbox("Hitbox Override");
UI.AddCheckbox("Damage Override");
UI.AddCheckbox("Hide Shots");
UI.AddCheckbox("FOV");
UI.AddCheckbox("HC");