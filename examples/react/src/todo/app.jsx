import { useEffect, useReducer } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { todoReducer } from "./reducer";
import { loadTodos, saveTodos } from "./storage";

import "./app.css";

export function App() {
    const [todos, dispatch] = useReducer(todoReducer, undefined, loadTodos);

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    return (
        <>
            <Header dispatch={dispatch} />
            <Main todos={todos} dispatch={dispatch} />
            <Footer todos={todos} dispatch={dispatch} />
        </>
    );
}
