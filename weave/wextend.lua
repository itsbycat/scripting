local sidebar = ui.tab("Script Items")

local vmis = ui.checkbox("Show viewmodel in scope")
local fch = ui.checkbox("Force crosshair")
local aspectratio = ui.slider("Aspect Ratio", 0, 500)
local tpdist = ui.slider("Thirdperson distance", 30, 180)


local lt = { vmis,fch,aspectratio,tpdist }

for i = 1, #lt do
    sidebar.left:add(lt[i])
end

local stat, err = pcall(function()
    script.load_all("script_items_bycat")
end)
if not status then script.save_all("script_items_bycat") end

sidebar:register()

local wds = convar.find("weapon_debug_spread_show")
local fcd = convar.find("fov_cs_debug")
local ras = convar.find("r_aspectratio")
local tp = convar.find("cam_idealdist")

callback.render(function()
    local lp = entity.me()
    if not lp then return end

    ras:set_float(aspectratio:get() / 100)
    tp:set_int(tpdist:get())

    if vmis:get() then
        fcd:set_int(90)
    else
        fcd:set_int(0)
    end

    if fch:get() then
        if lp:get_prop("DT_CSPlayer", "m_bIsScoped") == 1 then
            wds:set_int(0)
        else
            wds:set_int(3)
        end
    else
        wds:set_int(0)
    end
end)

callback.render(function()
    script.save_all("script_items_bycat")
end)
