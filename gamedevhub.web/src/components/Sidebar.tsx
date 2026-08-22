import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>

                    <li>
                        <Link to="/tasks">Tasks</Link>
                    </li>

                    <li>
                        <Link to="/design">Design</Link>
                    </li>

                    <li>
                        <Link to="/art">Art</Link>
                    </li>

                    <li>
                        <Link to="/music">Music</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;