Get-ChildItem -Path $StartPath -Directory -Recurse |
    Where-Object {
        $_.Name -match '^Action\d+$'
    } |
    Where-Object {
        -not (Test-Path (Join-Path $_.FullName 'Script.mts'))
    } |
    Select-Object -ExpandProperty FullName