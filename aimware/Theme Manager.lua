local status, err = pcall(function() file.Open("themes.txt", "r") end)
if not status then file.Write("themes.txt", "{}") end

local theme = {
    "theme.footer.bg",
    "theme.footer.text",
    "theme.header.bg",
    "theme.header.line",
    "theme.header.text",
    "theme.nav.active",
    "theme.nav.bg",
    "theme.nav.shadow",
    "theme.nav.text",
    "theme.tablist.shadow",
    "theme.tablist.tabactivebg",
    "theme.tablist.tabdecorator",
    "theme.tablist.text",
    "theme.tablist.text2",
    "theme.ui2.border",
    "theme.ui2.lowpoly1",
    "theme.ui2.lowpoly2"
}

-- json lib
local a=false;file.Enumerate(function(b)if b=="libraries/json.lua"then a=true end end)if not a then local c=http.Get("https://raw.githubusercontent.com/G-A-Development-Team/libs/main/json.lua")file.Write("libraries/json.lua",c)end;RunScript("libraries/json.lua")

local themes_file = file.Read("themes.txt")

local ui = gui.Tab(gui.Reference("Settings"), "tm", "Theme Manager")

local browse = gui.Groupbox(ui, "Browse", 20, 16, 287.5, 50)
local file_u = gui.Groupbox(ui, "File", 330, 16, 287.5, 100)
local config = gui.Groupbox(ui, "Configuration", 330, 16 + 220, 287.5, 100)

local function get_cfgs()
    themes_file = file.Read("themes.txt")

    local ret = {}

    parse = json.decode(themes_file)

    for i = 1, #parse do
        table.insert(ret, parse[i][1])
    end

    return ret
end

local total_cfg_list = get_cfgs()

local list_cfg  = gui.Listbox(browse, "list", 400, unpack(total_cfg_list))
local input_cfg = gui.Editbox(file_u, "input", "Name")

gui.Button(file_u, "Create", function()
    local ret = {}

    for i = 1, #theme do
        r, g, b, a = gui.GetValue(theme[i])
        ret[theme[i]] = ("%s %s %s %s"):format(r, g, b, a)
    end

    ret = json.encode(ret)

    parse = json.decode(themes_file)

    table.insert(parse, { input_cfg:GetValue(), ret })

    file.Write("themes.txt", json.encode(parse))

    list_cfg:SetOptions(unpack(get_cfgs()))
end)
gui.Button(file_u, "Delete", function()
    parse = json.decode(themes_file)

    selected = list_cfg:GetValue() + 1

    table.remove(parse, selected)

    file.Write("themes.txt", json.encode(parse))

    list_cfg:SetOptions(unpack(get_cfgs()))
end)

gui.Button(config, "Save", function()
    local ret = {}

    for i = 1, #theme do
        r, g, b, a = gui.GetValue(theme[i])
        ret[theme[i]] = ("%s %s %s %s"):format(r, g, b, a)
    end

    ret = json.encode(ret)

    selected = list_cfg:GetValue() + 1

    parse = json.decode(themes_file)

    parse[selected] = {total_cfg_list[selected], ret}

    file.Write("themes.txt", json.encode(parse))
end)
gui.Button(config, "Load", function()
    parse = json.decode(themes_file)

    selected = list_cfg:GetValue() + 1

    imports = json.decode(parse[selected][2])

    for key, value in pairs(imports) do
        gui.Command(key .. " " .. value)
    end
end)
