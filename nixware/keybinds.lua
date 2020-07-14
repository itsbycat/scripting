-- ByCat#7797

local font_verdana = surface.setup_font("Verdana", 13, 500, 0, 1, 0x200)
local screensize = engine.get_screen_size()

local m_iHealth = se.get_netvar("DT_BasePlayer", "m_iHealth")

ui.add_slider_int("position X", "kb_position_x", 0, screensize.x, 111)
ui.add_slider_int("position Y", "kb_position_y", 0, screensize.y, 383)

local types = {
    [0] = "always",
    [1] = "hold",
    [2] = "toggle",
    [3] = "force off",
    [4] = "legit"
}

local count = 0

local function add_bind(label, bind_name, bind_type, x, y)
    if ui.get_bind_state(bind_name) then
        surface.draw_set_text_pos(x + 5, y + 22 + (15 * count))
        surface.draw_print_text(" [" ..  types[bind_type] .. "] " .. label)

        count = count + 1
    end
end

local function grad(x3,y3,w3,h3,r1,g1,b1,a1,r2,g2,b2,a2)
    surface.draw_set_color(color_t.new(r1,g1,b1,a1))
    surface.draw_filled_rect_fade(x3,y3,w3,h3, a1, 0, true)
    surface.draw_set_color(color_t.new(r2,g2,b2,a2))
    surface.draw_filled_rect_fade(x3,y3,w3,h3, 0, a2, true)
end

local function on_paint()
    local local_player = entitylist.get_local_player()
    
    local iHealth = local_player:get_prop_int(m_iHealth)
    

    surface.draw_set_text_font(font_verdana)

    local pos_x = ui.get_int("kb_position_x")
    local pos_y = ui.get_int("kb_position_y")

    surface.draw_set_color(color_t.new(30,30,38,150))
    surface.draw_filled_rect(pos_x, pos_y, pos_x + 170, pos_y + 19)

    surface.draw_set_text_color(color_t.new(255, 255, 255, 255))
    surface.draw_set_text_pos(pos_x + 60, pos_y + 3)
    surface.draw_print_text("keybinds")

    grad(pos_x, pos_y + 0, pos_x + 170, pos_y + 2, 146, 0, 255, 255, 122, 0, 212, 255)

    count = 0
    add_bind("fakeduck", "antihit_extra_fakeduck_bind", ui.get_int("antihit_extra_fakeduck_bind_type"), pos_x, pos_y)
    add_bind("inverted desync", "antihit_antiaim_flip_bind", 2, pos_x, pos_y)
    add_bind("active exploit", "ragebot_active_exploit_bind", ui.get_int("ragebot_active_exploit_bind_type"), pos_x, pos_y)
    add_bind("thirdperson", "visuals_other_thirdperson_bind", ui.get_int("visuals_other_thirdperson_bind_type"), pos_x, pos_y)
    add_bind("auto fire", "legit_autofire_bind", 4, pos_x, pos_y)
end

client.register_callback("paint", on_paint)