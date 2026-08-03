const input = document.getElementById("query");
const results = document.getElementById("results");

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        window.panelAPI.hidePanel();
    }
});

input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
        const text = input.value.trim();
        const response = await window.panelAPI.submitQuery(text);
        results.textContent = response;
        input.value = "";
    }
})