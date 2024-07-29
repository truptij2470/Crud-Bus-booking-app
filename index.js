document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const bookingList = document.getElementById('bookingList');
    const busFilter = document.getElementById('filter');

    const bookings = [];

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const bus = document.getElementById('bus').value;

        const booking = { name, email, phone, bus };
        bookings.push(booking);
        displayBookings();
        bookingForm.reset();
    });

    busFilter.addEventListener('change', displayBookings);

    function displayBookings() {
        bookingList.innerHTML = '';
        const filter = busFilter.value;
        const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.bus === filter);

        filteredBookings.forEach((booking, index) => {
            const li = document.createElement('li');
            li.textContent = `Name: ${booking.name}, Email: ${booking.email}, Phone: ${booking.phone}, Bus: ${booking.bus}`;
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editBooking(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBooking(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            bookingList.appendChild(li);
        });
    }

    function editBooking(index) {
        const booking = bookings[index];
        document.getElementById('name').value = booking.name;
        document.getElementById('email').value = booking.email;
        document.getElementById('phone').value = booking.phone;
        document.getElementById('bus').value = booking.bus;

        bookings.splice(index, 1);
        displayBookings();
    }

    function deleteBooking(index) {
        bookings.splice(index, 1);
        displayBookings();
    }
});
