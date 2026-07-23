// Sample Local Database (Replace with Google Sheets API or database fetch call)
const mockDatabase = {
    "ATG-98765": {
        status: "In Transit",
        stepLevel: 2, // 1: Placed, 2: In Transit, 3: Out for Delivery, 4: Delivered
        edd: "July 28, 2026",
        origin: "Lagos, Nigeria",
        destination: "London, UK",
        weight: "14.5 kg",
        freight: "Air Freight",
        history: [
            { time: "2026-07-23 10:15", location: "Lagos Hub", detail: "Departed international sorting facility." },
            { time: "2026-07-22 16:30", location: "Ikeja Terminal", detail: "Customs clearance completed." },
            { time: "2026-07-21 09:00", location: "Lagos Depot", detail: "Consignment received and processed." }
        ]
    }
};

document.getElementById('trackingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const trackingId = document.getElementById('trackingIdInput').value.trim().toUpperCase();
    const errorMsg = document.getElementById('errorMessage');
    const resultsSection = document.getElementById('resultsSection');

    // Reset view state
    errorMsg.style.display = 'none';
    
    if (mockDatabase[trackingId]) {
        renderTrackingData(trackingId, mockDatabase[trackingId]);
        resultsSection.style.display = 'block';
    } else {
        resultsSection.style.display = 'none';
        errorMsg.textContent = "Tracking ID not found. Please verify and try again.";
        errorMsg.style.display = 'block';
    }
});

function renderTrackingData(id, data) {
    // Basic Details
    document.getElementById('displayTrackingId').textContent = id;
    document.getElementById('displayStatus').textContent = data.status;
    document.getElementById('displayEDD').textContent = data.edd;
    document.getElementById('displayOrigin').textContent = data.origin;
    document.getElementById('displayDestination').textContent = data.destination;
    document.getElementById('displayWeight').textContent = data.weight;
    document.getElementById('displayFreight').textContent = data.freight;

    // Progress Bar Calculation
    const progressPercents = [0, 0, 33, 66, 100];
    document.getElementById('progressBar').style.width = `${progressPercents[data.stepLevel]}%`;

    // Step Statuses
    for (let i = 1; i <= 4; i++) {
        const stepElem = document.getElementById(`step${i}`);
        if (i <= data.stepLevel) {
            stepElem.classList.add('active');
        } else {
            stepElem.classList.remove('active');
        }
    }

    // Activity Logs Table
    const tableBody = document.getElementById('historyTableBody');
    tableBody.innerHTML = '';
    
    data.history.forEach(log => {
        const row = `
            <tr>
                <td>${log.time}</td>
                <td>${log.location}</td>
                <td>${log.detail}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

