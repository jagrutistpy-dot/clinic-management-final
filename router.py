# router.py
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.patients import (
    get_all_patients, get_patient, create_patient, update_patient, delete_patient
)
from controllers.doctors import (
    get_all_doctors, get_doctor, create_doctor, update_doctor, delete_doctor
)
from controllers.billing import (
    get_all_bills, get_bill, create_bill, update_bill, delete_bill
)

from database.report_queries import db_get_merged_report
from core.responses import send_json, send_404
from core.static import serve_static
from core.middleware import add_cors_headers

FRONTEND_ROUTES = { "/", "/home", "/patients", "/doctors", "/billing", "/reports"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True
    return False

class ClinicRouter(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path).path
        if handle_ui_routes(self, parsed_path):
            return

        if parsed_path == "/api/patients": return get_all_patients(self)
        if parsed_path.startswith("/api/patients/"):
            return get_patient(self, int(parsed_path.split("/")[-1]))

        if parsed_path == "/api/doctors": return get_all_doctors(self)
        if parsed_path.startswith("/api/doctors/"):
            return get_doctor(self, int(parsed_path.split("/")[-1]))

        if parsed_path == "/api/billing": return get_all_bills(self)
        if parsed_path.startswith("/api/billing/"):
            return get_bill(self, int(parsed_path.split("/")[-1]))

        if parsed_path == "/api/reports":
            return send_json(self, 200, db_get_merged_report())

        return send_404(self)

    def do_POST(self):
        parsed_path = urlparse(self.path).path
        if parsed_path == "/api/patients": return create_patient(self)
        if parsed_path == "/api/doctors": return create_doctor(self)
        if parsed_path == "/api/billing": return create_bill(self)

    def do_PUT(self):
        parsed_path = urlparse(self.path).path
        if parsed_path.startswith("/api/patients/"):
            return update_patient(self, int(parsed_path.split("/")[-1]))
        if parsed_path.startswith("/api/doctors/"):
            return update_doctor(self, int(parsed_path.split("/")[-1]))
        if parsed_path.startswith("/api/billing/"):
            return update_bill(self, int(parsed_path.split("/")[-1]))
        return send_404(self)

    def do_DELETE(self):
        parsed_path = urlparse(self.path).path
        if parsed_path.startswith("/api/patients/"):
            return delete_patient(self, int(parsed_path.split("/")[-1]))
        if parsed_path.startswith("/api/doctors/"):
            return delete_doctor(self, int(parsed_path.split("/")[-1]))
        if parsed_path.startswith("/api/billing/"):
            return delete_bill(self, int(parsed_path.split("/")[-1]))
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [ClinicServer] {format % args}")