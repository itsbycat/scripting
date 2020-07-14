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

const speclist_x = UI.AddSliderInt("speclist_x", 0, Global.GetScreenSize()[0])
 const speclist_y = UI.AddSliderInt("speclist_y", 0, Global.GetScreenSize()[1])

 function in_bounds(vec, x, y, x2, y2)
{
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

 function xy()
 {
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "speclist_x", false)
     UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "speclist_y", false)
 }
 xy();
 
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

function spectators()
 {
     const names = get_spectators();

     const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "speclist_x"),
           y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "speclist_y");

     const rainbow = [
         Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
         Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
         Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
         255
     ];

     Render.FilledRect(x, y, 200, 23, [0, 0, 0, 255]);
     Render.String(x + 5, y + 5, 0, "Spectators ("+names.length+")", [255, 255, 255, 255], 8);
     Render.Line(x, y + 20, x + 200, y + 20, [114, 124, 174, 255]);
     Render.FilledRect(x, y + 22, 200, 20 + 15 * (names.length - 1), [10, 9, 10, 255]);

     for (i = 0; i < names.length; i++)
     {
         Render.String(x + 5, y + 27 + 15 * i, 0, names[i], [255, 255, 255, 255], 8);
     }

     if (Global.IsKeyPressed(1)) {
         const mouse_pos = Global.GetCursorPosition();
         if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {
          if (UI.IsMenuOpen( ) == false)
            return;
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "speclist_x", mouse_pos[0] - 100);
             UI.SetValue("Misc", "JAVASCRIPT", "Script items", "speclist_y", mouse_pos[1] - 20);
         }
     }

 }

Global.RegisterCallback("Draw", "spectators");