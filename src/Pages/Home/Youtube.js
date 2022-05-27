import React from 'react';

const Youtube = () => {
    return (
        <div>
            <h1 className='text-3xl text-center font-bold'>A Few Glimpses From Youtube</h1>
            <div className='flex justify-center my-3'>

                <div className='m-5'>
                    <iframe style={{
                        maxwidth: '100%',
                        height: 'auto'
                    }}
                        src="https://www.youtube.com/embed/SkHjVns2yR4?autoplay=0&mute=1&controls=0" title='knife'>
                    </iframe>
                </div>
                <div className='m-5'>
                    <iframe style={{
                        maxwidth: '100%',
                        height: 'auto'
                    }}
                        src="https://www.youtube.com/embed/9NYfHopE2xs?autoplay=0&mute=1&controls=0" title='knife'>
                    </iframe>
                </div>
            </div>
        </div>
    );

    // https://www.youtube.com/embed/SkHjVns2yR4?autoplay=1&mute=1?controls=0
    // https://www.youtube.com/embed/9NYfHopE2xs?autoplay=1&mute=1?controls=0
};

export default Youtube;