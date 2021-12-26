local Events        = csgo.interface_handler:get_events()
local Callbacks     = fatality.callbacks
local engine_client = csgo.interface_handler:get_engine_client( )

local function OnGameEvent(Event)
    local EventName = Event:get_name()
    
    if EventName == "round_start" then
        engine_client:client_cmd("buy hegrenade; buy smokegrenade; buy molotov;")
    end
end

Events:add_event("round_start")
Callbacks:add("events", OnGameEvent)
