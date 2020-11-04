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

UI.AddColorPicker("[AIMSENSE] accent color");
UI.AddLabel("aimsense.ga/forums | ByCat#7797");

UI.AddCheckbox("Rainbow");
function rgb() {
	if(UI.GetValue("Script items", "Rainbow") == false) return;
	var accent_color = UI.GetColor("Script items", "[AIMSENSE] accent color");
	const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        255
    ];
	
	UI.SetColor("Script items", "[AIMSENSE] accent color", rainbow);
}
Cheat.RegisterCallback("Draw", "rgb");

UI.AddCheckbox("Watermark");
function watermark() {
	if(UI.GetValue("Script items", "Watermark") == false) return;
	var watermark_font = Render.AddFont("Verdana", 8, 250);
	var screensize = Render.GetScreenSize();
	const ping = Math.floor(Global.Latency() * 1000 / 1.5);
  const fps = Math.floor( 1 / Global.Frametime() );
  var today = new Date();
  var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
  var tickrate = Global.Tickrate()
  var username = Cheat.GetUsername();
  var ip = World.GetServerString();
	var watermark_string = "onetap | " + username;
	var accent_watermark = UI.GetColor("Script items", "[AIMSENSE] accent color");

  if(ping == 0) {
	  watermark_string  += (" | " + datetime);
  }
  else {
		watermark_string += (" | " + ip + " | delay: " + ping + "ms | " + tickrate + "tick | " + datetime);
  }
	var string_size = Render.TextSizeCustom(watermark_string, watermark_font);
  Render.FilledRect(screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 23, [56, 60, 67, 255]);
	Render.GradientRect(screensize[0] * 0.99 - string_size[0], 7, string_size[0] + 10, 3, 1, accent_watermark, [accent_watermark[0] * 0.75, accent_watermark[1]*0.75, accent_watermark[2]*0.75, accent_watermark[3] * 0.75]);
	Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [255, 255, 255, 255], watermark_font);
}
Cheat.RegisterCallback("Draw", "watermark");

//Keybinds & Speclist

const keybinds_x = UI.AddSliderInt("keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt("keybinds_y", 0, Global.GetScreenSize()[1])

const speclist_x = UI.AddSliderInt("speclist_x", 0, Global.GetScreenSize()[0])
const speclist_y = UI.AddSliderInt("speclist_y", 0, Global.GetScreenSize()[1])

function xy()
{
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_x", false)
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_y", false)
}
xy();

function xy1()
{
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "speclist_x", false)
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "speclist_y", false)
}
xy1();

function in_bounds(vec, x, y, x2, y2)
{
   return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

UI.AddCheckbox("Keybinds");
function keybinds() {
  if(UI.GetValue("Script items", "Keybinds") == false) return;

  var accent_keybinds = UI.GetColor("Script items", "[AIMSENSE] accent color");

  const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x"),
  y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y");

  var keybinds_font = Render.AddFont("Verdana", 8, 250);

  if (Global.IsKeyPressed(1)) {
    const mouse_pos = Global.GetCursorPosition();
    if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {
     if (UI.IsMenuOpen( ) == false)
       return;
      UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x", mouse_pos[0] - 100);
      UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y", mouse_pos[1] - 20);
    }
  }

  var h = [];

  if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
    h.push("[Slow walk]")
  }
  if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
    h.push("[Fake Duck]")
  }
  if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
    h.push("[Auto peek]")
  }
  if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
    h.push("[Anti-Aim invert]")
  }
  if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {
    h.push("[Force safe point]")
  }
  if (UI.IsHotkeyActive("Rage", "General", "Force body aim")) {
    h.push("[Force body aim]")
  }
  if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
    h.push("[Doubletap]")
  }
  if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
    h.push("[Hide shots]")
  }
  if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
    h.push("[Triggerbot]")
  }
  if(UI.IsMenuOpen() == true) {
    Render.FilledRect(x, y, 200 + 10, 23, [56, 60, 67, 255]);
    Render.GradientRect(x, y - 1, 200 + 10, 3 , 1,  accent_keybinds, [accent_keybinds[0] * 0.75, accent_keybinds[1]*0.75, accent_keybinds[2]*0.75, accent_keybinds[3] * 0.75]);
    Render.StringCustom(x + 105, y + 5, 5, "Keybinds", [255, 255, 255, 255], keybinds_font);

    Render.FilledRect(x, y + 25, 210, 20 + 15 * (h.length - 1), [56, 60, 67, 255]);
    for (i = 0; i < h.length; i++) { Render.String(x + 10, y + 30 + 15 * i, 0, h[i], [255, 255, 255, 255], 8); Render.String(x + 150, y + 30 + 15 * i, 0, "[active]", [255, 255, 255, 255], 8); }
  }
  else {
    if(h.length > 0) {
      Render.FilledRect(x, y, 200 + 10, 23, [56, 60, 67, 255]);
      Render.GradientRect(x, y - 1, 200 + 10, 3 , 1,  accent_keybinds, [accent_keybinds[0] * 0.75, accent_keybinds[1]*0.75, accent_keybinds[2]*0.75, accent_keybinds[3] * 0.75]);
      Render.StringCustom(x + 105, y + 5, 5, "Keybinds", [255, 255, 255, 255], keybinds_font);

      Render.FilledRect(x, y + 25, 210, 20 + 15 * (h.length - 1), [56, 60, 67, 255]);
      for (i = 0; i < h.length; i++) { Render.String(x + 10, y + 30 + 15 * i, 0, h[i], [255, 255, 255, 255], 8); Render.String(x + 150, y + 30 + 15 * i, 0, "[active]", [255, 255, 255, 255], 8); }
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

UI.AddCheckbox("Speclist");
function speclist() {
  if(UI.GetValue("Script items", "Speclist") == false) return;

  const names = get_spectators();
  var accent_speclist = UI.GetColor("Script items", "[AIMSENSE] accent color");

  const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "speclist_x"),
  y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "speclist_y");

  var speclist_font = Render.AddFont("Verdana", 8, 250);

  if (Global.IsKeyPressed(1)) {
    const mouse_pos = Global.GetCursorPosition();
    if (in_bounds(mouse_pos, x1, y1, x1 + 200, y1 + 30)) {
     if (UI.IsMenuOpen( ) == false)
       return;
      UI.SetValue("Misc", "JAVASCRIPT", "Script items", "speclist_x", mouse_pos[0] - 100);
      UI.SetValue("Misc", "JAVASCRIPT", "Script items", "speclist_y", mouse_pos[1] - 20);
    }
  }

  if (UI.IsMenuOpen() == true) {
    Render.GradientRect(x1, y1, 200 + 10, 23, 1, [56, 60, 67, 255], [56, 60, 67, 255]);
    Render.GradientRect(x1, y1 - 1, 200 + 10, 3 , 1,  accent_speclist, [accent_speclist[0] * 0.75, accent_speclist[1]*0.75, accent_speclist[2]*0.75, accent_speclist[3] * 0.75]);
    Render.StringCustom(x1 + 105, y1 + 5, 5, "Spectators ("+names.length+")", [255, 255, 255, 255], speclist_font);

    Render.FilledRect(x1, y1 + 25, 210, 20 + 15 * (names.length - 1), [56, 60, 67, 255]);
    for (ii = 0; ii < names.length; ii++) {
    Render.String(x1 + 10, y1 + 30 + 15 * ii, 0, names[ii], [255, 255, 255, 255], 8);
    }
  }
  if(names.length > 0) {
    Render.GradientRect(x1, y1, 200 + 10, 23, 1, [56, 60, 67, 255], [56, 60, 67, 255]);
    Render.GradientRect(x1, y1 - 1, 200 + 10, 3 , 1,  accent_speclist, [accent_speclist[0] * 0.75, accent_speclist[1]*0.75, accent_speclist[2]*0.75, accent_speclist[3] * 0.75]);
    Render.StringCustom(x1 + 105, y1 + 5, 5, "Spectators ("+names.length+")", [255, 255, 255, 255], speclist_font);

    Render.FilledRect(x1, y1 + 25, 210, 20 + 15 * (names.length - 1), [56, 60, 67, 255]);
    for (ii = 0; ii < names.length; ii++) {
    Render.String(x1 + 10, y1 + 30 + 15 * ii, 0, names[ii], [255, 255, 255, 255], 8);
    }
  }
}
Cheat.RegisterCallback("Draw", "speclist");