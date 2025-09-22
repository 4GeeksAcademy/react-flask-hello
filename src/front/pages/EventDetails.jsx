
const defaultEvent = {
    title: "Sample Event",
    date: "2025-10-01",
    location: "Main Hall",
    rsvp: 12,
    description: "A simple event for demonstration.",
    agenda: [
        { time: "10:00 AM", activity: "Welcome & Registration" },
        { time: "11:00 AM", activity: "Keynote Speech" }
    ],
    attendees: ["Alice", "Bob", "Charlie"],
    poll: { question: "Favorite session?", options: ["Keynote", "Workshop"], votes: [2, 3] }
};

const EventDetails = ({ event = defaultEvent }) => {
    const [agenda, setAgenda] = useState(event.agenda);
    const [newAgenda, setNewAgenda] = useState({ time: "", activity: "" });
    const [attendees, setAttendees] = useState(event.attendees);
    const [poll, setPoll] = useState(event.poll);

    // Agenda handlers
    const addAgenda = () => {
        if (newAgenda.time && newAgenda.activity) {
            setAgenda([...agenda, newAgenda]);
            setNewAgenda({ time: "", activity: "" });
        }
    };
    const deleteAgenda = idx => setAgenda(agenda.filter((_, i) => i !== idx));

    // RSVP handler (simulate adding attendee)
    const addAttendee = name => {
        if (name) setAttendees([...attendees, name]);
    };

    // Poll voting
    const vote = idx => {
        const newVotes = poll.votes.map((v, i) => (i === idx ? v + 1 : v));
        setPoll({ ...poll, votes: newVotes });
    };

    return (
        <div className="event-details-container">
            <div className="event-details-card">
                <h2>{event.title}</h2>
                <div className="event-details-info">
                    <p><FontAwesomeIcon icon={faCalendarAlt} /> {event.date}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}</p>
                    <p><FontAwesomeIcon icon={faUsers} /> RSVPs: {attendees.length}</p>
                    <p><FontAwesomeIcon icon={faInfoCircle} /> {event.description}</p>
                </div>
                <hr className="event-details-divider" />
                {/* Agenda Section */}
                <section className="event-section">
                    <h3>Agenda / Schedule</h3>
                    <ul>
                        {agenda.map((item, idx) => (
                            <li key={idx}>
                                <span>{item.time} - {item.activity}</span>
                                <button className="event-details-btn" onClick={() => deleteAgenda(idx)}><FontAwesomeIcon icon={faTrash} /></button>
                            </li>
                        ))}
                    </ul>
                    <div className="event-details-inputs">
                        <input className="signup-input" placeholder="Time" value={newAgenda.time} onChange={e => setNewAgenda({ ...newAgenda, time: e.target.value })} />
                        <input className="signup-input" placeholder="Activity" value={newAgenda.activity} onChange={e => setNewAgenda({ ...newAgenda, activity: e.target.value })} />
                        <button className="event-details-btn" onClick={addAgenda}><FontAwesomeIcon icon={faPlus} /> Add</button>
                    </div>
                </section>
                <hr className="event-details-divider" />
                {/* RSVP Section */}
                <section className="event-section">
                    <h3>Attendees / RSVP</h3>
                    <ul>
                        {attendees.map((name, idx) => <li key={idx}>{name}</li>)}
                    </ul>
                    <input className="signup-input" placeholder="Add attendee" onKeyDown={e => { if (e.key === "Enter") { addAttendee(e.target.value); e.target.value = ""; } }} />
                </section>
                <hr className="event-details-divider" />
                {/* Polling Section */}
                <section className="event-section">
                    <h3>Poll / Voting</h3>
                    <p>{poll.question}</p>
                    <div className="event-details-inputs">
                        {poll.options.map((opt, idx) => (
                            <button key={idx} className="event-details-btn" onClick={() => vote(idx)}>
                                {opt} ({poll.votes[idx]}) <FontAwesomeIcon icon={faPoll} />
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventDetails;
