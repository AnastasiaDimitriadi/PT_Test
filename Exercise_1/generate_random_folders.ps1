 #Requires -Version 7

$workingFolder = (Get-Item $PSCommandPath).Directory
$rootSampleName = "SAMPLE"

Set-Location $workingFolder
$rootSamplePath = Join-Path $workingFolder $rootSampleName
Remove-Item $rootSamplePath -Recurse -Force -ErrorAction SilentlyContinue

New-Item $rootSamplePath -ItemType Directory 
$rootSample = Get-Item $rootSamplePath

Set-Location $rootSample
# Get-ChildItem -Directory | Remove-Item -Recurse -Force

$aFolders = Get-Random -Minimum 10 -Maximum 50
for ($i = 0; $i -lt $aFolders; $i++) {
    $fName = -join ((65..90) + (97..122) | Get-Random -Count $(Get-Random -Minimum 7 -Maximum 20) | % { [char]$_ })
    New-Item -Name $fName -ItemType Directory
    
}

foreach ($aFolder in $(Get-ChildItem -Directory)) {
    
    $bFolders = Get-Random -Minimum 1 -Maximum 5
    for ($y = 0; $y -lt $bFolders; $y++) {
        $bFolder = Join-Path $aFolder "Action$($y)"
        New-Item $bFolder -ItemType Directory
    }

    foreach ($bFolder in Get-ChildItem $aFolder) {
        If ($(Get-Random -Minimum 0 -Maximum 100) -gt 50) {
            $cFile = Join-Path $bFolder.FullName "Script.mts"
            New-Item $cFile -ItemType File
        }

        for ($z = 0; $z -lt $(Get-Random -Minimum 2 -Maximum 10); $z++) {
            $randFileName = -join ((65..90) + (97..122) | Get-Random -Count $(Get-Random -Minimum 5 -Maximum 10) | % { [char]$_ })
            $randFile = Join-Path -Path $bFolder.FullName -ChildPath $randFileName
            New-Item "$($randFile).mts" -ItemType File
        }
    }
} 
