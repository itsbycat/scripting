local c_hud_chat =
    ffi.cast("unsigned long(__thiscall*)(void*, const char*)", mem.FindPattern("client.dll", "55 8B EC 53 8B 5D 08 56 57 8B F9 33 F6 39 77 28"))(
    ffi.cast("unsigned long**", ffi.cast("uintptr_t", mem.FindPattern("client.dll", "B9 ?? ?? ?? ?? E8 ?? ?? ?? ?? 8B 5D 08")) + 1)[0],
    "CHudChat"
)

local ffi_print_chat = ffi.cast("void(__cdecl*)(int, int, int, const char*, ...)", ffi.cast("void***", c_hud_chat)[0][27])

function client.PrintChat(msg)
    ffi_print_chat(c_hud_chat, 0, 0, " " .. msg)
end

local team_name = {
    [0] = "Spectator",
    [2] = "Terrorist",
    [3] = "Counter-Terrorist"
}

client.AllowListener("player_say")
callbacks.Register("FireGameEvent", "ChatRevealer", function(event)
    if event:GetName() ~= "player_say" then return end
    local lp = entities.GetLocalPlayer()
    if lp == nil then return end
    local message = event:GetString("text")
    local index = event:GetInt("userid")
    if index == nil then return end
    local ent = entities.GetByUserID(index)
    if ent == nil then return end
    local name = ent:GetName()
    local team = ent:GetTeamNumber()
	if team == lp:GetTeamNumber() then return end
    local clr = team == 2 and "\09" or team == 3 and "\10" or "\01"
	local tag = ent:IsAlive() and "" or "*DEAD* "

    client.PrintChat(("%s%s(%s) %s :\01 %s"):format(clr, tag, team_name[team], name, message))
end)
