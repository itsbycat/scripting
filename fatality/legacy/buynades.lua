local Events        = csgo.interface_handler:get_events()
local Callbacks     = fatality.callbacks
local engine_client = csgo.interface_handler:get_engine_client( )
local menu          = fatality.menu
local config        = fatality.config

local menu_value = config:add_item("buy_nade", 0)
local checkbox = menu:add_checkbox("Nades", "misc", "misc", "Buy bot", menu_value)

local function OnGameEvent(Event)
    if not menu_value:get_bool() then return end
    
    local EventName = Event:get_name()
    
    if EventName == "round_start" then
        engine_client:client_cmd("buy hegrenade; buy smokegrenade; buy molotov;")
    end
end

Events:add_event("round_start")
Callbacks:add("events", OnGameEvent)
