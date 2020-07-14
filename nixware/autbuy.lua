-- ByCat#7797

ui.add_combo("buy_Primary", "i_primary", { "off", "Auto", "Scout", "AWP" }, 0)

ui.add_combo("buy_Secondary", "i_secondary", { "off", "Deagle/R8", "Duals" }, 0)

ui.add_checkbox("Other (Nade, Taser)", "buy_Other", true)
local function buy_bot(event)
   if event:get_name() == "round_start" then
           if ui.get_int("i_primary") == 1 then
              engine.execute_client_cmd("buy scar20")
           end   
           if ui.get_int("i_primary") == 2 then
              engine.execute_client_cmd("buy SSG08")
           end
           if ui.get_int("i_primary") == 3 then
               engine.execute_client_cmd("buy awp")
           end 

           -- pistols

           if ui.get_int("i_secondary") == 1 then
              engine.execute_client_cmd("buy Deagle")
           end   
           if ui.get_int("i_secondary") == 2 then
              engine.execute_client_cmd("buy elite")
           end
          
           if ui.get_bool("buy_Other") then
               engine.execute_client_cmd("buy taser;buy vest; buy vesthelm; buy taser; buy defuser; buy hegrenade; buy smokegrenade; buy molotov;")
           end
    end               
end

client.register_callback("fire_game_event", buy_bot)