const monthLabel = document.getElementById("month-label");
const calGrid = document.getElementById("cal-grid");
const prevButn = document.getElementById("prev-month");
const nextButn = document.getElementById("next-month");
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let selectedDay = null;

function renderCalendar() {
    calGrid.innerHTML = "";
    monthLabel.textContent = monthNames[viewMonth] + " " + viewYear;

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < startingDayOfWeek; i++) {
        const blank = document.createElement("span");
        calGrid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement("span");
        dayEl.textContent = day;
        dayEl.className = "cal-day";

        const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

        if (isToday) {
            dayEl.classList.add("cal-today");
        }

        if (selectedDay === day) {
            dayEl.classList.add("cal-selected");
        }

        dayEl.addEventListener("click", () => {
            selectedDay = day;
            renderCalendar();
        });

        calGrid.appendChild(dayEl);
    }
}

prevButn.addEventListener("click", () => {
    viewMonth = viewMonth - 1;
    if (viewMonth < 0) {
        viewMonth = 11;
        viewYear = viewYear - 1;
    }
    renderCalendar();
});

nextButn.addEventListener("click", () => {
    viewMonth = viewMonth + 1;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear = viewYear + 1;
    }
    renderCalendar();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        window.panelAPI.hidePanel();
    }
});

renderCalendar();