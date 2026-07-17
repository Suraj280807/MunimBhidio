import os
from pydub import AudioSegment

vo1 = AudioSegment.from_mp3("vo1.mp3")
vo2 = AudioSegment.from_mp3("vo2.mp3")
vo3 = AudioSegment.from_mp3("vo3.mp3")

# Create a 100-second silent track
total_duration_ms = 100 * 1000
master = AudioSegment.silent(duration=total_duration_ms)

# Overlay the voiceovers at their exact timestamps in ms
master = master.overlay(vo1, position=0)
master = master.overlay(vo2, position=38000)
master = master.overlay(vo3, position=71500)

# Export the master track
master.export("vo_master.mp3", format="mp3")
print("Exported vo_master.mp3 successfully!")
