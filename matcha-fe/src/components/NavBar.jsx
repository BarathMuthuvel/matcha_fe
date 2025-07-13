import React from 'react'

const NavBar = () => {
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">
                    ✨Matcha
                </a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end mx-5">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a href="#profile" className="justify-between">
                                Profile{' '}
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a href="#settings">Settings</a>
                        </li>
                        <li>
                            <a href="#logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar
