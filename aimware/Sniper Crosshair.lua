local group = gui.Reference("VISUALS", "Other", "Effects")
local ms = gui.Checkbox(group, "scross.enable", "Sniper Crosshair", true)
local outline = gui.Checkbox(group, "scross.outline", "Outline in crosshair", true)
local accent = gui.ColorPicker(group, "scross.color", "Crosshair Color", 255, 255, 255, 255)

local width, height = draw.GetScreenSize()
local x, y = width / 2, height / 2
local offset, weight = 6, 2

callbacks.Register("Draw", function()
    local lp = entities.GetLocalPlayer()

    if not lp then return end

    if lp:GetWeaponType() ~= 5 then return end

    if outline:GetValue() then
        draw.Color(0, 0, 0)
        draw.FilledRect(x - weight / 2 - 1, y - offset - 1, x + weight / 2 + 1, y) -- upper
        draw.FilledRect(x - weight / 2 - 1, y + offset + 1, x + weight / 2 + 1,  y) -- bottom

        draw.FilledRect(x - offset - 1, y - weight / 2 - 1, x, y + weight / 2 + 1) -- left
        draw.FilledRect(x + offset + 1, y - weight / 2 - 1, x, y + weight / 2 + 1) -- right
    end

    draw.Color(accent:GetValue())
    draw.FilledRect(x - weight / 2, y - offset, x + weight / 2, y) -- upper
    draw.FilledRect(x - weight / 2, y + offset, x + weight / 2, y) -- bottom

    draw.FilledRect(x - offset, y - weight / 2, x, y + weight / 2) -- left
    draw.FilledRect(x + offset, y - weight / 2, x, y + weight / 2) -- right
end)
