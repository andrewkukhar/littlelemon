import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ onBooking }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = e => {
        axios.post('/bookings', { date, time, people })
            .then(res => setMessage(res.data.message))
            .catch(err => setError(err.response.data.error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date:
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <br />
            <label>
                Time:
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </label>
            <br />
            <label>
                Number of people:
                <input type="number" value={people} onChange={e => setPeople(e.target.value)} />
            </label>
            <br />
            <button type="submit">Book</button>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </form>
    );
}

export default BookingForm;