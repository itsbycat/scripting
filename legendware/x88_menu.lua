-- ByCat#7797
-- Version 1.0.0

local font =  render.create_font("Verdana", 13, 600, true, false, true)

function x88()

    local x = 400
    local y = 15

    local username = globals.get_username()

    render.draw_text(font, 15, y + 30, color.new(255, 0, 255), "LegendWare" )

    render.draw_text(font, x+5, y - 15, color.new(255, 255, 0), "Hello user :)" )
    render.draw_text(font, x+5, y, color.new(255, 255, 0), "Welcome back " .. username .. " :)" )

    render.draw_text(font, x+5, y+25, color.new(255, 255, 255), "TriggerBot:")
    render.draw_text(font, x+5, y+35, color.new(255, 255, 255), "AA:")
    render.draw_text(font, x+5, y+45, color.new(255, 255, 255), "Edge Jump:")

    if (menu.get_key_bind_state(key_binds.legit_automatic_fire)) then

        render.draw_text(font, x+95, y+25, color.new(50, 205, 50), "On")

    else

        render.draw_text(font, x+95, y+25, color.new(255, 0, 0), "Off")

    end

    if (menu.get_key_bind_state(key_binds.flip_desync)) then

        render.draw_text(font, x+95, y+35, color.new(255, 255, 255), "Right")

    else

        render.draw_text(font, x+95, y+35, color.new(255, 255, 255), "Left")

    end

    if (menu.get_key_bind_state(key_binds.edge_jump)) then

        render.draw_text(font, x+95, y+45, color.new(50, 205, 50), "On")   

    else

        render.draw_text(font, x+95, y+45, color.new(255, 0, 0), "Off")

    end

end



client.add_callback("on_paint", x88)