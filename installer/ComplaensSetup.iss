#define MyAppName "АНТИКОР ДАСТУР ИЭС АЖ"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Sirdaryo IES"
#define MyAppExeName "AntikorsdasturIES.exe"
#define MyAppSource "C:\Users\Администратор\ies-projects\complaens\Complaens-win32-x64"

[Setup]
AppId={{F5FD5F1A-D70A-4D80-A5A0-878AB2D1AF4D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
OutputDir=C:\Users\Администратор\ies-projects\complaens\dist
OutputBaseFilename=Complaens-Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
ArchitecturesInstallIn64BitMode=x64compatible

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"; Flags: unchecked

[Files]
Source: "{#MyAppSource}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch {#MyAppName}"; Flags: nowait postinstall skipifsilent
