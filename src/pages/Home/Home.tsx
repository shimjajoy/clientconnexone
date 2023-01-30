/**
 * When opening the application in the users' view, this component initially loaded.
 */
import { useEffect, useState } from 'react';
import Spinner from '../../compoents/Spinner/Spinner';
import './Home.scss';
import { fetchData } from '../../middleware/api';

const Home = () => {
    const [isMetricsLoading, setIsMetricsLoading] = useState(true);
    const [isTimeLoadingtime, setIsTimeLoading] = useState(true);
    const [serverTime, setServerTime] = useState(0);
    const [timeDifference, setTimeDifference] = useState("00:00:00");
    const [metricsData, setMetricsData] = useState("");
    useEffect(() => {
        // Call the /metrics API and retrieve all possible metrics
        setIsMetricsLoading(true);
        getDefaultMetrics();
        // Call the /time API and retrieve the server time
        setIsTimeLoading(true);
        getTime();
        const intervalId = setInterval(() => {
            // Call the /metrics API and retrieve all possible metrics
            setIsMetricsLoading(true);
            getDefaultMetrics();
            // Call the /time API and retrieve the server time
            setIsTimeLoading(true);
            getTime();
        }, 30000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        getdiffBetweenCandS();
    }, [serverTime]);
    //getDefaultMetrics aync method to fetch data from /metrics api
    const getDefaultMetrics = async () => {
        try {
            const response = await fetchData('metrics');
            //TODO:Use arsemetrics.js function if need to do format data comming from /metrics api  
            setMetricsData(response);
            setIsMetricsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    //getTime aync method to fetch data from /time api
    const getTime = async () => {
        try {
            const response = await fetchData('time');
            let epochTime = response?.epoch ? response?.epoch : null;
            setServerTime(epochTime);
            setIsTimeLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    // getdiffBetweenCandS method to find the difference between current client machine time and the most recently-fetched value for server time in epoch seconds, in formatted in stopwatch format (i.e. HH:mm:ss; a difference of 32 seconds would be 00:00:32, a difference of 0 seconds would be 00:00:00).
    const getdiffBetweenCandS = () => {
        if (serverTime) {
            //This interval runs every 1000 milliseconds (or 1 second).
            const temp = setInterval(() => {
                //Making the current time in match with serverTime
                const currentTime = Date.now() / 1000;
                //Calculate the difference between the current client machine time and the server time
                const difference = currentTime - serverTime;
                //multiplication by 1000 converts the difference from seconds to milliseconds.
                const date = new Date(difference * 1000);
                //date object is then used to format the time difference in the format of "HH:mm:ss" using the getUTCHours, getUTCMinutes and getUTCSeconds functions and slice(-2) function is used to ensure that the formatted time always has two digits for the hour, minute and second values.
                const formattedTime =
                    `0${date.getUTCHours()}`.slice(-2) +
                    ":" +
                    `0${date.getUTCMinutes()}`.slice(-2) +
                    ":" +
                    `0${date.getUTCSeconds()}`.slice(-2);
                //setting up the value in timeDifference
                setTimeDifference(formattedTime);
            }, 1000);
            return () => clearInterval(temp);
        }
    };
    return (
        <div className="container">
            <div className="section-left">
                <h1>Time:</h1>
                <div>Server time: {serverTime}</div>
                <div>Time difference: {timeDifference}</div>
                <Spinner loading={isTimeLoadingtime} />
            </div>
            <div className='section-right'>
                <h1>Default metrics values:</h1>
                <pre>
                    {metricsData ? metricsData : "No Data to display"}
                </pre>
                <Spinner loading={isMetricsLoading} />
            </div>
        </div>
    );
}
export default Home;

