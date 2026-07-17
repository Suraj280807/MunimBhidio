import sys

with open('film.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Scene 1 & 2 animations
content = content.replace("{ scale: 5, autoAlpha: 0, z: 1000 }", "{ scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }")
content = content.replace('{ scale: 1, autoAlpha: 1, z: 0, stagger: 0.02, duration: 0.4, ease: "expo.out" }', "{ scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }")

# Replace Scene 6 animations
content = content.replace("{ scale: 3, autoAlpha: 0, y: 20 }", "{ scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }")
content = content.replace('{ scale: 1, autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.5, ease: "expo.out" }', "{ scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }")

with open('film.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated animations.")
