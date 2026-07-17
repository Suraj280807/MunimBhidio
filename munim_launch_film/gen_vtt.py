import os
import subprocess

vo1 = """Every business hears the same questions... 'Is this available?' 'Can I reserve it?' 'Do you have another size?' Sometimes it's a message. Sometimes it's a photo. Sometimes it's a voice note. Customers don't search anymore... They simply ask. Presenting... Munim AI. One WhatsApp Number. Unlimited possibilities."""
vo2 = """Whether your customer sends a message... Shares a product image... Or records a voice note... Munim AI understands instantly. It identifies products. Checks inventory. Creates orders. Updates your dashboard. Tracks customers. Generates analytics. And helps your business respond faster than ever. All from a single WhatsApp conversation."""
vo3 = """Smarter conversations. Faster decisions. Happier customers. One intelligent assistant. One WhatsApp Number. Presenting... Munim AI. The future of AI-powered business."""

edge_tts = r"C:\Users\Admin\AppData\Roaming\Python\Python312\Scripts\edge-tts.exe"
voice = "en-US-ChristopherNeural"

def gen(text, mp3, vtt):
    subprocess.run([edge_tts, "--voice", voice, "--text", text, "--write-media", mp3, "--write-subtitles", vtt, "--rate=-10%"])

gen(vo1, "vo1.mp3", "vo1.vtt")
gen(vo2, "vo2.mp3", "vo2.vtt")
gen(vo3, "vo3.mp3", "vo3.vtt")
print("Subtitles generated successfully.")
