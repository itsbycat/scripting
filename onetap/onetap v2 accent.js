// ByCat#7797

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

UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Accent");
UI.AddColorPicker(["Visuals", "Accent", "SHEET_MGR", "Accent"], "Accent color");

UI.AddCheckbox(["Visuals", "Accent", "SHEET_MGR", "Accent"], "Rainbow")
function rgb() {
	if(UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "Rainbow"]) == false) return;
	var accent_color = UI.GetColor(["Visuals", "Accent", "SHEET_MGR", "Accent", "Accent color"]);
	tickcount = Global.Tickcount();
	rainbow = HSVtoRGB(tickcount % 350 / 350, 1, 1, 1, 255);
	
	UI.SetColor(["Visuals", "Accent", "SHEET_MGR", "Accent", "Accent color"], [rainbow.r, rainbow.g, rainbow.b, accent_color[3]]);
}
Cheat.RegisterCallback("Draw", "rgb");

UI.AddCheckbox(["Visuals", "Accent", "SHEET_MGR", "Accent"], "Watermark")
function watermark() {
  if(UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "Watermark"]) == false) return;
  var watermark_font = Render.AddFont('Verdana', 10, 900);
  var screensize = Render.GetScreenSize();
  const ping = Math.floor(Global.Latency() * 1000 / 1.5);
  const fps = Math.floor( 1 / Global.Frametime() );
  var today = new Date();
  var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
  var tickrate = Global.Tickrate()
  var username = Cheat.GetUsername();
  var ip = World.GetServerString();
  var watermark_string = "onetap | " + username;
  var accent_watermark = UI.GetColor(["Visuals", "Accent", "SHEET_MGR", "Accent", "Accent color"]);

  if(ping == 0) {
	  watermark_string  += (" | " + datetime);
  }
  else {
		watermark_string += (" | " + ip + " | delay: " + ping + "ms | " + tickrate + "tick | " + datetime);
  }
  var string_size = Render.TextSize(watermark_string, watermark_font);
  Render.FilledRect(screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 23, [56, 60, 67, 255]);
  Render.GradientRect(screensize[0] * 0.99 - string_size[0], 7, string_size[0] + 10, 3, 1, accent_watermark, [accent_watermark[0] * 0.75, accent_watermark[1]*0.75, accent_watermark[2]*0.75, accent_watermark[3] * 0.75]);
  Render.String(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [255, 255, 255, 255], watermark_font);
}
Cheat.RegisterCallback("Draw", "watermark");

//Keybinds & Speclist

const keybinds_x = UI.AddSliderInt(["Visuals", "Accent", "SHEET_MGR", "Accent"], "keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt(["Visuals", "Accent", "SHEET_MGR", "Accent"], "keybinds_y", 0, Global.GetScreenSize()[1])

const speclist_x = UI.AddSliderInt(["Visuals", "Accent", "SHEET_MGR", "Accent"], "speclist_x", 0, Global.GetScreenSize()[0])
const speclist_y = UI.AddSliderInt(["Visuals", "Accent", "SHEET_MGR", "Accent"], "speclist_y", 0, Global.GetScreenSize()[1])

function xy()
{
  UI.SetEnabled(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_x"], 0)
  UI.SetEnabled(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_y"], 0)
}
xy();

function xy1()
{
  UI.SetEnabled(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_x"], 0)
  UI.SetEnabled(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_y"], 0)
}
xy1();

function in_bounds(vec, x, y, x2, y2)
{
   return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

UI.AddCheckbox(["Visuals", "Accent", "SHEET_MGR", "Accent"], "Keybinds")
function keybinds() {
  if(UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "Keybinds"]) == false) return;

  var accent_keybinds = UI.GetColor(["Visuals", "Accent", "SHEET_MGR", "Accent", "Accent color"]);

  const x = UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_x"]),
  y = UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_y"]);

  var keybinds_font = Render.AddFont('Verdana', 10, 900);

  if (Global.IsKeyPressed(1)) {
    const mouse_pos = Global.GetCursorPosition();
    if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {
     if (UI.IsMenuOpen( ) == false)
       return;
      UI.SetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_x"], mouse_pos[0] - 100);
      UI.SetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "keybinds_y"], mouse_pos[1] - 20);
    }
  }

  var h = [];
  if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])) {
    h.push("[" + UI.GetHotkeyState(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) + "] AA Direction inverter")
  }
  if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Force safe point"])) {
    h.push("[" + UI.GetHotkeyState(["Rage", "General", "General", "Key assignment", "Force safe point"]) + "] Force safe point")
  }
  if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Force body aim"])) {
    h.push("[" + UI.GetHotkeyState(["Rage", "General", "General", "Key assignment", "Force body aim"]) + "] Force body aim")
  }
  if (UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"])) {
    h.push("[" + UI.GetHotkeyState(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]) + "] Doubletap")
  }
  if (UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"])) {
    h.push("[" + UI.GetHotkeyState(["Rage", "Exploits", "Keys", "Key assignment", "Hide shots"]) + "] Hide shots")
  }
  if(UI.IsMenuOpen() == true) {
    Render.FilledRect(x, y, 200 + 10, 23, [56, 60, 67, 255]);
    Render.GradientRect(x, y - 1, 200 + 10, 3 , 1,  accent_keybinds, [accent_keybinds[0] * 0.75, accent_keybinds[1]*0.75, accent_keybinds[2]*0.75, accent_keybinds[3] * 0.75]);
    Render.String(x + 105, y + 5, 5, "Keybinds", [255, 255, 255, 255], keybinds_font);

    Render.FilledRect(x, y + 25, 210, 20 + 15 * (h.length - 1), [56, 60, 67, 255]);
    for (i = 0; i < h.length; i++) { Render.String(x + 10, y + 28 + 15 * i, 0, h[i], [255, 255, 255, 255], keybinds_font); /*Render.String(x + 150, y + 30 + 15 * i, 0, "[active]", [255, 255, 255, 255], 8);*/ }
  }
  else {
    if(h.length > 0) {
      Render.FilledRect(x, y, 200 + 10, 23, [56, 60, 67, 255]);
      Render.GradientRect(x, y - 1, 200 + 10, 3 , 1,  accent_keybinds, [accent_keybinds[0] * 0.75, accent_keybinds[1]*0.75, accent_keybinds[2]*0.75, accent_keybinds[3] * 0.75]);
      Render.String(x + 105, y + 5, 5, "Keybinds", [255, 255, 255, 255], keybinds_font);

      Render.FilledRect(x, y + 25, 210, 20 + 15 * (h.length - 1), [56, 60, 67, 255]);
      for (i = 0; i < h.length; i++) { Render.String(x + 10, y + 28 + 15 * i, 0, h[i], [255, 255, 255, 255], keybinds_font); /*Render.String(x + 150, y + 30 + 15 * i, 0, "[active]", [255, 255, 255, 255], 8);*/ }
    }
  }
}
Cheat.RegisterCallback("Draw", "keybinds");

function get_spectators()
{
    var specs = [];
    const players = Entity.GetPlayers();

    for (i = 0; i < players.length; i++)
    {
        const cur = players[i];

        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

UI.AddCheckbox(["Visuals", "Accent", "SHEET_MGR", "Accent"], "Speclist")
function speclist() {
  if(UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "Speclist"]) == false) return;

  const names = get_spectators();
  var accent_speclist = UI.GetColor(["Visuals", "Accent", "SHEET_MGR", "Accent", "Accent color"]);

  const x1 = UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_x"]),
  y1 = UI.GetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_y"]);

  var speclist_font = Render.AddFont('Verdana', 10, 900);

  if (Global.IsKeyPressed(1)) {
    const mouse_pos = Global.GetCursorPosition();
    if (in_bounds(mouse_pos, x1, y1, x1 + 200, y1 + 30)) {
     if (UI.IsMenuOpen( ) == false)
       return;
      UI.SetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_x"], mouse_pos[0] - 100);
      UI.SetValue(["Visuals", "Accent", "SHEET_MGR", "Accent", "speclist_y"], mouse_pos[1] - 20);
    }
  }

  if (UI.IsMenuOpen() == true) {
    Render.GradientRect(x1, y1, 200 + 10, 23, 1, [56, 60, 67, 255], [56, 60, 67, 255]);
    Render.GradientRect(x1, y1 - 1, 200 + 10, 3 , 1,  accent_speclist, [accent_speclist[0] * 0.75, accent_speclist[1]*0.75, accent_speclist[2]*0.75, accent_speclist[3] * 0.75]);
    Render.String(x1 + 105, y1 + 5, 5, "Spectators ("+names.length+")", [255, 255, 255, 255], speclist_font);

    Render.FilledRect(x1, y1 + 25, 210, 20 + 15 * (names.length - 1), [56, 60, 67, 255]);
    for (ii = 0; ii < names.length; ii++) {
    Render.String(x1 + 10, y1 + 28 + 15 * ii, 0, names[ii], [255, 255, 255, 255], speclist_font);
    }
  }
  if(names.length > 0) {
    Render.GradientRect(x1, y1, 200 + 10, 23, 1, [56, 60, 67, 255], [56, 60, 67, 255]);
    Render.GradientRect(x1, y1 - 1, 200 + 10, 3 , 1,  accent_speclist, [accent_speclist[0] * 0.75, accent_speclist[1]*0.75, accent_speclist[2]*0.75, accent_speclist[3] * 0.75]);
    Render.String(x1 + 105, y1 + 5, 5, "Spectators ("+names.length+")", [255, 255, 255, 255], speclist_font);

    Render.FilledRect(x1, y1 + 25, 210, 20 + 15 * (names.length - 1), [56, 60, 67, 255]);
    for (ii = 0; ii < names.length; ii++) {
    Render.String(x1 + 10, y1 + 28 + 15 * ii, 0, names[ii], [255, 255, 255, 255], speclist_font);
    }
  }
}
Cheat.RegisterCallback("Draw", "speclist");