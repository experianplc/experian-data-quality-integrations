#!/bin/bash

python -m SimpleHTTPServer &
pid=$!
npx intern
kill $pid
