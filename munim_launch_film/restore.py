import os
import re

log_path = r"C:\Users\Admin\.gemini\antigravity\brain\8c4d1430-ad8c-4502-b481-803c53525131\.system_generated\logs\overview.txt"

with open(log_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the first occurrence of view_file for index.html
html_pattern = r"File Path: `file:///d:/wedding%20all/Wedding%20Photos/13.12.25%20Dr.Pruthavi/CADID/Twilo/munim_launch_film/index\.html`.*?The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>\. Please note that any changes targeting the original code should remove the line number, colon, and leading space\.(.*?)The above content shows the entire, complete file contents"

js_pattern = r"File Path: `file:///d:/wedding%20all/Wedding%20Photos/13.12.25%20Dr.Pruthavi/CADID/Twilo/munim_launch_film/film\.js`.*?The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>\. Please note that any changes targeting the original code should remove the line number, colon, and leading space\.(.*?)The above content shows the entire, complete file contents"

def clean_and_save(pattern, filepath):
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"Failed to find original content for {filepath}")
        return
    
    raw_text = match.group(1).strip()
    # Remove the '1: ' line numbers
    cleaned_lines = []
    for line in raw_text.split('\n'):
        # Match '123: content'
        line_match = re.match(r"^\d+:\s(.*)$", line)
        if line_match:
            cleaned_lines.append(line_match.group(1))
        else:
            # If a line is empty, it might just be '123:'
            empty_match = re.match(r"^\d+:$", line.strip())
            if empty_match:
                cleaned_lines.append("")
            else:
                cleaned_lines.append(line)
                
    with open(filepath, "w", encoding="utf-8") as out_f:
        out_f.write('\n'.join(cleaned_lines))
    print(f"Successfully restored {filepath}")

clean_and_save(html_pattern, r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\index.html")
clean_and_save(js_pattern, r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\film.js")
