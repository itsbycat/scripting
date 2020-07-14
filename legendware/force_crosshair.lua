-- ByCat#7797

menu.add_check_box("Force crosshair")

local function force_crosshair()
	local zoom = cmd.get_button_state(buttons.in_attack2)
    if menu.get_bool("Force crosshair") then
        if (zoom == true) then
            console.set_string("weapon_debug_spread_show", "0")
        else
            console.set_string("weapon_debug_spread_show", "3")
        end
    else
        console.set_string("weapon_debug_spread_show", "0")
    end
end
client.add_callback("on_paint", force_crosshair)