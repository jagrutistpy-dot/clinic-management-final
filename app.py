# Starts the API server and initializes the database
import os
from http.server import ThreadingHTTPServer
from router import ClinicRouter
from database.connection import init_database

def run_server():
    init_database()
    server = ThreadingHTTPServer(("", 8000), ClinicRouter)
    print("Clinic Management Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()
