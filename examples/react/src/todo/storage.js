const STORAGE_KEY = "todos-react";

// Keep only entries the UI can actually render: main.jsx keys the list off
// `id` and item.jsx renders `title` straight into the DOM, so anything but a
// string in either position breaks the first render.
const isTodo = (todo) =>
    todo !== null && typeof todo === "object" && typeof todo.id === "string" && typeof todo.title === "string";

export function loadTodos() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(stored)) return [];

        return stored.filter(isTodo).map(({ id, title, completed }) => ({ id, title, completed: Boolean(completed) }));
    } catch {
        // Nothing saved yet, storage unreadable, or the saved value is not JSON.
        return [];
    }
}

export function saveTodos(todos) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
        // Storage can be disabled or full; dropping the save beats breaking the app.
    }
}
