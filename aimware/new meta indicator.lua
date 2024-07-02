local font = draw.CreateFont("Smallest Pixel-7", 10.5, 500)

local render = {}
local width, height = draw.GetScreenSize()

function render.Text(pos, font, col, text)
    draw.SetFont(font)
    draw.Color(0, 0, 0)

    -- outline
    draw.Text(pos[1] - 1, pos[2] - 1, text)
    draw.Text(pos[1] - 1, pos[2], text)
    draw.Text(pos[1], pos[2] - 1, text)
    draw.Text(pos[1] + 1, pos[2] + 1, text)
    draw.Text(pos[1] + 1, pos[2], text)
    draw.Text(pos[1], pos[2] + 1, text)

    draw.Color(unpack(col))
    draw.Text(pos[1], pos[2], text)
end

callbacks.Register("Draw", function()
    local LocalPlayer = entities.GetLocalPlayer()

    if not LocalPlayer then return end
    if not LocalPlayer:IsAlive() then return end

    local weapon = gui.GetValue("rbot.hitscan.accuracy")
    local min_damage = gui.GetValue(string.format("rbot.hitscan.accuracy.%s.mindamage", weapon:gsub('"', ''):lower()))
    local hit_chance = gui.GetValue(string.format("rbot.hitscan.accuracy.%s.hitchance", weapon:gsub('"', ''):lower()))
    local burst_hit_chance = gui.GetValue(string.format("rbot.hitscan.accuracy.%s.hitchanceburst", weapon:gsub('"', ''):lower()))
    
    render.Text({width / 2 + 60, height / 2 - 60}, font, {255, 255, 255, 255}, min_damage and "DMG " .. min_damage or "DMG")
    if gui.GetValue("rbot.accuracy.attack.rapidfire") then
        render.Text({width / 2 + 120, height / 2 - 60}, font, {255, 255, 255, 255}, burst_hit_chance and "HC " .. burst_hit_chance .. "% (BURST)" or "HC")
    else
        render.Text({width / 2 + 120, height / 2 - 60}, font, {255, 255, 255, 255}, hit_chance and "HC " .. hit_chance .. "%" or "HC")
    end
end)
