import React from 'react';

const Blogs = () => {
    return (
        <div>
            <h2 className='text-xl bg-primary rounded-xl py-5 m-3 font-bold text-center text-'>Question And Answer</h2>


            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-4 card-title text-center'>14.1 How will you improve the performance of a React Application?</h3>
                <p className='card-body'><span className='font-bold'>Answer:</span> To improve the performance of a React Application we should optimize React rendering, you need to make sure that components receive only necessary props. It will let you control the CPU consumption and avoid over-rendering unnecessary features. The solution is to create a functional component that will collect all props and redistribute them to other components.Besides, Keeping component state local where necessary and Memoizing React components to prevent unnecessary re-renders and Code-splitting in React using dynamic import() and Windowing or list virtualization in React.</p>
            </div>

            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-4 card-title text-center'>14.2 What are the different ways to manage a state in a React application?</h3>
                <p className='card-body'><span className='font-bold'>Answer:</span> There are four types of state: 1.Local State 2.Global State 3.Server State 4. URL state</p>
            </div>


            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-4 card-title text-center'>14.3 How does prototypical inheritance work?</h3>
                <p className='card-body'><span className='font-bold'>Answer:</span> Simply put, prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype</p>
            </div>

            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-3 card-title text-center'>14.4 Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h3>
                <p className='card-body'><span className='font-bold'>Answer:</span> One should never update the state directly because of the following reasons: If you update it directly, calling the setState() afterward may just replace the update you made. When you directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value. You will lose control of the state across all components.</p>
            </div>

            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-4 card-title text-center'>14.5 You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h3>
                <div className='card-body'>
                    <p><span className='font-bold'>Answer:</span> I can do it in various way: Using Array.prototype.find() function, Using Array.prototype.findIndex() function, Using Array.prototype.forEach() function, Using Array.prototype.filter() function, Using jQuery and so on. </p>
                    <p>I can do this way: var found = obj.find(e =&#62; e.name === 'John');</p>
                    <p> console.log(found);</p>
                </div>
            </div>

            <div className="card card-bordered card-compact bg-slate-300 py-3 m-3">
                <h3 className='text-black pl-4 card-title text-center'>14.6 What is a unit test? Why should write unit tests?</h3>
                <p className='card-body'><span className='font-bold'>Answer:</span>Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure.</p>
            </div>
        </div>
    );
};

export default Blogs;