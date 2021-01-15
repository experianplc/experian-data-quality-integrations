import glob
import os
import re

# Get all TypeScript files
ts_files = glob.glob("src/**/*.ts", recursive=True)
d_ts_files = glob.glob("src/**/*.d.ts", recursive=True)
files = set(ts_files) - set(d_ts_files)

for file in files:
    newFile = file.replace("src", "lib").replace(".ts", ".js")
    os.system(f"npx webpack --config config.js --output {newFile} {file}")
    # Update the first line for coverage purposes
    newLine = "(function(e, a) { /* istanbul ignore next */ for(var i in a) e[i] = a[i]; }(this, (/* istanbul ignore next */ function(modules) { // webpackBootstrap"
    os.system(f"sed -i '1s/.*/{re.escape(newLine)}/' {newFile}")
