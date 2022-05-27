import React from 'react';

const ContactUs = () => {
    return (
        <div className='py-7'>
            <div className="bg-gray-100 flex bg-local">
                <div className="bg-gray-100 mx-auto max-w-6xl bg-white-100 py-20 px-12 lg:px-24 shadow-xl mb-24">
                    <h2 className='text-4xl pb-5 text-center'>Contact Us</h2>
                    <form>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="company">
                                        Name*
                                    </label>
                                    <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="company" type="text" placeholder="Your Name"></input>
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="title">
                                        Address
                                    </label>
                                    <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="title" type="text" placeholder="Your Address"></input>
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="application-link">
                                        Message*
                                    </label>
                                    <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="application-link" type="text" placeholder="Your Message"></input>
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mt-2">
                                <div className="md:w-full px-3">
                                    <button className="md:w-full bg-gray-900 text-primary font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;