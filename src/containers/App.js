import React , { useState, useEffect } from 'react';
import CardList from '../components/CardList.js';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary.js';
import './App.css';

function App() {
    // constructor() {
    //     super()
    //     this.state = {
    //         robots: [],
    //         searchfield: ''
    //     }
    //     console.log("mounting - constructor");
    // }
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    // const [count, setCount] = useState(0);

    // componentDidMount(){
    //     console.log('mounting - componentDidMount');
    //     fetch('https://jsonplaceholder.typicode.com/users') 
    //         .then(response=>{
    //             return response.json();
    //         })
    //         .then(users => {
    //             this.setState({robots: users});
    //         })
    // }
    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users') 
            .then(response=>{
                return response.json();
            })
            .then(users => {
                setRobots(users);
            });
            // console.log(count);
    }, [])

    const onSearchChange=(event) => {
        // console.log(event.target.value);
        setSearchfield(event.target.value); // every time the state get updated, it goes to updating cycle
    }

    const filterRobots = robots.filter(robot=>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    

    if (robots.length === 0) {  // !robots.length
        return <h1> Loading </h1>
    } else {
        return (
            <div className='tc'> 
                <h1 className='f1'> Robot Friends </h1>
                <SearchBox searchChange={onSearchChange} />
                {/* <button onClick={() => setCount(count+1)}>Click Me!</button> */}
                <Scroll> 
                    {/* every compnent has props though Scroll did not has it as parameter */}
                    {/* children */}
                    <ErrorBoundary>
                        <CardList robots={ filterRobots }/> 
                    </ErrorBoundary>
                </Scroll>
            </div>    
        );
    }
}

export default App;