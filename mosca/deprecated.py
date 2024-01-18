from threading import Thread
from queue import Queue


def enqueue_output(out, queue):
    for line in iter(out.readline, b''):
        queue.put(line)
    out.close()


def run_command_with_logs(command, stdout_file='out.log', stderr_file='err.log'):
    """
    Run a command with subprocess and capture output in real-time, for stdout and stderr, to two different files.
    This function is not working properly, the command does not run.
    :param command: command to run
    :param stdout_file: file to write stdout to
    :param stderr_file: file to write stderr to
    """
    stdout_file = open(stdout_file, 'w')
    stderr_file = open(stderr_file, 'w')
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1)
    # Create queues to store output
    stdout_queue = Queue()
    stderr_queue = Queue()
    # Start threads to capture stdout and stderr
    stdout_thread = Thread(target=enqueue_output, args=(process.stdout, stdout_queue))
    stderr_thread = Thread(target=enqueue_output, args=(process.stderr, stderr_queue))
    stdout_thread.start()
    stderr_thread.start()
    stdout_thread.join()
    stderr_thread.join()
    while not stdout_queue.empty():     # Write stdout and stderr from the queues to files
        stdout_line = stdout_queue.get()
        stdout_file.write(stdout_line)
        print(f"STDOUT: {stdout_line.strip()}")
    while not stderr_queue.empty():
        stderr_line = stderr_queue.get()
        stderr_file.write(stderr_line)
        print(f"STDERR: {stderr_line.strip()}")
    stdout_file.close()
    stderr_file.close()
    process.wait()                      # Wait for the process to complete
