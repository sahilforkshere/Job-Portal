import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { FaSearchengin } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
function HowItWorks() {
    return (
        <div className='howitworks'>
            <div className="container">
                <h3>How HireNest Works?</h3>
                <div className="banner">
                    <div className="card">
                        <FaUserPlus />
                        <p>Create Account</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nesciunt, aliquam natus, doloremque similique officiis soluta amet voluptate nemo aperiam neque labore reiciendis eligendi quis voluptatum id. Omnis, eveniet odit nemo architecto exercitationem distinctio tempore non! Amet, quam expedita corporis, aperiam facilis cum itaque, alias excepturi ratione maxime a ut!</p>
                    </div>
                    <div className="card">
                        <FaSearchengin />
                        <p>Find a job </p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nesciunt, aliquam natus, doloremque similique officiis soluta amet voluptate nemo aperiam neque labore reiciendis eligendi quis voluptatum id. Omnis, eveniet odit nemo architecto exercitationem distinctio tempore non! Amet, quam expedita corporis, aperiam facilis cum itaque, alias excepturi ratione maxime a ut!</p>
                    </div>
                    <div className="card">
                        <IoIosSend />
                        <p>Create Account</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque nesciunt, aliquam natus, doloremque similique officiis soluta amet voluptate nemo aperiam neque labore reiciendis eligendi quis voluptatum id. Omnis, eveniet odit nemo architecto exercitationem distinctio tempore non! Amet, quam expedita corporis, aperiam facilis cum itaque, alias excepturi ratione maxime a ut!</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HowItWorks
