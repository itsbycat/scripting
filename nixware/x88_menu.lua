-- ByCat#7797
-- Version 1.0.0

local font = surface.setup_font("Verdana", 13, 600, 0, 1, 0x200)

local function paint()
    local username = client.get_username()

    surface.draw_set_text_font(font)

    surface.draw_set_text_color(color_t.new(255, 0, 255, 255)) --pink

    surface.draw_set_text_pos(15, 45)
    surface.draw_print_text("nixware.cc")

    surface.draw_set_text_color(color_t.new(255, 255, 0, 255)) --yellow

    surface.draw_set_text_pos(400, 1)
    surface.draw_print_text("Welcome back :) Hello aimsense :)")

    surface.draw_set_text_pos(400, 12)
    surface.draw_print_text("Hello " .. username .. ":)")

    surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
    surface.draw_set_text_pos(400, 25)
    surface.draw_print_text("Type:")
    local type = ui.get_bool("ragebot_enable")
    if(type) then
        surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --green
        surface.draw_set_text_pos(500, 25)
        surface.draw_print_text("Rage")

        --ELEMENTS

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 35)
        surface.draw_print_text("A. exploits:")
        local exploits = ui.get_bind_state("ragebot_active_exploit_bind")
        if(exploits) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 35)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 35)
            surface.draw_print_text("Off")
        end

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 65)
        surface.draw_print_text("Resolver:")
        local resolver = ui.get_bool("ragebot_resolver")
        if(resolver) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 65)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 65)
            surface.draw_print_text("Off")
        end
    else
        surface.draw_set_text_color(color_t.new(0, 0, 255, 255)) --red
        surface.draw_set_text_pos(500, 25)
        surface.draw_print_text("Legit")

        --ELEMENTS

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 35)
        surface.draw_print_text("Trigger bot:")
        local trigger = ui.get_bind_state("legit_autofire_bind")
        if(trigger) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 35)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 35)
            surface.draw_print_text("Off")
        end

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 65)
        surface.draw_print_text("Bunnyhop:")
        local bunnyhop = ui.get_bool("misc_bunnyhop")
        if(bunnyhop) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 65)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 65)
            surface.draw_print_text("Off")
        end

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 75)
        surface.draw_print_text("Enemy esp:")
        local enemyesp = ui.get_bool("visuals_esp_enemy_enable")
        if(enemyesp) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 75)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 75)
            surface.draw_print_text("Off")
        end

        surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 85)
        surface.draw_print_text("Backtrack:")
        local bt = ui.get_bool("legit_backtracking")
        if(bt) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 85)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 85)
            surface.draw_print_text("Off")
        end
    end

    surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
    surface.draw_set_text_pos(400, 45)
    surface.draw_print_text("Anti-Aim:")
    local antiaim_enable = ui.get_bool("antihit_antiaim_enable")
    local antiaim = ui.get_bind_state("antihit_antiaim_flip_bind")
    if(antiaim_enable) then
        if(antiaim) then
            surface.draw_set_text_color(color_t.new(0, 0, 255, 255)) --blue
            surface.draw_set_text_pos(500, 45)
            surface.draw_print_text("Left")
        else
            surface.draw_set_text_color(color_t.new(0, 0, 255, 255)) --blue
            surface.draw_set_text_pos(500, 45)
            surface.draw_print_text("Right")
        end
    else
        surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
        surface.draw_set_text_pos(500, 45)
        surface.draw_print_text("Off")
    end

    surface.draw_set_text_color(color_t.new(255, 255, 255, 255)) --white
        surface.draw_set_text_pos(400, 55)
        surface.draw_print_text("Fakelag:")
        local fl = ui.get_bool("antihit_fakelag_enable")
        if(fl) then
            surface.draw_set_text_color(color_t.new(0, 255, 0, 255)) --green
            surface.draw_set_text_pos(500, 55)
            surface.draw_print_text("On")
        else
            surface.draw_set_text_color(color_t.new(255, 0, 0, 255)) --red
            surface.draw_set_text_pos(500, 55)
            surface.draw_print_text("Off")
        end
end
client.register_callback("paint", paint)