from .connection import get_connection

def db_get_merged_report():
    conn = get_connection()
    # This query joins all three tables using assigned_doctor name and patient_id
    query = """
    SELECT 
        p.assigned_doctor AS doctor_name,
        d.specialization AS doctor_specialization,
        p.id AS patient_id,
        p.name AS patient_name,
        p.age AS patient_age,
        p.gender AS patient_gender,
        b.amount AS bill_amount,
        b.bill_date AS bill_date
    FROM billing b
    JOIN patients p ON b.patient_id = p.id
    LEFT JOIN doctors d ON p.assigned_doctor = d.name
    ORDER BY b.bill_date DESC
    """
    try:
        rows = conn.execute(query).fetchall()
        return [dict(r) for r in rows]
    except Exception as e:
        print(f"REPORT QUERY ERROR: {e}")
        return []
    finally:
        conn.close()