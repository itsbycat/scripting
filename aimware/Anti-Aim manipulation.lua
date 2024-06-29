local ref = {
    "rbot.antiaim.base",
    "rbot.antiaim.left",
    "rbot.antiaim.right"
}

local group = gui.Reference("Ragebot", "Anti-Aim", "Advanced")

local yaw_offset = gui.Slider(group, "offset", "Offset", 0, -180, 180)
local yaw_modifier = gui.Combobox(group, "modifier", "Yaw Modifier", "Disabled", "Jitter")
local modifier_offset = gui.Slider(group, "modifier_offset", "Modifier Offset", 0, -180, 180)
local manuals_enabled = gui.Checkbox(group, "manuals_enable", "Manuals", true)
local manuals = {
    gui.Checkbox(group, "manuals_left", "Left", false),
    gui.Checkbox(group, "manuals_right", "Right", false)
}

local function antiaim_Yaw(value)
    for i = 1, #ref do
        gui.SetValue(ref[i], value)
    end
end

local j = 1

local function run(cmd)
    local offset = yaw_offset:GetValue()

    if yaw_modifier:GetValue() == 1 then
        offset = offset + modifier_offset:GetValue() * j
        j = j == -1 and 1 or -1
    end

    local value = offset < 0 and offset + 180 or offset - 180

    antiaim_Yaw(value)
end

callbacks.Register("CreateMove", function(cmd)
    run(cmd)

    if manuals_enabled:GetValue() then
        if manuals[1]:GetValue() then
            antiaim_Yaw(90)
        end
        if manuals[2]:GetValue() then
            antiaim_Yaw(-90)
        end
    end
end)
