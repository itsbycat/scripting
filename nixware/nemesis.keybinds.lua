-- ByCat#7797

local font = surface.setup_font("Verdana", 12, 100, 0, 0, 0x200);
local screensize = engine.get_screen_size()

ui.add_slider_int("X", "catbind_position_x", 0, screensize.x, 111)
ui.add_slider_int("Y", "catbind_position_y", 0, screensize.y, 383)
ui.add_color_edit("color accent", "catbind_color", true, color_t.new(255, 0, 0, 170))
ui.add_checkbox("Show thirdperson", "catbind_thirdperson", true)
ui.add_checkbox("Auto peek LUA", "autopeek", false)

local types = {
    [0] = "   always",
    [1] = "     hold",
    [2] = "   toggle",
    [3] = "force off"
}

local count = 0

local function add_bind(label, bind_name, bind_type, x, y)
    if ui.get_bind_state(bind_name) then
        surface.draw_set_text_pos(x + 5, y + 19 + (15 * count))
        surface.draw_print_text(label)

        surface.draw_set_text_pos(x + 125, y + 19 + (15 * count))
        surface.draw_print_text("" .. types[bind_type] .. "")

        count = count + 1
    end
end

local function on_paint()
    local local_player = entitylist.get_local_player()
	
    surface.draw_set_text_font(font)

    local pos_x = ui.get_int("catbind_position_x")
    local pos_y = ui.get_int("catbind_position_y")
    local accent = ui.get_color("catbind_color")

    surface.draw_set_color(color_t.new(35, 35, 35, 200))
	surface.draw_filled_rect(pos_x, pos_y, pos_x + 170, pos_y + 18)
	
	surface.draw_set_color(color_t.new(35, 35, 35, 100)) 
	surface.draw_filled_rect(pos_x, pos_y,  pos_x + 170, pos_y + (count + 1)*17)

    surface.draw_set_text_color(color_t.new(255, 255, 255, 255))
    surface.draw_set_text_pos(pos_x + 60, pos_y + 3)
    surface.draw_print_text("keybinds")

	surface.draw_set_color(accent) 
	surface.draw_filled_rect(pos_x, pos_y,  pos_x + 170, pos_y + 2)

	surface.draw_set_color(color_t.new(0, 0, 0, 170)) 
	surface.draw_outlined_rect(pos_x, pos_y,  pos_x + 170, pos_y + (count + 1)*17)

    count = 0
    add_bind("fakeduck", "antihit_extra_fakeduck_bind", ui.get_int("antihit_extra_fakeduck_bind_type"), pos_x, pos_y)
    add_bind("inverted desync", "antihit_antiaim_flip_bind", 2, pos_x, pos_y)
    add_bind("active exploit", "ragebot_active_exploit_bind", ui.get_int("ragebot_active_exploit_bind_type"), pos_x, pos_y)
    if ui.get_bool("catbind_thirdperson") == true then
        add_bind("thirdperson", "visuals_other_thirdperson_bind", ui.get_int("visuals_other_thirdperson_bind_type"), pos_x, pos_y)
    end
    if ui.get_bool("autopeek") == true then
        add_bind("auto peek", "misc_autopeek_bind", ui.get_int("misc_autopeek_bind_type"), pos_x, pos_y)
    end
	add_bind("auto fire", "legit_autofire_bind", ui.get_int("legit_autofire_bind_type"), pos_x, pos_y)
end
client.register_callback("paint", on_paint)