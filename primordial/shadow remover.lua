local shadows = {
    cvars.cl_csm_static_prop_shadows,
    cvars.cl_csm_shadows,
    cvars.cl_csm_world_shadows,
    cvars.cl_foot_contact_shadows,
    cvars.cl_csm_viewmodel_shadows,
    cvars.cl_csm_rope_shadows,
    cvars.cl_csm_sprite_shadows,
    cvars.r_shadows
}

local def = { 1, 1, 1, 0, 1, 1, 1, 1 }

for i = 1, #shadows do shadows[i]:set_int( 0 ) end
callbacks.add(e_callbacks.SHUTDOWN, function() for i = 1, #shadows do shadows[i]:set_int( def[i] ) end end)
