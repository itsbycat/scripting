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

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function watermark() {
	var watermark_font = Render.AddFont("Verdana", 8, 250);
	var screensize = Render.GetScreenSize();
	
  watermark_color = HSVtoRGB(Global.Realtime() * 0.05, 1, 1);
  const ping = Math.floor(Global.Latency() * 1000 / 1.5);
  const fps = Math.floor( 1 / Global.Frametime() );
  var today = new Date();
  var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
  var tickrate = Global.Tickrate()
  var username = Cheat.GetUsername();
  var ip = World.GetServerString();
  var watermark_string = "onetap | " + username;

  if(ping == 0) {
	  watermark_string += (" | " + datetime);
  }
  else {
	  watermark_string += (" | " + ip + " | delay: " + ping + "ms | " + tickrate + "tick | " + datetime);
  }

  var string_size = Render.TextSizeCustom(watermark_string, watermark_font);
  if(UI.GetValue("Script items", "Rainbow") == true) {
    Render.FilledRect( screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 23, [watermark_color.r, watermark_color.g, watermark_color.b, 200] );

    var luminance = 0.241 * (watermark_color.r ^ 2) + 0.691 * (watermark_color.g ^ 2) + 0.068 * (watermark_color.b ^ 2);
    if(luminance >= 130) {
      Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [0, 0, 0, 255], watermark_font);
    }
    else {
      Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [255, 255, 255, 255], watermark_font);
    }
  }
  else {
    var accent_color = UI.GetColor( "Script items", "Accent color" );
    Render.FilledRect( screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 23, [accent_color[0], accent_color[1], accent_color[2], 200] );

    var luminance = 0.241 * (accent_color[0] ^ 2) + 0.691 * (accent_color[1] ^ 2) + 0.068 * (accent_color[2] ^ 2);
    if(luminance >= 130) {
      Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [0, 0, 0, 255], watermark_font);
    }
    else {
      Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 13, 0, watermark_string, [255, 255, 255, 255], watermark_font);
    }
  }
}
Cheat.RegisterCallback("Draw", "watermark");

UI.AddLabel("aimsense.ga/forums | ByCat#7797");
UI.AddCheckbox("Rainbow");
UI.AddColorPicker("Accent color");