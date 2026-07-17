Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("logo.png")
$bmp.MakeTransparent([System.Drawing.Color]::White)
$bmp.Save("logo_transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
