import json
import re

log_path = r"C:\Users\Admin\.gemini\antigravity\brain\109cc602-1282-4abd-a40c-fed621b0015c\.system_generated\logs\overview.txt"

def restore_from_log(filepath, file_key):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                # Check if it's a tool response for view_file
                if data.get("type") == "PLANNER_RESPONSE" and "tool_responses" in data:
                    for resp in data["tool_responses"]:
                        if resp.get("name") == "view_file" and "output" in resp:
                            output = resp["output"]
                            if file_key in output:
                                # Extract the content
                                match = re.search(r"The following code has been modified.*?leading space\.(.*?)The above content", output, re.DOTALL)
                                if match:
                                    raw_text = match.group(1).strip()
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
            except Exception as e:
                pass
    print(f"Failed to find {filepath}")
    return False

restore_from_log(r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\index.html", "index.html")
restore_from_log(r"d:\wedding all\Wedding Photos\13.12.25 Dr.Pruthavi\CADID\Twilo\munim_launch_film\film.js", "film.js")
