local ref = {
    "rbot.antiaim.base",
    "rbot.antiaim.left",
    "rbot.antiaim.right"
}

local group = gui.Reference("Ragebot", "Anti-Aim", "Advanced")

local yaw_offset = gui.Slider(group, "offset", "Offset", 0, -180, 180)
local yaw_modifier = gui.Combobox(group, "modifier", "Yaw Modifier", "Disabled", "Jitter")
local modifier_offset = gui.Slider(group, "modifier_offset", "Modifier Offset", 0, -180, 180)

local function antiaim_Yaw(value)
    for i = 1, #ref do
        gui.SetValue(ref[i], value)
    end
end

local j = 1

callbacks.Register("CreateMove", function(cmd)
    local offset = yaw_offset:GetValue()

    if yaw_modifier:GetValue() == 1 then
        offset = offset + modifier_offset:GetValue() * j
        j = j == -1 and 1 or -1
    end

    local value = offset < 0 and offset + 180 or offset - 180

    antiaim_Yaw(value)
end)
