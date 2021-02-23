-- ByCat#7797
-- Fixed

local i_primary = ui.add_combo_box("Primary", "i_primary", { "off", "Auto", "Scout", "AWP" }, 0)

local i_secondary = ui.add_combo_box("Secondary", "i_secondary", { "off", "Deagle/R8", "Duals" }, 0)

local buy_Other = ui.add_check_box("Other (Nade, Taser)", "buy_Other", true)
local function buy_bot(event)
   if event:get_name() == "round_start" then
           if i_primary:get_value() == 1 then
              engine.execute_client_cmd("buy scar20")
           end   
           if i_primary:get_value() == 2 then
              engine.execute_client_cmd("buy SSG08")
           end
           if i_primary:get_value() == 3 then
               engine.execute_client_cmd("buy awp")
           end 

           -- pistols

           if i_secondary:get_value() == 1 then
              engine.execute_client_cmd("buy Deagle")
           end   
           if i_secondary:get_value() == 2 then
              engine.execute_client_cmd("buy elite")
           end
          
           if buy_Other:get_value() then
               engine.execute_client_cmd("buy taser;buy vest; buy vesthelm; buy taser; buy defuser; buy hegrenade; buy smokegrenade; buy molotov;")
           end
    end               
end

client.register_callback("fire_game_event", buy_bot)
