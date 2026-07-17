import os
import subprocess

vo2_1 = """Whether your customer sends a message..."""
vo2_2 = """Or records a voice note..."""
vo2_3 = """Shares a product image... Munim AI understands instantly. It identifies products. Checks inventory. Creates orders. Updates your dashboard. Tracks customers. Generates analytics. And helps your business respond faster than ever. All from a single WhatsApp conversation."""

edge_tts = r"C:\Users\Admin\AppData\Roaming\Python\Python312\Scripts\edge-tts.exe"
voice = "en-US-ChristopherNeural"

def gen(text, mp3, vtt):
    subprocess.run([edge_tts, "--voice", voice, "--text", text, "--write-media", mp3, "--write-subtitles", vtt, "--rate=-10%"])

gen(vo2_1, "vo2_1.mp3", "vo2_1.vtt")
gen(vo2_2, "vo2_2.mp3", "vo2_2.vtt")
gen(vo2_3, "vo2_3.mp3", "vo2_3.vtt")

print("Subtitles generated successfully.")
