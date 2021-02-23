-- ByCat#7797
-- Fixed

local notify = client.notify

local logs_hits = ui.add_check_box('show hits', 'logs_hits', false)
local logs_harms = ui.add_check_box('show harms', 'logs_harms', false)
local logs_misses = ui.add_check_box('show misses', 'logs_misses', false)
local logs_purchases = ui.add_check_box('show purchases', 'logs_purchases', false)

local hitboxes = {
    'generic',
    'head',
    'chest',
    'stomach',
    'left arm',
    'right arm',
    'left leg',
    'right leg',
    'body'
}

local function get_hitbox(index)
    if hitboxes[index] then
        return hitboxes[index]
    else
        return "generic"
    end
end

client.register_callback('fire_game_event', function (event)
    if event:get_name() ~= 'player_hurt' then
        return
    end

    local me = engine.get_local_player()

    local attacker = engine.get_player_for_user_id(event:get_int("attacker", 0))
    local victim_index = engine.get_player_for_user_id(event:get_int("userid", 0))
    local target = entitylist.get_entity_by_index(attacker)

    local damage = event:get_int("dmg_health", 0)
    local hit = event:get_int("hitgroup", 0)

    
    if me == attacker and me ~= victim_index then
        if not logs_hits:get_value() then
            return
        end

        local pl = engine.get_player_info(victim_index)

        notify('hit ' .. pl.name .. ' for ' .. tostring(damage) .. ' in ' .. get_hitbox(hit + 1))
    elseif me ~= attacker and me == victim_index then
        if not logs_harms:get_value() then
            return
        end

        local pl = engine.get_player_info(attacker)

        notify('harmed by ' .. pl.name .. ' for ' .. tostring(damage) .. ' in ' .. get_hitbox(hit + 1))
    end
end)

client.register_callback('shot_fired', function (shot)
    if not logs_misses:get_value() then
        return
    end

    if shot.result ~= 'hit' then
		if shot.result ~= '' then
			notify('missed shot due ' .. shot.result)
		end
    end
end)

--
se.register_event("item_purchase")
local function on_events(e)
	if not logs_purchases:get_value() then
        return
    end
	
	if e:get_name() ~= "item_purchase" then return end
	local item_name = e:get_string("weapon", "")
	local player_name = engine.get_player_info(engine.get_player_for_user_id(e:get_int("userid", 0))).name

	notify(player_name .. " bought a " .. item_name)
end
client.register_callback("fire_game_event", on_events)
