-- ByCat#7797

menu.add_slider_int("X", 0, engine.get_screen_width())
menu.add_slider_int("Y", 0, engine.get_screen_height())
menu.add_color_picker("Color")
local font = render.create_font("Verdana", 12, 500, true, true, false)

function keybinds()
    local offset = 1
    local x, y, d = menu.get_int("X"), menu.get_int("Y"), 0
    local color = color.new(35, 35, 35, 150);
    local accent = menu.get_color("Color")

    if(menu.get_key_bind_state(key_binds.legit_automatic_fire)) then
        local autofire = 1
        --render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Auto-fire")
        offset = offset + 1
    else
        local autofire = 0
    end
    if(menu.get_key_bind_state(key_binds.double_tap)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Double-Tap")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.body_aim)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Body Aim")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.damage_override)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "MinDmg Override")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.hide_shots)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "HideShots")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.flip_desync)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Flip Desync")
        offset = offset + 1
    end
    --if(menu.get_key_bind_state(key_binds.thirdperson)) then
    --    render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "ThirdPerson")
    --    offset = offset + 1
    --end
    if(menu.get_key_bind_state(key_binds.automatic_peek)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "AutoPeek")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.edge_jump)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Edge Jump")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.fakeduck)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Fakeduck")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.slowwalk)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Slowwalk")
        offset = offset + 1
    end
    if(menu.get_key_bind_state(key_binds.teleport_exploit)) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Teleport Exploit")
        offset = offset + 1
    end

    render.draw_rect_filled(x, y, 170, 18, color.new(35, 35, 35, 150))
    render.draw_rect_filled(x, y, 170, 15*offset, color.new(35, 35, 35, 150))
    render.draw_rect_filled(x, y, 170, 2, accent)
    render.draw_rect(x, y, 170, 15*offset, color)
    render.draw_rect(x, y, 170, 18, color)
    render.draw_text(font, x+60, y+3 , color.new(255, 255, 255), "keybinds")

    if(autofire == 1) then
        render.draw_text(font, x+5, y+5 + 15*offset, color.new(255, 255, 255), "Auto-fire")
    end
end
client.add_callback("on_paint", keybinds)