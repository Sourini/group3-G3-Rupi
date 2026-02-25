const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Pages</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/habits">Habits</a>
                <a href="/todos">To-Do</a>
            </div>
        </nav>
    )
}

export default Navbar;