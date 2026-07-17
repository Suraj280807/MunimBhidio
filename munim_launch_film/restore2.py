import os
import re

log_path = r"C:\Users\Admin\.gemini\antigravity\brain\109cc602-1282-4abd-a40c-fed621b0015c\.system_generated\logs\overview.txt"

if not os.path.exists(log_path):
    print("Previous log not found.")
else:
    with open(log_path, "r", encoding="utf-8") as f:
        content = f.read()

    html_pattern = r"File Path: `file:///d:/wedding%20all/Wedding%20Photos/13.12.25%20Dr.Pruthavi/CADID/Twilo/munim_launch_film/index\.html`.*?The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>\. Please note that any changes targeting the original code should remove the line number, colon, and leading space\.(.*?)The above content shows the entire, complete file contents"
    
    js_pattern = r"File Path: `file:///d:/wedding%20all/Wedding%20Photos/13.12.25%20Dr.Pruthavi/CADID/Twilo/munim_launch_film/film\.js`.*?The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>\. Please note that any changes targeting the original code should remove the line number, colon, and leading space\.(.*?)The above content shows the entire, complete file contents"

    def clean_and_save(pattern, filepath):
        # Using findall to get all matches, then we'll take the FIRST one (original state of that session)
        matches = re.findall(pattern, content, re.DOTALL)
        if not matches:
            print(f"Failed to find original content for {filepath}")
            return
        
        raw_text = matches[0].strip()
        cleaned_lines = []
        for line in raw_text.split('\n'):
            line_match = re.match(r"^\d+:\s(.*)$", line)
            if line_match:
                cleaned_lines.append(line_match.group(1))
            else:
                empty_match = re.match(r"^\d+:$", line.strip())
                if empty_match:
                    cleaned_lines.append("")
                else:
                    cleaned_lines.append(line)
                    
        with open(filepath, "w", encoding="utf-8") as out_f:
            out_f.write('\n'.join(cleaned_lines))
        print(f"Successfully restored {filepath} from previous session.")

    clean_and_save(html_pattern, r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\index.html")
    clean_and_save(js_pattern, r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\film.js")
