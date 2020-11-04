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
function onGround(index)
{
    return Entity.GetProp(index, "CBasePlayer", "m_fFlags") & 1;
}

function watermark() {
	var watermark_font = Render.AddFont("Verdana", 8, 250);
  var screensize = Render.GetScreenSize();
  const ping = Math.floor(Global.Latency() * 1000 / 1.5);
  const fps = Math.floor( 1 / Global.Frametime() );
  var today = new Date();
  var datetime = today.getHours() + ":" + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());
  var tickrate = Global.Tickrate()
  var username = Cheat.GetUsername();
  var ip = World.GetServerString();
  var lp = Entity.GetLocalPlayer();
  var velocity = Math.round(getVelocity(lp));
  var velstr = velocity.toString();
	var watermark_string = "Onetap | " + username;

  if(ping == 0) {
		watermark_string += (" | " + datetime);
  }
  else {
		watermark_string += (" | fps: " + fps + " | ping: " + ping + " | speed: " + velstr + " | time: " + datetime);
  }

	var string_size = Render.TextSizeCustom(watermark_string, watermark_font);
  Render.FilledRect(screensize[0] * 0.99 - string_size[0] - 2, 6, string_size[0] + 14, 19, [33, 33, 33, 100]);
	Render.FilledRect(screensize[0] * 0.99 - string_size[0], 8, string_size[0] + 10, 15, [33, 33, 33, 255]);
	Render.StringCustom(screensize[0] * 0.99 - string_size[0] + 5, 8, 0, watermark_string, [255, 255, 255, 255], watermark_font);
}
Cheat.RegisterCallback("Draw", "watermark");