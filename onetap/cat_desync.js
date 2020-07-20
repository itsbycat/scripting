UI.AddCheckbox("[CatDesync] Enable"); //i know to enable button already have from other js
UI.AddHotkey("Invert AA");

function bycat() { // Disable fakelag because jitter aa ¯\_(ツ)_/¯
	if(UI.GetValue("Script items", "[CatDesync] Enable") == false) return; // very usefull code

	AntiAim.SetOverride(1); // weird onetap
	
	if(UI.IsHotkeyActive("Script Items", "Invert AA") == true) {
		if(UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset") == 30) {
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90);
			AntiAim.SetLBYOffset(-50);
			AntiAim.SetRealOffset(-58);
		}
		else {
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 30);
			AntiAim.SetLBYOffset(50);
			AntiAim.SetRealOffset(58);
		}
	}
	else {
		if(UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset") == -30) {
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90);
			AntiAim.SetLBYOffset(50);
			AntiAim.SetRealOffset(58);
		}
		else {
			UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -30);
			AntiAim.SetLBYOffset(-50);
			AntiAim.SetRealOffset(-58);
		}
	}
}
Cheat.RegisterCallback("Draw", "bycat");

function bye() {
	AntiAim.SetOverride(0);
	Cheat.PrintColor( [ 255, 0, 115, 255 ], "[ aimsense ] CatDesync lua unloaded \n" );
}
Cheat.RegisterCallback("Unload", "bye");

// Dont remove :(
Cheat.PrintColor( [ 255, 0, 155, 255 ], "[ aimsense ] If you have question discord: ByCat#7797 \n" );
Cheat.PrintColor( [ 255, 0, 155, 255 ], "[ aimsense ] Thank you to aze.exe \n" );
Cheat.PrintColor( [ 255, 0, 155, 255 ], "[ aimsense ] unban me from onetap \n" );

// https://i.imgur.com/sCSLhcA.png
// https://i.imgur.com/ndNmRX0.png
// :( F