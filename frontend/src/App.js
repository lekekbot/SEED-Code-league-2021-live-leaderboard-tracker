import './App.css';
import React, { useEffect, useState } from 'react'

//import page
import Timer from './timer'
import Chart from './Chart'

//import img
import nodata from './nodatafound.png'
// require('typeface-lato') <-- might need later but ehh whatever


function App() {
  //create states for data and updated on
  const [data, setdata] = useState()
  const [newdate, setnewdata] = useState()

  
  const [stopupdate, setstopupdate] = useState(false)

  //componentDidMount
   useEffect(() => {
     //initialize puppeteer lib browser cos i dun wanna keep closing browser
     fetch('http://localhost:4000/open?url=https://www.hackerrank.com/codeleague2021/leaderboard')

      // get data every 3s, refreshes browser to get updated data
      const interval = setInterval(() => {    
        if(stopupdate){
          clearInterval(interval)
          return fetch('http://localhost:4000/stop')
        }   

        var today = new Date()
        setnewdata(today.getHours() + ":" + (today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()))
        
        fetch('http://localhost:4000/data')
          .then(response => response.json())
          .then(data => setdata(data)); 

      }, 3000);

    return () => clearInterval(interval);
  }, [stopupdate]);

  //get rank data sort to Divs to display
  const getrankdata = () => {
     if(data){
       //create array with elements [0,1,2,3,4,5,6] <- list goes on until it reaches .length() 
      var arr = Array.from(Array((data.rank.length > 10 ? 10 : data.rank.length)).keys())

      //a way to use for each but in react
      const rank = arr.map((i)=> 
      <div className={'leaderboard-row'} key={i}>
        <div>{i + 1}</div>
        <div>{data.username[i]}</div>
        <div>{data.score[i]}</div>
      </div>
      )
      return rank
    }
  }

  const getStop = (val) => {
    if(val) {
      setstopupdate(true)
    }
  }

  //front end stuff
  return (
    <div className="App">
        <div className={'row'}>
          
            {/* leaderboad Table */}
            <div className={'bigdata'}> 
              <h1>Leaderboard</h1>
              <div className={'table-header'}>
                <h2>Rank</h2>
                <h2>Username</h2>
                <h2 className={'lasth2'}>Score</h2>
                <div>{data ? getrankdata() : <img src={nodata} alt={'no data'} />}</div> 
                <p className={'last-updated'}>Last Updated: {newdate}</p>
              </div>
            </div>

          {/* chart */}
            {data ? data.rank.length > 20 ? <div className={'chart'}><Chart data={data}/></div> : "" : ''}
      </div>
    </div>
  );
}

export default App;