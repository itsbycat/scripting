// ByCat#7797 - Forum aimsense.pw
UI.AddMultiDropdown("Indicators", ["FAKE", "SLOW", "DT", "INVERT", "FD", "HS", "SP", "BAIM", "AUTO PEEK", "Triggerbot"]);
UI.AddCheckbox("Shadow");
UI.AddCheckbox("Outline");
UI.AddSliderInt("X", 0, 15)
UI.AddSliderInt("Y", 100, Global.GetScreenSize()[1] - 80);
UI.AddSliderInt("Distance (recommended 45)", 25, 50)

function getDropdownValue(value, index) {
    var mask = 1 << index;
    return value & mask ? true : false;
}

function normalize_yaw(angle)
{
    var adjusted_yaw = angle;

    if (adjusted_yaw < -180)
        adjusted_yaw += 360;

    if (adjusted_yaw > 180)
        adjusted_yaw -= 360;

    return adjusted_yaw;
}

function indicator() {
	var items = (UI.GetValue("Script items", "Indicators")).toString(2).split("").reverse().map(Number);
	const x = UI.GetValue("Script items", "X");
	const y = UI.GetValue("Script items", "Y");
	var dist = UI.GetValue("Script items", "Distance (recommended 45)");
	var list = [];

	const yaw = Local.GetRealYaw(), fake = Local.GetFakeYaw();
    var delta = Math.round(normalize_yaw(yaw - fake) / 2), abs = Math.abs(delta);

	if (items[0]) {
		if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Enabled") == true) {
			list.push(0)
		}
		else if (UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled") == true) {
			list.push(0)
		}
	}

	if (items[1]) {
		if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
			list.push(1)
		}
	}

	if (items[2]) {
		if (UI.IsHotkeyActive("Rage", "Exploits", "Doubletap")) {
			list.push(2)
		}
	}

	if (items[3]) {
		if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
			list.push(3)
		}
	}

	if (items[4]) {
		if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
			list.push(4)
		}
	}
	if (items[5]) {
		if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
			list.push(5)
		}
	}
	if (items[6]) {
		if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force safe point")) {
			list.push(6)
		}
	}
	if (items[7]) {
		if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
			list.push(7)
		}
	}
	if (items[8]) {
		if (UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek")) {
			list.push(8)
		}
	}
	if (items[9]) {
		if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
			list.push(9)
		}
	}

	for (index = 0; index < list.length; ++index) {
		if(list[index] == 0) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "FAKE", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "FAKE", [192 - (abs * 71 / 60), 32 + (abs * 146 / 60), 28, 200], 4);
		}
		if(list[index] == 1) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "SLOW", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "SLOW", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 2) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "DT", [ 0, 0, 0, 180 ] , 4); }
			chargestate = Exploit.GetCharge()
			if(chargestate == 1) {
				Render.String( x, y - (index * dist), 0, "DT", [ 255, 255, 255, 255 ] , 4);
			}
			else {
				Render.String( x, y - (index * dist), 0, "DT", [ 255, 0, 0, 255 ] , 4);
			}
		}
		if(list[index] == 3) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "Invert", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "Invert", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 4) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "FD", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "FD", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 5) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "HS", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "HS", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 6) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "SP", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "SP", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 7) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "BAIM", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "BAIM", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 8) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "PEEK", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "PEEK", [ 255, 255, 255, 255 ] , 4);
		}
		if(list[index] == 9) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 180 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 180 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "Trigger", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "Trigger", [ 255, 255, 255, 255 ] , 4);
		}
	}
}
Cheat.RegisterCallback("Draw","indicator")
