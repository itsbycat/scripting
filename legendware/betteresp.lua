local ffi = require('ffi')
ffi.cdef[[
    typedef struct
    {
        float x;
        float y;
        float z;
    } Vector_t;
    typedef unsigned long DWORD, *PDWORD, *LPDWORD;  
    typedef int BOOL;
    typedef struct _SECURITY_ATTRIBUTES {
        DWORD  nLength;
        void* lpSecurityDescriptor;
        BOOL   bInheritHandle;
    } SECURITY_ATTRIBUTES, *PSECURITY_ATTRIBUTES, *LPSECURITY_ATTRIBUTES;
    typedef uintptr_t (__thiscall* GetClientEntity_4242425_t)(void*, int);
    void* __stdcall URLDownloadToFileA(void* LPUNKNOWN, const char* LPCSTR, const char* LPCSTR2, int a, int LPBINDSTATUSCALLBACK);
    int AddFontResourceA(const char* unnamedParam1);
    bool DeleteUrlCacheEntryA(const char* lpszUrlName);
    BOOL CreateDirectoryA(const char* lpPathName, LPSECURITY_ATTRIBUTES lpSecurityAttributes);
]]

local wininet = ffi.load 'WinInet'
local urlmon = ffi.load 'UrlMon'
local gdi = ffi.load 'Gdi32'

function install_logo_font()
    local appdataraw = os.getenv("appdata")
    local appdata = string.gsub(appdataraw, "\\", "/")

    --ffi.C.CreateDirectoryA(appdata.."/Legendware/Scripts/lib", nil)

    local weapon_font_path = appdata.."/Legendware/Scripts/weap_font_esp.ttf"
    local weapon_font_download_link = "https://cdn.discordapp.com/attachments/775721640490434610/939223685498298498/weaponfont.ttf"
    --print("" .. logo_font_path)
    wininet.DeleteUrlCacheEntryA(weapon_font_download_link)
    urlmon.URLDownloadToFileA(nil, weapon_font_download_link, weapon_font_path, 0,0)
    gdi.AddFontResourceA(weapon_font_path)
end

install_logo_font()

local entity_list_ptr = ffi.cast("void***", utils.create_interface("client.dll", "VClientEntityList003"))
local get_client_entity_fn = ffi.cast("GetClientEntity_4242425_t", entity_list_ptr[0][3])

local fonts = {
    main = render.create_font("verdana", 12, 400, false, true, false),
    sec = render.create_font("Smallest Pixel-7", 11, 300, true, false, true),
    weapon = render.create_font("my font", 12, 100, false, false, false)
}

local function get_classes(weapon)
    local send = {}
    local heavy = 0
    local pistol = 1
    local auto = 2
    local scout = 3
    local awp = 4
    local rifle = 5
    local smg = 6
    local shotgun = 7
    if weapon == "CDEagle" then
        send = {
            icon = "A",
            config = heavy,
            name = "Deagle",
            class = "CDEagle"
        }
        return send
    end
    if weapon == "CWeaponElite" then
        send = {
            icon = "B",
            config = pistol,
            name = "Dual Berettas",
            class = "CWeaponElite"
        }
        return send
    end
    if weapon == "CWeaponFiveSeven" then
        send = {
            icon = "C",
            config = pistol,
            name = "Five Seven",
            class = "CWeaponFiveSeven"
        }
        return send
    end
    if weapon == "CWeaponGlock" then
        send = {
            icon = "D",
            config = pistol,
            name = "Glock",
            class = "CWeaponGlock"
        }
        return send
    end
    if weapon == "CAK47" then
        send = {
            icon = "E",
            config = rifle,
            name = "AK47",
            class = "CAK47"
        }
        return send
    end
    if weapon == "CWeaponAug" then
        send = {
            icon = "F",
            config = rifle,
            name = "Aug",
            class = "CWeaponAug"
        }
        return send
    end
    if weapon == "CWeaponAWP" then
        send = {
            icon = "G",
            config = awp,
            name = "Awp",
            class = "CWeaponAWP"
        }
        return send
    end
    if weapon == "CWeaponFamas" then
        send = {
            icon = "H",
            config = rifle,
            name = "Famas",
            class = "CWeaponFamas"
        }
        return send
    end
    if weapon == "CWeaponG3SG1" then
        send = {
            icon = "I",
            config = auto,
            name = "G3SG1",
            class = "CWeaponG3SG1"
        }
        return send
    end
    if weapon == "CWeaponGalil" or weapon == "CWeaponGalilAR" then
        send = {
            icon = "J",
            config = rifle,
            name = "Galil",
            class = "CWeaponGalil"
        }
        return send
    end
    if weapon == "CWeaponM4A1" then
        send = {
            icon = "K",
            config = rifle,
            name = "M4A1",
            class = "CWeaponM4A1"
        }
        return send
    end
    if weapon == "CWeaponMAC10" then
        send = {
            icon = "M",
            config = smg,
            name = "MAC-10",
            class = "CWeaponMAC10"
        }
        return send
    end
    if weapon == "CWeaponHKP2000" then
        send = {
            icon = "N",
            config = pistol,
            name = "P2000",
            class = "CWeaponHKP2000"
        }
        return send
    end
    if weapon == "CWeaponUMP45" then
        send = {
            icon = "O",
            config = smg,
            name = "UMP45",
            class = "CWeaponUMP45"
        }
        return send
    end 
    if weapon == "CWeaponXM1014" then
        send = {
            icon = "P",
            config = shotgun,
            name = "XM1014",
            class = "CWeaponXM1014"
        }
        return send
    end
    if weapon == "CWeaponBizon" then
        send = {
            icon = "Q",
            config = smg,
            name = "PPBizon",
            class = "CWeaponBizon"
        }
        return send
    end
    if weapon == "CWeaponMag7" then
        send = {
            icon = "R",
            config = shotgun,
            name = "MAG7",
            class = "CWeaponMag7"
        }
        return send
    end
    if weapon == "CWeaponNegev" then
        send = {
            icon = "S",
            config = smg,
            name = "Negev",
            class = "CWeaponNegev"
        }
        return send
    end
    if weapon == "CWeaponSawedoff" then
        send = {
            icon = "T",
            config = shotgun,
            name = "Sawedoff",
            class = "CWeaponSawedoff"
        }
        return send
    end
    if weapon == "CWeaponTec9" then
        send = {
            icon = "U",
            config = pistol,
            name = "TEC7",
            class = "CWeaponTec9"
        }
        return send
    end
    if weapon == "CWeaponTaser" then
        send = {
            icon = "V",
            config = nil,
            name = "Taser",
            class = "CWeaponTaser"
        }
        return send
    end
    if weapon == "CWeaponP250" or weapon == "CWeaponP228" then
        send = {
            icon = "W",
            config = pistol,
            name = "P250",
            class = "CWeaponP250"
        }
        return send
    end
    if weapon == "CWeaponMP7" then
        send = {
            icon = "X",
            config = smg,
            name = "MP7",
            class = "CWeaponMP7"
        }
        return send
    end
    if weapon == "CWeaponMP9" then
        send = {
            icon = "Y",
            config = smg,
            name = "MP9",
            class = "CWeaponMP9"
        }
        return send
    end
    if weapon == "CWeaponNOVA" then
        send = {
            icon = "Z",
            config = shotgun,
            name = "Nova",
            class = "CWeaponNOVA"
        }
        return send
    end
    if weapon == "CWeaponP90" then
        send = {
            icon = "a",
            config = smg,
            name = "P90",
            class = "CWeaponP90"
        }
        return send
    end
    if weapon == "CWeaponSCAR20" then
        send = {
            icon = "b",
            config = auto,
            name = "SCAR20",
            class = "CWeaponSCAR20"
        }
        return send
    end
    if weapon == "CWeaponSG552" or weapon == "CWeaponSG550" or weapon == "CWeaponSG556" then
        send = {
            icon = "c",
            config = rifle,
            name = "SG553",
            class = "CWeaponSG556"
        }
        return send
    end
    if weapon == "CWeaponScout" or weapon == "CWeaponSSG08" then
        send = {
            icon = "d",
            config = scout,
            name = "SSG08",
            class = "CWeaponScout" or "CWeaponSSG08"
        }
        return send
    end
    if weapon == "CFlashbang" then
        send = {
            icon = "f",
            config = nil,
            name = "Flashbang",
            class = "CFlashbang"
        }
        return send
    end
    if weapon == "CBaseCSGrenade" or weapon == "CBaseGrenade" or weapon == "CHEGrenade" then
        send = {
            icon = "g",
            config = nil,
            name = "Grenade",
            class = "CHEGrenade"
        }
        return send
    end
    if weapon == "CSmokeGrenade" then
        send = {
            icon = "h",
            config = nil,
            name = "Smoke",
            class = "CSmokeGrenade"
        }
        return send
    end
    if weapon == "CMolotovGrenade" then
        send = {
            icon = "i",
            config = nil,
            name = "Molotov",
            class = "CMolotovGrenade"
        }
        return send
    end
    if weapon == "CDecoyGrenade" then
        send = {
            icon = "j",
            config = nil,
            name = "Decoy",
            class = "CDecoyGrenade"
        }
        return send
    end
    if weapon == "CIncendiaryGrenade" then
        send = {
            icon = "k",
            config = nil,
            name = "Incendiary",
            class = "CIncendiaryGrenade"
        }
        return send
    end
    if weapon == "CC4" then
        send = {
            icon = "l",
            config = nil,
            name = "Bomb",
            class = "CC4"
        }
        return send
    end
    if weapon == "CWeaponM249" then
        send = {
            icon = "m",
            config = smg,
            name = "M249",
            class = "CWeaponM249"
        }
        return send
    end
    if weapon == "CWeaponUSP" then
        send = {
            icon = "n",
            config = pistol,
            name = "USP",
            class = "CWeaponUSP"
        }
        return send
    end
    if weapon == "CKnife" or weapon == "CKnifeGG" then
        send = {
            icon = "e",
            config = nil,
            name = "Knife",
            class = "CKnife"
        }
        return send
    end
end

local ffi_helpers = {
    get_entity_address = function(ent_index)
        local addr = get_client_entity_fn(entity_list_ptr, ent_index)
        return addr
    end
}

local distance,pl_orig,ent,player,e_orig,viewoffset,newang,position
local function dist(x,y,z,x1,y1,z1)
    return math.sqrt(math.pow((x1-x),2)+math.pow((y1-y),2)+math.pow((z1-z),2))
end

menu.add_check_box( "Custom Box" )
menu.add_color_picker( "Custom Box Color" )
menu.add_check_box( "Health Bar" )
menu.add_color_picker( "Health Bar Color" )
menu.add_check_box( "Health Bar Auto Color" )
menu.next_line()
menu.add_check_box( "Revert Health Bar" )
menu.next_line()
menu.add_check_box( "Name" )
menu.add_color_picker( "Name Color" )
menu.add_check_box( "Flags" )
menu.add_color_picker( "Flags Color" )
menu.add_check_box( "Weapon Icon" )
menu.add_color_picker( "Weapon Icon Color" )
menu.add_check_box( "Weapon Text" )
menu.add_color_picker( "Weapon Text Color" )
menu.add_check_box( "Zeus warning" )
menu.add_color_picker( "zeus color" )
menu.add_color_picker( "in hand color" )

function clamp(v, min, max)
    if v > max then return max end
    if v < min then return min end
    return v
end

local eyepos = {0,0,0}
function set_esp()
    local localplayer = entitylist.get_local_player()
    if not localplayer then return end
    local tp_dist = menu.get_int( "misc.third_person_distance" )
    
    local pl_orig = ffi.cast("Vector_t*",ffi_helpers.get_entity_address(localplayer:get_index())+312)
    for i=1, globals.get_maxclients() do
        ent = entitylist.get_player_by_index(i)
        player = entitylist.entity_to_player(ent)
        if ent == nil then goto continue end
        if player:get_health() < 1 or player:get_team() == localplayer:get_team() then goto continue end
        position = render.world_to_screen(player:get_origin())
        e_orig = ffi.cast("Vector_t*",ffi_helpers.get_entity_address(player:get_index())+312)
        if menu.get_key_bind_state( "misc.third_person_key" ) then
            distance = tp_dist + dist(pl_orig.x,pl_orig.y,pl_orig.z,e_orig.x,e_orig.y,e_orig.z)
        else
            distance = dist(pl_orig.x,pl_orig.y,pl_orig.z,e_orig.x,e_orig.y,e_orig.z)
        end
        if distance ~= nil then
            viewoffset = ffi.cast("Vector_t*",ffi_helpers.get_entity_address(player:get_index())+264)
            eyepos[1] = e_orig.x + viewoffset.x
            eyepos[2] = e_orig.y + viewoffset.y
            eyepos[3] = e_orig.z + viewoffset.z
            newang = render.world_to_screen( vector.new(eyepos[1], eyepos[2],eyepos[3]) )
            if newang.x ~= 0 and newang.y ~= 0 then
                local box = {}
                if menu.get_bool("misc.aspect_ratio") then
                    box = {
                        x = position.x - (position.y - newang.y)/4 / menu.get_float("misc.aspect_ratio_value") * 2,
                        y = newang.y - 5000/distance * 1.2,
                        w = ((position.y - newang.y)/2)/(menu.get_float("misc.aspect_ratio_value")) * 2,
                        h = position.y - newang.y + 7000/distance * 1.2
                    }
                else
                    box = {
                        x = position.x - (position.y - newang.y)/4 - 6,
                        y = newang.y - 5000/distance * 1.2,
                        w = (position.y - newang.y)/2 + 12,
                        h = position.y - newang.y + 7000/distance * 1.2
                    }
                end
                if menu.get_bool("Custom Box") then
                    render.draw_rect(box.x - 1, box.y - 1, box.w + 2, box.h + 2, color.new(0,0,0) )
                    render.draw_rect(box.x + 1, box.y + 1, box.w - 2, box.h - 2, color.new(0,0,0) )
                    render.draw_rect(box.x, box.y, box.w, box.h, color.new(menu.get_color("Custom Box Color"):r(),menu.get_color("Custom Box Color"):g(),menu.get_color("Custom Box Color"):b()) )
                end
                if menu.get_bool("Health Bar") then
                    render.draw_rect_filled(box.x - 7, box.y - 1, 4, box.h + 2, color.new(0,0,0,150) )
                    if not menu.get_bool("Revert Health Bar") then
                        if menu.get_bool("Health Bar Auto Color") then
                            render.draw_rect_filled( box.x - 6, box.y + box.h - (player:get_health() * box.h)/100, 2, (player:get_health() * box.h)/100, color.new(math.floor(player:get_health() - 100) * 150, 200, 60) )
                        else
                            render.draw_rect_filled( box.x - 6, box.y + box.h - (player:get_health() * box.h)/100, 2, (player:get_health() * box.h)/100, color.new(menu.get_color("Health Bar Color"):r(),menu.get_color("Health Bar Color"):g(),menu.get_color("Health Bar Color"):b()) )
                        end
                        
                        if player:get_health() < 94 then
                            render.draw_text_centered(fonts.sec, box.x - 4, box.y + box.h - (player:get_health() * box.h)/100 - 2, color.new(255,255,255), true, true, tostring(player:get_health()))
                        end
                    else
                        if menu.get_bool("Health Bar Auto Color") then
                            render.draw_rect_filled( box.x - 6, box.y, 2, (player:get_health() * box.h)/100, color.new(math.floor(player:get_health() - 100) * 150, 200, 60) )
                        else
                            render.draw_rect_filled( box.x - 6, box.y, 2, (player:get_health() * box.h)/100, color.new(menu.get_color("Health Bar Color"):r(),menu.get_color("Health Bar Color"):g(),menu.get_color("Health Bar Color"):b()) )
                        end
                        if player:get_health() < 94 then
                            render.draw_text_centered(fonts.sec, box.x - 4, box.y - 2, color.new(255,255,255), true, true, tostring(player:get_health()))
                        end
                    end
                    render.draw_rect( box.x - 7, box.y - 1, 4, (box.h + 2), color.new(0,0,0,150) )
                end
                if menu.get_bool("Name") then
                    render.draw_text(fonts.main, box.x + box.w/2 - render.get_text_width(fonts.main, engine.get_player_info(i).name)/2, box.y - 12, color.new(menu.get_color("Name Color"):r(),menu.get_color("Name Color"):g(),menu.get_color("Name Color"):b()), engine.get_player_info(i).name)
                end
                if menu.get_bool("Flags") then
                    local flags = {}
                    if player:has_helmet() and player:has_heavy_armor() then flags[1] = "HK" elseif player:has_heavy_armor() then flags[1] = "K" elseif player:has_helmet() then flags[1] = "H" end
                    if player:get_prop_float("DT_BasePlayer", "m_flDuckAmount") < 0.9 and player:get_prop_float("DT_BasePlayer", "m_flDuckAmount") > 0.5 then flags[#flags+1] = "FD" end
                    if player:is_scoped() then flags[#flags+1] = "ZOOM" end
                    if player:get_prop_int("DT_CSPlayer", "m_bIsDefusing") == 1 and player:get_prop_int("DT_CSPlayer", "m_bHasDefuser") then flags[#flags+1] = "DEF + KIT" elseif player:get_prop_int("DT_CSPlayer", "m_bIsDefusing") == 1 then flags[#flags+1] = "DEF" end
                    local offset = 0
                    for i = 1, #flags do
                        render.draw_text(fonts.sec, box.x + box.w + 2, box.y - 4 + offset, color.new(menu.get_color("Flags Color"):r(), menu.get_color("Flags Color"):g(), menu.get_color("Flags Color"):b()), flags[i])
                        offset = offset + 12
                    end
                end
                local between_icons = 0
                if menu.get_bool("Weapon Icon") and player ~= nil and entitylist.get_weapon_by_player(player) ~= nil then
                    local holding = entitylist.get_weapon_by_player(player):get_class_name()
                    if holding ~= nil and get_classes(holding) ~= nil and get_classes(holding).icon ~= nil then
                        render.draw_text(fonts.weapon, box.x + box.w/2 - render.get_text_width(fonts.weapon, get_classes(holding).icon)/2, box.y + box.h, color.new(menu.get_color("Weapon Icon Color"):r(),menu.get_color("Weapon Icon Color"):g(),menu.get_color("Weapon Icon Color"):b()), get_classes(holding).icon)
                        between_icons = 12
                    end 
                end
                if menu.get_bool("Weapon Text") and player ~= nil and entitylist.get_weapon_by_player(player) ~= nil then
                    local holding = entitylist.get_weapon_by_player(player):get_class_name()
                    if holding ~= nil and get_classes(holding).name ~= nil and get_classes(holding) ~= nil then
                        render.draw_text(fonts.sec, box.x + box.w/2 - render.get_text_width(fonts.main, get_classes(holding).name)/2, box.y + box.h + between_icons, color.new(menu.get_color("Weapon Text Color"):r(),menu.get_color("Weapon Text Color"):g(),menu.get_color("Weapon Text Color"):b()), get_classes(holding).name)
                    end
                end
                if menu.get_bool("Zeus warning") and player ~= nil and entitylist.get_weapon_by_player(player) ~= nil then
                    local holding = entitylist.get_weapon_by_player(player):get_class_name()
                    if holding ~= nil and get_classes(holding).name ~= nil and get_classes(holding) ~= nil and get_classes(holding).name == "Taser" then
                        render.draw_text(fonts.sec, box.x - 8 - render.get_text_width(fonts.main, get_classes(holding).name), box.y - 1, color.new(menu.get_color("in hand color"):r(),menu.get_color("in hand color"):g(),menu.get_color("in hand color"):b()), "Z")
                    else
                        render.draw_text(fonts.sec, box.x - 8 - render.get_text_width(fonts.main, get_classes(holding).name), box.y - 1, color.new(menu.get_color("zeus color"):r(),menu.get_color("zeus color"):g(),menu.get_color("zeus color"):b()), "Z")
                    end
                end
            end
        end
        ::continue::
    end
end

client.add_callback( "on_paint", function()
    set_esp()
end)
