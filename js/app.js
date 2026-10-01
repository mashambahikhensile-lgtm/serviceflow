const defaultLeads = [
    {
        id: 1,
        name: "James Wilson",
        email: "james@example.com",
        service: "Plumbing",
        status: "new"
    },
    {
        id: 2,
        name: "Sarah Miller",
        email: "sarah@example.com",
        service: "Installation",
        status: "follow-up"
    },
    {
        id: 3,
        name: "David Smith",
        email: "david@example.com",
        service: "Repair",
        status: "converted"
    }
];


/* =========================
   DATA
   ========================= */

let leads = JSON.parse(
    localStorage.getItem("serviceflowLeads")
);

if (!Array.isArray(leads)) {
    leads = defaultLeads;
    saveLeads();
}


function saveLeads() {
    localStorage.setItem(
        "serviceflowLeads",
        JSON.stringify(leads)
    );
}


/* =========================
   DOM ELEMENTS
   ========================= */

const leadTableBody =
    document.getElementById("leadTableBody");

const searchInput =
    document.getElementById("searchLeads");

const filterStatus =
    document.getElementById("filterStatus");

const totalLeads =
    document.getElementById("totalLeads");

const newLeads =
    document.getElementById("newLeads");

const followUpLeads =
    document.getElementById("followUpLeads");

const convertedLeads =
    document.getElementById("convertedLeads");

const leadModal =
    document.getElementById("leadModal");

const addLeadButton =
    document.getElementById("addLeadButton");

const closeModal =
    document.getElementById("closeModal");

const leadForm =
    document.getElementById("leadForm");

const activityList =
    document.getElementById("activityList");


/* =========================
   HELPERS
   ========================= */

function formatStatus(status) {
    return status
        .split("-")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}


function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================
   DASHBOARD STATISTICS
   ========================= */

function updateStats() {

    if (
        !totalLeads ||
        !newLeads ||
        !followUpLeads ||
        !convertedLeads
    ) {
        return;
    }


    totalLeads.textContent = leads.length;


    newLeads.textContent = leads.filter(
        lead => lead.status === "new"
    ).length;


    followUpLeads.textContent = leads.filter(
        lead => lead.status === "follow-up"
    ).length;


    convertedLeads.textContent = leads.filter(
        lead => lead.status === "converted"
    ).length;
}


/* =========================
   RENDER LEADS
   ========================= */

function renderLeads() {

    if (!leadTableBody || !searchInput || !filterStatus) {
        return;
    }


    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();


    const selectedStatus =
        filterStatus.value;


    const filteredLeads = leads.filter(lead => {

        const matchesSearch =
            lead.name
                .toLowerCase()
                .includes(searchTerm) ||

            lead.email
                .toLowerCase()
                .includes(searchTerm) ||

            lead.service
                .toLowerCase()
                .includes(searchTerm);


        const matchesStatus =
            selectedStatus === "all" ||
            lead.status === selectedStatus;


        return (
            matchesSearch &&
            matchesStatus
        );
    });


    if (filteredLeads.length === 0) {

        leadTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No leads found.
                </td>
            </tr>
        `;

        return;
    }


    leadTableBody.innerHTML =
        filteredLeads
            .map(lead => `
                <tr>

                    <td>
                        <strong>
                            ${escapeHTML(lead.name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(lead.service)}
                    </td>

                    <td>
                        ${escapeHTML(lead.email)}
                    </td>

                    <td>
                        <span
                            class="status-badge ${lead.status}"
                        >
                            ${formatStatus(lead.status)}
                        </span>
                    </td>

                    <td>
                        <div class="lead-actions">

                            <button
                                class="edit-lead"
                                data-id="${lead.id}"
                                type="button"
                            >
                                Edit
                            </button>

                            <button
                                class="delete-lead"
                                data-id="${lead.id}"
                                type="button"
                            >
                                Delete
                            </button>

                        </div>
                    </td>

                </tr>
            `)
            .join("");
}


/* =========================
   ACTIVITY
   ========================= */

function renderActivity() {

    if (!activityList) {
        return;
    }


    const recentLeads =
        [...leads]
            .reverse()
            .slice(0, 5);


    if (recentLeads.length === 0) {

        activityList.innerHTML = `
            <p>No recent activity.</p>
        `;

        return;
    }


    activityList.innerHTML =
        recentLeads
            .map(lead => `
                <div class="activity-item">

                    <span class="activity-dot"></span>

                    <div>

                        <p>
                            <strong>
                                ${escapeHTML(lead.name)}
                            </strong>

                            was added as a
                            ${formatStatus(
                                lead.status
                            ).toLowerCase()}
                            lead.
                        </p>

                        <small>
                            ${escapeHTML(lead.service)}
                        </small>

                    </div>

                </div>
            `)
            .join("");
}


/* =========================
   MODAL
   ========================= */

function openModal() {

    if (!leadModal) {
        return;
    }


    leadModal.classList.add("is-open");

    leadModal.setAttribute(
        "aria-hidden",
        "false"
    );


    const nameInput =
        document.getElementById("leadName");


    if (nameInput) {
        nameInput.focus();
    }
}


function closeLeadModal() {

    if (!leadModal) {
        return;
    }


    leadModal.classList.remove("is-open");

    leadModal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (leadForm) {
        leadForm.reset();
    }
}


/* =========================
   ADD LEAD
   ========================= */

function addLead(event) {

    event.preventDefault();


    const nameInput =
        document.getElementById("leadName");

    const emailInput =
        document.getElementById("leadEmail");

    const serviceInput =
        document.getElementById("leadService");

    const statusInput =
        document.getElementById("leadStatus");


    if (
        !nameInput ||
        !emailInput ||
        !serviceInput ||
        !statusInput
    ) {
        return;
    }


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const service =
        serviceInput.value.trim();

    const status =
        statusInput.value;


    if (
        !name ||
        !email ||
        !service ||
        !status
    ) {
        return;
    }


    const newLead = {
        id: Date.now(),
        name,
        email,
        service,
        status
    };


    leads.push(newLead);

    saveLeads();

    updateStats();
    renderLeads();
    renderActivity();

    closeLeadModal();
}


/* =========================
   DELETE LEAD
   ========================= */

function deleteLead(id) {

    leads = leads.filter(
        lead => lead.id !== id
    );


    saveLeads();

    updateStats();
    renderLeads();
    renderActivity();
}


/* =========================
   EDIT LEAD
   ========================= */

function editLead(id) {

    const lead =
        leads.find(
            item => item.id === id
        );


    if (!lead) {
        return;
    }


    const name =
        prompt(
            "Customer name:",
            lead.name
        );


    if (name === null) {
        return;
    }


    const email =
        prompt(
            "Email:",
            lead.email
        );


    if (email === null) {
        return;
    }


    const service =
        prompt(
            "Service:",
            lead.service
        );


    if (service === null) {
        return;
    }


    const status =
        prompt(
            "Status: new, follow-up, converted, or closed",
            lead.status
        );


    if (status === null) {
        return;
    }


    const validStatuses = [
        "new",
        "follow-up",
        "converted",
        "closed"
    ];


    if (!validStatuses.includes(status)) {

        alert(
            "Invalid status. Use: new, follow-up, converted, or closed."
        );

        return;
    }


    lead.name =
        name.trim();

    lead.email =
        email.trim();

    lead.service =
        service.trim();

    lead.status =
        status;


    saveLeads();

    updateStats();
    renderLeads();
    renderActivity();
}


/* =========================
   DASHBOARD INITIALIZATION
   ========================= */

function initializeDashboard() {

    /*
     * The dashboard contains leadTableBody.
     * If it doesn't exist, we're on another page.
     */

    if (!leadTableBody) {
        return;
    }


    updateStats();

    renderLeads();

    renderActivity();


    if (addLeadButton) {

        addLeadButton.addEventListener(
            "click",
            openModal
        );
    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeLeadModal
        );
    }


    if (leadForm) {

        leadForm.addEventListener(
            "submit",
            addLead
        );
    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderLeads
        );
    }


    if (filterStatus) {

        filterStatus.addEventListener(
            "change",
            renderLeads
        );
    }


    leadTableBody.addEventListener(
        "click",
        event => {

            const editButton =
                event.target.closest(
                    ".edit-lead"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-lead"
                );


            if (editButton) {

                const id =
                    Number(
                        editButton.dataset.id
                    );

                editLead(id);

                return;
            }


            if (deleteButton) {

                const id =
                    Number(
                        deleteButton.dataset.id
                    );

                deleteLead(id);
            }
        }
    );


    if (leadModal) {

        leadModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === leadModal
                ) {
                    closeLeadModal();
                }
            }
        );
    }
}


/* =========================
   KEYBOARD CONTROLS
   ========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            leadModal &&
            leadModal.classList.contains(
                "is-open"
            )
        ) {
            closeLeadModal();
        }
    }
);


/* =========================
   START APPLICATION
   ========================= */

initializeDashboard();