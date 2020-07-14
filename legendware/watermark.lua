-- ByCat#7797
-- Version 1.0.0

local font = render.create_font("Verdana", 13, 500, false, true, false)

local function on_paint()
    local screen_width = engine.get_screen_width()
    local fps = tostring(globals.get_framecount())
    local ping = tostring(globals.get_ping())
    local nickname = globals.get_username()
    local curtime = globals.get_time()
    local color_gradient = color.new(255, 0, 0, 200)
    local color_gradient2 = color.new(0, 0, 0, 200)

    local text
    if ping ~= "0" then
        text = tostring(" Legendware | " .. nickname .. " | " .. "delay: " .. ping .. " | " .. curtime .. " ")
    else
        text = tostring(" Legendware | " .. nickname .. " | " .. curtime .. " ")
    end
    local width = render.get_text_width(font, text)

    local bg_color = color.new(40, 40, 47, 245)

    local x = screen_width - 10 - width - 4
    local y = 10
    local w = width + 5

    render.draw_rect_filled_gradient(x - 2, y - 1, w + 4, 20 + 2, color_gradient, color_gradient2, 1)
    render.draw_rect_filled(x, y + 2, w, 16, bg_color)
    render.draw_text(font, x + 2, y + 3, color.new(255, 255, 255), text)
end

client.add_callback("on_paint", on_paint)