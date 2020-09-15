// ByCat#7797

UI.AddMultiDropdown("Indicators", ["Name", "SLOW", "DT", "INVERT", "FD", "SP", "BAIM", "HS", "AUTO PEEK", "Triggerbot"]);
UI.AddCheckbox("Shadow");
UI.AddCheckbox("Outline");
UI.AddSliderInt("X", 0, 15)
UI.AddSliderInt("Y", 100, Global.GetScreenSize()[1] - 80);
UI.AddSliderInt("Distance (recommended 45)", 25, 50)

function getDropdownValue(value, index) {
    var mask = 1 << index;
    return value & mask ? true : false;
}

function indicator() {
	var items = (UI.GetValue("Script items", "Indicators")).toString(2).split("").reverse().map(Number);
	const x = UI.GetValue("Script items", "X");
	const y = UI.GetValue("Script items", "Y");
	var dist = UI.GetValue("Script items", "Distance (recommended 45)");
	var list = [];

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
		if (UI.IsHotkeyActive("Rage", "General", "General", "Safe point override")) {
			list.push(6)
		}
	}
	if (items[7]) {
		if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Force body aim")) {
			list.push(7)
		}
	}
	if (items[8]) {
		if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
			list.push(8)
		}
	}
	if (items[9]) {
		if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
			list.push(9)
		}
	}

	for (index = 0; index < list.length; ++index) {
		if(list[index] == 1) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "SLOW", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "SLOW", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 2) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "DT", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "DT", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 3) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "Invert", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "Invert", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 4) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "FD", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "FD", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 5) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "HS", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "HS", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 6) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "SP", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "SP", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 7) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "BAIM", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "BAIM", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 8) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "PEEK", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "PEEK", [ 38, 255, 38, 255 ] , 4);
		}
		if(list[index] == 9) {
			if (UI.GetValue("Script items", "Shadow") == true) {
				Render.GradientRect( x - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 0 ], [ 0, 0, 0, 150 ]);
				Render.GradientRect( (x + 20) - 10, (y + 4) - (index * dist), 20, 30, 1, [ 0, 0, 0, 150 ], [ 0, 0, 0, 0 ]);
			}
			if (UI.GetValue("Script items", "Outline") == true) { Render.String( x - 1, (y + 1) - (index * dist), 0, "Trigger", [ 0, 0, 0, 180 ] , 4); }
			Render.String( x, y - (index * dist), 0, "Trigger", [ 38, 255, 38, 255 ] , 4);
		}
	}
}
Cheat.RegisterCallback("Draw","indicator")
