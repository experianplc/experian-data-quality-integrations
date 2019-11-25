import glob
import os
import re

# Get all TypeScript files
ts_files = glob.glob("src/9.2/**/*.ts", recursive=True)
d_ts_files = glob.glob("src/9.2/**/*.d.ts", recursive=True)
files = set(ts_files) - set(d_ts_files)

for file in files:
    newFile = file.replace("src", "lib").replace(".ts", ".js")
    os.system(f"npx webpack --config config.js --output {newFile} {file}")

