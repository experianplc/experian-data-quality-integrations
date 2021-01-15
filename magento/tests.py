import subprocess
import sys

# Instrument all of the code
nyc_instrument = subprocess.Popen([
    "npx", 
    "nyc", 
    "--nycrc-path", 
    "magento/.nycrc.json",
    "instrument",
    "lib",
    "instrumented"
], shell=True)

# Start simple server
simple_server = subprocess.Popen(["python", "-m", "SimpleHTTPServer"], close_fds=True)

# Run tests 
tests = subprocess.Popen("npx intern grep=123", shell=True)

# Close subprocess stdin with communicate and read output
tests.communicate()

simple_server.kill()

# Show code coverage
sys.exit(tests.returncode)
