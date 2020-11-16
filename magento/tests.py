import subprocess
import sys

simple_server = subprocess.Popen(["python", "-m", "SimpleHTTPServer"], close_fds=True)
tests = subprocess.Popen("npx intern", shell=True)
tests.communicate()
simple_server.kill()
sys.exit(tests.returncode)
