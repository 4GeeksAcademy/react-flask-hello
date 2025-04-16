import datetime
import os.path
from flask import jsonify, request, Blueprint
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from .models import db, Appointments, Calendar, Users, Clients, Services, Businesses
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from dotenv import load_dotenv

load_dotenv()

calendar_api = Blueprint('calendar_api', __name__)

SCOPES = ["https://www.googleapis.com/auth/calendar"]


class GoogleCalendarManager:
    def __init__(self):
        """Initialize the class and get credentials."""
        self.creds = self.get_credentials()
        self.service = self.create_service() if self.creds else None

    def get_credentials(self):
        """Get and refresh credentials if necessary."""
        creds = None

        credentials_path = os.getenv("CREDENTIALS_PATH")
        token_path = os.getenv("TOKEN_PATH")

        print(f"Looking for credentials in: {credentials_path}")
        print(f"Looking for token in: {token_path}")

        if not os.path.exists(credentials_path):
            print(
                f"ERROR: The credentials file does not exist at {credentials_path}")
            return None

        if os.path.exists(token_path):
            print(f"Token found at {token_path}")
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        else:
            print(f"No token found at {token_path}")

        if not creds or not creds.valid:
            print("Invalid or non-existent credentials")
            if creds and creds.expired and creds.refresh_token:
                print("Refreshing expired credentials")
                try:
                    creds.refresh(Request())
                    print("Credentials refreshed successfully")
                except Exception as e:
                    print(f"Error refreshing credentials: {e}")
            else:
                print("Generating new credentials")
                try:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        credentials_path, SCOPES
                    )
                    flow.redirect_uri = 'urn:ietf:wg:oauth:2.0:oob'
                    auth_url, _ = flow.authorization_url(prompt='consent')
                    print(
                        f'Please visit this URL to authorize the application: {auth_url}')
                    code = input('Enter the authorization code: ')
                    flow.fetch_token(code=code)
                    creds = flow.credentials
                    print("New credentials generated successfully")

                except Exception as e:

                    print(f"Error generating new credentials: {e}")
                    return None

            os.makedirs(os.path.dirname(token_path), exist_ok=True)

            try:
                with open(token_path, "w") as token:
                    token.write(creds.to_json())
                print(f"Credentials saved at {token_path}")
            except Exception as e:
                print(f"Error saving credentials: {e}")

        return creds

    def create_service(self):
        """Create the Google Calendar service."""
        try:
            service = build("calendar", "v3", credentials=self.creds)
            print("Google Calendar service created successfully")
            return service
        except Exception as e:
            print(f"Error creating Google Calendar service: {e}")
            return None

    def get_upcoming_events(self, max_results=100, calendar_id="primary"):
        """Get upcoming events from Google Calendar."""
        if not self.service:
            return None

        try:
            now = datetime.datetime.now(
                tz=datetime.timezone.utc).isoformat()

            events_result = (
                self.service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=now,
                    maxResults=max_results,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )

            events = events_result.get("items", [])
            if not events:
                return []

            return events

        except HttpError as error:
            print(f"An error occurred: {error}")
            return None

    def create_event(self, title, description, start, end, location=None, extended_properties=None, calendar_id="primary"):
        """Create an event in Google Calendar."""
        if not self.service:
            return None

        event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': start,
                'timeZone': 'Europe/Madrid',
            },
            'end': {
                'dateTime': end,
                'timeZone': 'Europe/Madrid',
            },
        }

        if location:
            event['location'] = location

        if extended_properties:
            event['extendedProperties'] = extended_properties

        try:
            result = self.service.events().insert(
                calendarId=calendar_id, body=event).execute()
            return result
        except HttpError as error:
            print(f'An error occurred while creating the event: {error}')
            return None

    def update_event(self, event_id, updated_data, calendar_id="primary"):
        """Update an existing event in Google Calendar."""
        if not self.service:
            return None

        try:
            event = self.service.events().get(
                calendarId=calendar_id, eventId=event_id).execute()

            for key, value in updated_data.items():
                if key in ['start', 'end']:
                    if 'dateTime' in value:
                        event[key]['dateTime'] = value['dateTime']
                    if 'timeZone' in value:
                        event[key]['timeZone'] = value['timeZone']
                elif key == 'extendedProperties':
                    # Manejar específicamente extendedProperties
                    if 'extendedProperties' not in event:
                        event['extendedProperties'] = {}
                    if 'private' in value:
                        if 'private' not in event['extendedProperties']:
                            event['extendedProperties']['private'] = {}
                        for prop_key, prop_value in value['private'].items():
                            event['extendedProperties']['private'][prop_key] = prop_value
                else:
                    event[key] = value

            updated_event = self.service.events().update(
                calendarId=calendar_id, eventId=event_id, body=event
            ).execute()

            return updated_event

        except HttpError as error:
            print(f'An error occurred while updating the event: {error}')
            return None

    def delete_event(self, event_id, calendar_id="primary"):
        """Delete an event from Google Calendar."""
        if not self.service:
            return False

        try:
            self.service.events().delete(calendarId=calendar_id, eventId=event_id).execute()
            return True
        except HttpError as error:
            print(f'An error occurred while deleting the event: {error}')
            return False

# ----------------------------- Routes for Calendar API ---------------


@calendar_api.route('/calendar/events', methods=['GET'])
# @jwt_required()
def get_calendar_events():
    """Get upcoming events from Google Calendar."""

    business_id = request.args.get('business_id')

    calendar_manager = GoogleCalendarManager()

    if not calendar_manager.service:
        return jsonify({"error": "Could not initialize Google Calendar service"}), 500

    events = calendar_manager.get_upcoming_events(
        max_results=100)

    if events is None:
        return jsonify({"error": "Could not access Google Calendar"}), 500

    if business_id:
        filtered_events = []
        for event in events:
            if ('extendedProperties' in event and
                'private' in event['extendedProperties'] and
                'businessId' in event['extendedProperties']['private'] and
                    event['extendedProperties']['private']['businessId'] == business_id):
                filtered_events.append(event)

            elif ('description' in event and
                  f"Business ID: {business_id}" in event.get('description', '')):
                filtered_events.append(event)

        return jsonify(filtered_events), 200

    return jsonify(events), 200


@calendar_api.route('/calendar/sync', methods=['POST'])
# @jwt_required()
def sync_appointments_with_google():
    """Sync appointments from the database with Google Calendar."""

    data = request.get_json(silent=True) or {}
    business_id = data.get('business_id')

    calendar_manager = GoogleCalendarManager()

    if not calendar_manager.service:
        return jsonify({"error": "Could not initialize Google Calendar service"}), 500

    query = Appointments.query.filter_by(status="pending")

    if business_id:
        query = query.filter_by(business_id=business_id)

    pending_appointments = query.all()
    synced_appointments = []

    for appointment in pending_appointments:
        existing_calendar = Calendar.query.filter_by(
            appointment_id=appointment.id).first()

        if not existing_calendar:
            client = Clients.query.get(appointment.client_id)
            user = Users.query.get(appointment.user_id)
            service = Services.query.get(appointment.service_id)

            business = Businesses.query.get(appointment.business_id)
            business_name = business.business_name if business else "Unknown Business"

            if not client or not user or not service:
                continue

            title = f"Appointment: {client.name} - {service.name}"
            description = f"""
                Client: {client.name}
                Email: {client.email}
                Service: {service.name}
                Attended by: {user.username}
                Status: {appointment.status}
                Business: {business_name}
                Business ID: {appointment.business_id}
            """

            start = appointment.date_time.isoformat()
            end = (appointment.date_time +
                   datetime.timedelta(hours=1)).isoformat()

            extended_properties = {
                'private': {
                    'businessId': str(appointment.business_id),
                    'appointmentId': str(appointment.id)
                }
            }

            event = calendar_manager.create_event(
                title=title,
                description=description,
                start=start,
                end=end,
                extended_properties=extended_properties 
            )

            if event:
                new_calendar = Calendar(
                    appointment_id=appointment.id,
                    start_date_time=appointment.date_time,
                    end_date_time=appointment.date_time +
                    datetime.timedelta(hours=1),
                    google_event_id=event['id'],
                    business_id=appointment.business_id, 
                    last_sync=datetime.datetime.now()
                )

                try:
                    db.session.add(new_calendar)
                    db.session.commit()
                    synced_appointments.append({
                        "appointment_id": appointment.id,
                        "event_id": event['id'],
                        "title": event['summary'],
                        "business_id": appointment.business_id
                    })
                except Exception as e:
                    db.session.rollback()
                    print(f"Error saving to Calendar table: {e}")

    return jsonify({
        "msg": f"{len(synced_appointments)} appointments synchronized with Google Calendar",
        "synced_appointments": synced_appointments
    }), 200


@calendar_api.route('/calendar/appointments/<int:appointment_id>', methods=['POST'])
# @jwt_required()
def create_event_for_appointment(appointment_id):
    """Create a Google Calendar event for a specific appointment."""
    appointment = Appointments.query.get(appointment_id)

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    existing_calendar = Calendar.query.filter_by(
        appointment_id=appointment.id).first()
    if existing_calendar:
        return jsonify({"error": "This appointment already has an associated event in Google Calendar"}), 400

    client = Clients.query.get(appointment.client_id)
    user = Users.query.get(appointment.user_id)
    service = Services.query.get(appointment.service_id)
    business = Businesses.query.get(appointment.business_id)
    business_name = business.name if business else "Unknown Business"

    if not client or not user or not service:
        return jsonify({"error": "Could not get all information associated with the appointment"}), 404

    title = f"Appointment: {client.name} - {service.name}"
    description = f"""
        Client: {client.name}
        Email: {client.email}
        Service: {service.name}
        Attended by: {user.username}
        Status: {appointment.status}
        Business: {business_name}
        Business ID: {appointment.business_id}
    """

    start = appointment.date_time.isoformat()
    end = (appointment.date_time + datetime.timedelta(hours=1)).isoformat()

    extended_properties = {
        'private': {
            'businessId': str(appointment.business_id),
            'appointmentId': str(appointment.id)
        }
    }

    calendar_manager = GoogleCalendarManager()

    if not calendar_manager.service:
        return jsonify({"error": "Could not initialize Google Calendar service"}), 500

    event = calendar_manager.create_event(
        title=title,
        description=description,
        start=start,
        end=end,
        extended_properties=extended_properties  # Añadir extended properties
    )

    if not event:
        return jsonify({"error": "Could not create event in Google Calendar"}), 500

    new_calendar = Calendar(
        appointment_id=appointment.id,
        start_date_time=appointment.date_time,
        end_date_time=appointment.date_time + datetime.timedelta(hours=1),
        google_event_id=event['id'],
        business_id=appointment.business_id,  # Guardar business_id en la tabla Calendar
        last_sync=datetime.datetime.now()
    )

    try:
        db.session.add(new_calendar)
        db.session.commit()

        return jsonify({
            "msg": "Event created successfully in Google Calendar",
            "event": {
                "id": event['id'],
                "title": event.get('summary', ''),
                "link": event.get('htmlLink', ''),
                "business_id": appointment.business_id
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error saving to database: {str(e)}"}), 500


@calendar_api.route('/calendar/events/<int:appointment_id>', methods=['PUT'])
# @jwt_required()
def update_appointment_event(appointment_id):
    """Update a Google Calendar event when an appointment is updated."""
    appointment = Appointments.query.get(appointment_id)

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    calendar = Calendar.query.filter_by(appointment_id=appointment.id).first()
    if not calendar:
        return jsonify({"error": "This appointment does not have an associated event in Google Calendar"}), 404

    client = Clients.query.get(appointment.client_id)
    user = Users.query.get(appointment.user_id)
    service = Services.query.get(appointment.service_id)
    business = Businesses.query.get(appointment.business_id)
    business_name = business.name if business else "Unknown Business"

    if not client or not user or not service:
        return jsonify({"error": "Could not get all information associated with the appointment"}), 404

    updated_data = {
        'summary': f"Appointment: {client.name} - {service.name}",
        'description': f"""
            Client: {client.name}
            Email: {client.email}
            Service: {service.name}
            Attended by: {user.username}
            Status: {appointment.status}
            Business: {business_name}
            Business ID: {appointment.business_id}
        """,
        'start': {
            'dateTime': appointment.date_time.isoformat(),
            'timeZone': 'Europe/Madrid',
        },
        'end': {
            'dateTime': (appointment.date_time + datetime.timedelta(hours=1)).isoformat(),
            'timeZone': 'Europe/Madrid',
        },
        'extendedProperties': {
            'private': {
                'businessId': str(appointment.business_id),
                'appointmentId': str(appointment.id)
            }
        }
    }

    calendar_manager = GoogleCalendarManager()

    if not calendar_manager.service:
        return jsonify({"error": "Could not initialize Google Calendar service"}), 500

    updated_event = calendar_manager.update_event(
        event_id=calendar.google_event_id,
        updated_data=updated_data
    )

    if not updated_event:
        return jsonify({"error": "Could not update event in Google Calendar"}), 500

    try:
        calendar.last_sync = datetime.datetime.now()
        # Actualizar business_id en la tabla Calendar
        calendar.business_id = appointment.business_id
        db.session.commit()

        return jsonify({
            "msg": "Event updated successfully in Google Calendar",
            "event": {
                "id": updated_event['id'],
                "title": updated_event['summary'],
                "link": updated_event.get('htmlLink', ''),
                "business_id": appointment.business_id
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error updating database: {str(e)}"}), 500


@calendar_api.route('/calendar/events/<int:appointment_id>', methods=['DELETE'])
# @jwt_required()
def delete_appointment_event(appointment_id):
    """Delete a Google Calendar event when an appointment is deleted."""
    # Look for the record in the Calendar table
    calendar = Calendar.query.filter_by(appointment_id=appointment_id).first()
    if not calendar:
        return jsonify({"error": "This appointment does not have an associated event in Google Calendar"}), 404

    calendar_manager = GoogleCalendarManager()

    if not calendar_manager.service:
        return jsonify({"error": "Could not initialize Google Calendar service"}), 500

    success = calendar_manager.delete_event(
        event_id=calendar.google_event_id)

    if not success:
        return jsonify({"error": "Could not delete event from Google Calendar"}), 500

    try:
        db.session.delete(calendar)
        db.session.commit()

        return jsonify({
            "msg": "Event deleted successfully from Google Calendar"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error deleting from database: {str(e)}"}), 500


print("Initializing GoogleCalendarManager...")
calendar = GoogleCalendarManager()
if calendar.service:
    print("✅ Google Calendar service initialized correctly")
else:
    print("❌ Error initializing Google Calendar service")
