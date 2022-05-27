import React from 'react';
import { Link } from 'react-router-dom';
import tawfique from '../../images/tawfique.jpg'

const MyPortfolio = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="avatar flex justify-center bg-base-300 pt-3">
                        <div className="w-1/3 mb-[-30px]  ring ring-white ring-offset-base-100 ring-offset-2 rounded-full">
                            <img src={tawfique} alt='tawfique'></img>
                        </div>
                    </div>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Tawfique Mohammed Tarek</h2>
                        <p className='uppercase'>I am a web developer & Programmer living in Chattogram, Bangladesh. I make web applications, usually with React.</p>
                        <ul className="list-disc">
                            <li><strong>Email: </strong>tawfiquemt17@gmail.com</li>
                            <li><strong>Educational Background: </strong>B.Sc. in CSE, IIUC</li>
                        </ul>

                    </div>
                    <div className="card-body items-center text-left">
                        <h2 className='text-xl mb-5'><strong>Skills I have as a Web Developer:</strong></h2>
                        <p className='font-bold'>HTML</p><progress className="progress w-56" value="100" max="100"></progress>
                        <p className='font-bold'>CSS</p><progress className="progress w-56" value="97" max="100"></progress>
                        <p className='font-bold'>JavaScript</p><progress className="progress w-56" value="80" max="100"></progress>
                        <p className='font-bold'>API</p><progress className="progress w-56" value="85" max="100"></progress>
                        <p className='font-bold'>Git</p><progress className="progress w-56" value="88" max="100"></progress>
                        <p className='font-bold'>Node js</p><progress className="progress w-56" value="70" max="100"></progress>
                        <p className='font-bold'>UI design</p><progress className="progress w-56" value="90" max="100"></progress>
                        <div>
                            <h2 className='mt-7 font-bold uppercase'>I included three of my project links below: </h2>
                            <ul className='ml-7 list-disc'>
                                <u><li className='text-primary'><a href="https://assignment-10-ba170.web.app/" target="_blank" rel="noopener noreferrer">Tawfique Umar (A Personal Trainer Website)</a></li></u>
                                <u><li className='text-primary'><a href="https://zesty-salmiakki-07e260.netlify.app/" rel="noopener noreferrer">Gadgets Website (Basic E-commerce Website)</a></li></u>
                                <u><li className='text-primary'><a href="https://tawfiquemohammed.github.io/assignment-1/" target="_blank" rel="noopener noreferrer">My Portfolio (Portfolio Website)</a></li></u>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;