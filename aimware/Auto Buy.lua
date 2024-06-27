--[[ 
usage: buy <item>
  secondary0
  secondary1
  secondary2
  secondary3
  secondary4
  midtier0
  midtier1
  midtier2
  midtier3
  midtier4
  rifle0
  rifle1
  rifle2
  rifle3
  rifle4
  glock
  hkp2000
  usp_silencer
  elite
  p250
  tec9
  fiveseven
  cz75a
  deagle
  revolver
  nova
  mag7
  sawedoff
  xm1014
  m249
  negev
  mp5sd
  p90
  mp7
  mac10
  mp9
  bizon
  ump45
  galilar
  famas
  ak47
  m4a1
  m4a1_silencer
  ssg08
  aug
  sg556
  awp
  g3sg1
  scar20
  vest
  vesthelm
  taser
  defuser
  flashbang
  smokegrenade
  hegrenade
  molotov
  incgrenade
  decoy
]]

local primary_items = { "None", "Autosnipers", "Scout", "AWP" }
local secondary_items = { "None", "Deagle", "Revolver", "Tec-9 / Five-7 / CZ-75", "P-250", "Duals" }
local equipment_list = { "Kevlar", "Helmet", "Defuser", "Taser", "HE", "Molotov", "Smoke", "Flashbang", "Decoy" }

local console_cmds = {
    { "buy scar20; buyg3sg1", "buy ssg08"; "buy awp" },
    { "buy deagle", "buy revolver", "buy tec9; buy fiveseven; buy cz75a", "buy p250", "elite" },
    { "buy vest", "buy vesthelm", "buy defuser", "buy taser 34", "buy hegrenade", "buy molotov; buy incgrenade", "buy smokegrenade", "buy hegrenade", "buy flashbang", "buy decoy" }
}

local tab = gui.Reference("MISC", "General")
local group = gui.Groupbox(tab, "Autobuy", 16, 190, 298)

local master_switch = gui.Checkbox(group, "autobuy.enable", "Enabled", false)
local primary = gui.Combobox(group, "autobuy.primary", "Primary", unpack(primary_items))
local secondary = gui.Combobox(group, "autobuy.secondary", "Secondary", unpack(secondary_items))
local equipment = gui.Multibox(group, "Equipment")
local equipments = {}

for i = 1, #equipment_list do
    table.insert(
        equipments,
        gui.Checkbox(equipment, "eq." .. equipment_list[i]:lower(), equipment_list[i], false)
    )
end

local function run_buybot()
    local cmd_exec = ""

    if primary:GetValue() > 0 then
        cmd_exec = cmd_exec .. console_cmds[1][primary:GetValue()] .. "; "
    end

    if secondary:GetValue() > 0 then
        cmd_exec = cmd_exec .. console_cmds[2][secondary:GetValue()] .. "; "
    end

    for i = 1, #equipments do
        if equipments[i]:GetValue() then
            cmd_exec = cmd_exec .. console_cmds[3][i] .. "; "
        end
    end

    if cmd_exec == "" then return end

    client.Command(cmd_exec, true)
end

client.AllowListener("round_prestart")
callbacks.Register("FireGameEvent", "automatic buy", function(event)
    if not master_switch:GetValue() then return end
    
    if event:GetName() == "game_start" then
        return run_buybot()
    end

    if event:GetName() == "round_prestart" then
        return run_buybot()
    end
end)
