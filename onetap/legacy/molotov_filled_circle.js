// ByCat#7797

function radians_to_degrees( radians ) { return radians * ( 180 / Math.PI ); }

// https://www.onetap.com/threads/release-shitty-circular-molotov-esp.13186/
function get_circle( x, y, z, radius, accuracy ) {
    first = true;
    old_screen_pos = Render.WorldToScreen( [ x, y, z ] );
    for ( t = 0.000; t <= Math.PI * 2.1; t += accuracy ) {
        if ( first ) {
            world_pos = [ ( radius * Math.cos( -t ) + x ), ( radius * Math.sin(-t) + y), z];
            old_screen_pos = Render.WorldToScreen( world_pos );
            first = false;
        }
        world_pos = [(radius * Math.cos(t) + x), (radius * Math.sin(t) + y), z];
        screen_pos = Render.WorldToScreen( world_pos );
        old_screen_pos = screen_pos;
    }
}

// https://www.onetap.com/threads/for-devs-drawing-3d-circle.29486
function draw_circle_3d(x, y, z, radius, degrees, start_at, clr, filled, fill_clr) {
    var accuracy = 10;
    var old_x, old_y;
    start_at = start_at+1
    for (rot=start_at; rot < degrees+start_at+1; rot+=accuracy) {
        rot_r = rot*(Math.PI/180)
        line_x = radius * Math.cos(rot_r) + x, line_y = radius * Math.sin(rot_r) + y
        var curr = Render.WorldToScreen([line_x, line_y, z]), cur = Render.WorldToScreen([x, y, z]);
        if (cur[0] != null && curr[0] != null && old_x != null) {
            if (filled) Render.Polygon([ [curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]] ], fill_clr)
            Render.Line(curr[0], curr[1], old_x, old_y, clr)
        }
        old_x = curr[0], old_y = curr[1];
    }
}

function render() {
    entities = Entity.GetEntities();
    for ( i = 0; i < entities.length; i++ ) {
        world_pos = Entity.GetRenderOrigin( entities[i] );
        name = Entity.GetClassName( entities[i] );
        screen_pos = Render.WorldToScreen( world_pos );
        color1 = UI.GetColor("Script items", "Fire Radius Color (Filled)")
        color2 = UI.GetColor("Script items", "Fire Radius Color (Outline)")

        if ( name != "CInferno" )
            continue;
        get_circle( world_pos[0], world_pos[1], world_pos[2], 180, 0.150);
        draw_circle_3d(world_pos[0] - 178, world_pos[1] - 30, world_pos[2], 180, 360, 0.150, color1, true, color2)
    }
}
Global.RegisterCallback("Draw", "render");
UI.AddColorPicker("Fire Radius Color (Filled)")
UI.AddColorPicker("Fire Radius Color (Outline)")