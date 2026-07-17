import os
import re
import json

log_path = r"C:\Users\Admin\.gemini\antigravity\brain\a236b1c2-0bf7-4f39-aa96-59ab7760301d\.system_generated\logs\overview.txt"

def restore_from_log(filepath, file_key):
    with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # We just want to find ANY view_file output for this file
    pattern = r"File Path: `file:///d:/wedding%20all/Wedding%20Photos/13.12.25%20Dr.Pruthavi/CADID/Twilo/munim_launch_film/" + file_key.replace('.', r'\.') + r"`.*?The following code has been modified.*?leading space\.(.*?)The above content"
    matches = re.findall(pattern, content, re.DOTALL)
    if matches:
        raw_text = matches[-1].strip() # get the LAST known state before the big UI redesign session
        cleaned_lines = []
        for l in raw_text.split('\n'):
            line_match = re.match(r"^\d+:\s(.*)$", l)
            if line_match:
                cleaned_lines.append(line_match.group(1))
            else:
                empty_match = re.match(r"^\d+:$", l.strip())
                if empty_match:
                    cleaned_lines.append("")
                else:
                    cleaned_lines.append(l)
        with open(filepath, "w", encoding="utf-8") as out_f:
            out_f.write('\n'.join(cleaned_lines))
        print(f"Successfully restored {filepath}")
        return True
    
    print(f"Failed to find {filepath}")
    return False

restore_from_log(r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\index.html", "index.html")
restore_from_log(r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\film.js", "film.js")
