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

UI.AddLabel("aimsense.ga/forums | ByCat#7797");

function watermark() {
	var watermark_font = Render.AddFont("Verdana", 8, 250);
	var screensize = Render.GetScreenSize();
	
	const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        200
    ];
        
    const ping = Math.floor(Global.Latency() * 1000 / 1.5);
    const fps = Math.floor( 1 / Global.Frametime() );
    var today = new Date();
    var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
    var tickrate = Global.Tickrate()
    var username = Cheat.GetUsername();
    var ip = World.GetServerString();
	var watermark_string = "onetap | " + username; // aimsense better xD

    if(ping == 0) {
		watermark_string += (" | " + datetime);
    }
    else {
		watermark_string += (" | " + ip + " | delay: " + ping + "ms | " + tickrate + "tick | " + datetime);
    }
	var string_size = Render.TextSizeCustom(watermark_string, watermark_font);
    Render.GradientRect(screensize[0] * 0.99 - string_size[0] - 1, 7, string_size[0] + 12, 25, 1, rainbow, rainbow);
	Render.GradientRect(screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 23, 1, [33, 33, 33, 100], [33, 33, 33, 255]);
	Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [255, 255, 255, 255], watermark_font);
}
Cheat.RegisterCallback("Draw", "watermark");

// Keybinds

const keybinds_x = UI.AddSliderInt("keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt("keybinds_y", 0, Global.GetScreenSize()[1])

function xy()
{
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_x", false)
  UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_y", false)
}
xy();

function in_bounds(vec, x, y, x2, y2)
{
   return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

UI.AddCheckbox("Keybinds");
function keybinds() {
  if(UI.GetValue("Script items", "Keybinds") == false) return;

  var accent_keybinds = [255,255,255,255];

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
  if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
    h.push("[Auto peek]")
  }
  if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
    h.push("[Anti-Aim invert]")
  }
  if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
    h.push("[Force safe point]")
  }
  if (UI.IsHotkeyActive("Rage", "GENERAL", "Force body aim")) {
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

  const rainbow = [
    Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
    Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
    Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
    200
];

  Render.GradientRect(x - 1, y - 1, 212, 25 , 1,  rainbow, rainbow);
  Render.GradientRect(x, y, 210, 23, 1, [33, 33, 33, 100], [33, 33, 33, 255]);
  Render.StringCustom(x + 105, y + 5, 5, "Keybinds", [255, 255, 255, 255], keybinds_font);

  Render.FilledRect(x, y + 25, 210, 20 + 15 * (h.length - 1), [33, 33, 33, 150]);
  for (i = 0; i < h.length; i++) { Render.String(x + 5, y + 30 + 15 * i, 0, h[i], [255, 255, 255, 255], 8); Render.String(x + 160, y + 30 + 15 * i, 0, "[active]", [255, 255, 255, 255], 8); }
}
Cheat.RegisterCallback("Draw", "keybinds");

// Speclist
UI.AddCheckbox("Speclist (Top Right)");
var observators = [];

function getObservators(){
    if(UI.GetValue("Script items", "Speclist (Top Right)") == false) return;

	var ents = Entity.GetPlayers();
	var local = Entity.GetLocalPlayer();
	var localtarget = Entity.GetProp(local,"DT_BasePlayer","m_hObserverTarget");
	if(!local)return;
	observators = [];
	for(i = 0; i < ents.length;i++){
		if(Entity.IsAlive(local)){
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == local)observators.push(Entity.GetName(ents[i]));
		}
		else{
			if(!ents[i] || Entity.IsAlive(ents[i]))continue;
			var observer = Entity.GetProp(ents[i],"DT_BasePlayer","m_hObserverTarget");
			if(!observer || observer == "m_hObserverTarget")continue;
			if(observer == localtarget)observators.push(Entity.GetName(ents[i]));
		}
	}
}

function drawObservators(){
    if(UI.GetValue("Script items", "Speclist (Top Right)") == false) return;

	var screen = Render.GetScreenSize();
	var font = Render.AddFont("Verdana",8,100);
	for(i = 0; i < observators.length; i++){
		var name = observators[i];
		var size = Render.TextSizeCustom(name,font);
		Render.StringCustom(screen[0]-size[0]-5,(i*20)+35,0,name,[255,255,255,255],font);
	}
	
}

function resetObservators(){
    if(UI.GetValue("Script items", "Speclist (Top Right)") == false) return;

	observators = [];
}

Global.RegisterCallback("Draw","getObservators");
Global.RegisterCallback("Draw","drawObservators");
Global.RegisterCallback("round_start","resetObservators");
Global.RegisterCallback("round_end","resetObservators");
