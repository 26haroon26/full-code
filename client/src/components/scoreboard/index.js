import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "../../core"
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Dashboard() {

    const [score, setScore] = useState({})


    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/score`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setScore(res.data)
            })
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:5001"); // to connect with locally running Socker.io server

        socket.on('connect', function () {
            console.log("connected to server")
        });
        socket.on('disconnect', function (message) {
            console.log("disconnected from server: ", message);
        });
        socket.on('SCORE', function (data) {
            console.log(data);
            setScore(data)
        });

        return () => {
            socket.close();
        };
    }, []);




    return (
        <>
  <Typography  style={{textAlign:"center"}} sx={{ fontSize: 20 ,color:"skyblue" }} color="text.secondary" gutterBottom>
                            {score?.teamOne} vs {score?.teamTwo} (Bat {score.bat})
                        </Typography>
        <div style={{ marginTop: "1rem",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around" }}>

        
        <div style={{ marginTop: "1rem"}}>

            <Stack  spacing={2} direction="column">

                <Card style={{ width: 300,height:200,border:"10px solid skyblue",color:"green" }}>
                    <CardContent  style={{color:"green"}}>
                        <Typography sx={{ fontSize: 14 }}  gutterBottom>
                            {score?.teamOne} 
                        </Typography>
                        <Typography variant="h5" component="div">
                            {score?.score} / {score?.wicket}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} >
                            over: {score.over}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}  gutterBottom>
                            {score?.batsmanNameA} ({score?.runsA})
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}  gutterBottom>
                            {score?.batsmanNameB} ({score?.runsB})
                        </Typography>
                    </CardContent>
                   
                </Card>
              
            </Stack>
            
 </div>

<div style={{ marginTop: "1rem"}}>

<Stack spacing={2} direction="column">

<Card style={{ width: 300 ,height:200 ,border:"10px solid skyblue",color:"blue" }}>
    <CardContent style={{color:"blue"}}>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
        {score?.teamTwo}
        </Typography>
        <Typography variant="h5" component="div">
            {score?.teamtwoscore} / {score?.teamtwowicket}
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
            over: {score.teamtwoover}
        </Typography>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
                            {score?.bowlerNameA} over({score?.ballsA})
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}  gutterBottom>
                            {score?.bowlerNameB}  over({score?.ballsB})
                        </Typography>
      
    </CardContent>
    {/* <CardActions>
        <Button size="small">Learn More</Button>
    </CardActions> */}
</Card>
</Stack>

</div>


        </div>
        <Typography sx={{ fontSize: 20 ,color:"skyblue" }}
        style={{textAlign:"center",marginTop:"10px"}} variant="body2">
                            Commentry: <b> {score?.commentry || "Hassan Ali just droped the catch"}</b>
                        </Typography>
        </>
    );
}

export default Dashboard;