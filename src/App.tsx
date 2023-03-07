import styled from "styled-components";
import Router from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
function App() {
    return (
        <AppBlock>
            <Router />
        </AppBlock>
    );
}

const AppBlock = styled.div`
    padding: 20px;
`;

export default App;

// npx madge --image graph3.svg ./src/App.tsx
