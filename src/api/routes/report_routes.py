from flask import request
import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from ..models.models import db, Report
from datetime import datetime
from flask import make_response


report_routes = Blueprint("report_routes", __name__)


@report_routes.route('/upload_report', methods=['POST'])
def upload_report():
    file = request.files.get('file')
    user_id = request.form.get('user_id')
    field_id = request.form.get('field_id')
    title = request.form.get('title', '')  # ← asegurate que esté esto
    description = request.form.get('description', '')

    # Validación básica
    if not file or not user_id or not field_id:
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    # Guardar archivo
    filename = secure_filename(file.filename)
    upload_folder = os.path.join(current_app.root_path, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    file.save(file_path)

    file_url = f'/uploads/{filename}'

    new_report = Report(
        title=title,  # ← esto también debe estar en el modelo y aquí
        file_name=filename,
        url=file_url,
        description=description,
        date=datetime.utcnow(),
        user_id=int(user_id),
        field_id=int(field_id)
    )

    db.session.add(new_report)
    db.session.commit()

    return jsonify({'message': 'Archivo subido correctamente', 'report': new_report.serialize_report()})


@report_routes.route('/user_reports/<int:user_id>', methods=['GET'])
def get_user_reports(user_id):
    reports = Report.query.filter_by(
        user_id=user_id).order_by(Report.date.desc()).all()
    return jsonify([r.serialize_report() for r in reports])


@report_routes.route('/delete/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    report = Report.query.get(report_id)
    if not report:
        return jsonify({"error": "Informe no encontrado"}), 404

    # eliminar el archivo físico (opcional pero recomendable)
    file_path = os.path.join(current_app.root_path, report.url.strip('/'))
    if os.path.exists(file_path):
        os.remove(file_path)

    db.session.delete(report)
    db.session.commit()
    return jsonify({"message": "Informe eliminado"}), 200


@report_routes.route('/uploads/<path:filename>', methods=['GET'])
def serve_uploaded_file(filename):
    upload_folder = os.path.join(current_app.root_path, 'uploads')
    file_path = os.path.join(upload_folder, filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "Archivo no encontrado"}), 404

    response = make_response(send_from_directory(upload_folder, filename))

    # ✅ Mostrar en el navegador en lugar de descargar
    response.headers["Content-Disposition"] = f"inline; filename={filename}"

    return response
