import React from 'react';
import { View,Text, ActivityIndicator,Dimensions, ScrollView , Image} from 'react-native';
import { Headline , Subheading} from 'react-native-paper'
import { PieChart, LineChart , Grid} from 'react-native-svg-charts'


const height = Dimensions.get("window").height;
const swidth = Dimensions.get("window").width;

class TrackRoute extends React.Component{
    constructor(props){
      super(props),
      this.state = {
        isloading : true,
        countdata : [],
        height : height,
        histdata : [0,2,6,10,0,0,0,0,0,0-3,1,0,0,-2,0,0,0,0,0,0,0,0,0],
        stateresponse : [],
        err : false
      };
    }
  
    changedata (){
      let newdata = [9,32,33,37,43,50,65,65,77,85,100,110,114,140,170,198,249,329,391,468,519,606,649]
      setTimeout(() => {
        this.setState({ histdata: newdata });
      }, 1000);
    }
  
    componentDidMount = async (text) =>{
      try{
      const countresponse = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=india", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "0b4c5e4f3emsh696a43f0ae1f4b4p17669djsnf41aeb72cc6f"
          }
        });
        const stateresponse = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=ugwXLtEJTPvICbbLlStFQaoPuQvWvdKv4Af3LBe93frrvnobQ4A0ypwPM7u3N3AwGxtNcSQOyfeARhNjWGvZGEv93ScG8ZfDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKXFvsR88vL4WiBr168omFadgngDnj25DLpEvLRaiIpzZr1NvbW-Bo38vshdDBv10tpytj_A4aoE&lib=Mm1FD1HVuydJN5yAB3dc_e8h00DPSBbB3", {
          "method" : "GET",
        })
        const countresponseJson = await countresponse.json()
        const stateresponseJson = await stateresponse.json()
        this.setState({
          isloading: false,
          countdata : countresponseJson['stat_by_country'],
          stateresponse : stateresponseJson,
          height : height,
        });
      }
      catch (error) {
        this.setState({
            err: true
        })
        console.log(error);
      }
  
      this.changedata();
  
    }
  
    change = (contentHeight) =>{
      this.setState({height : contentHeight})
    }
  
    render(){
        if(this.state.err){
            <View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' ,backgroundColor : 'black'}}>
          <Text style = {{color : 'white'}}>Sorry looks like the internet is down or the servers are out!</Text>
          </View>
        }
      if(this.state.isloading === true) {
        return(
          <View style = {{flex : 1, justifyContent : 'center' , alignItems : 'center' ,backgroundColor : 'grey'}}>
            <ActivityIndicator color = 'white' size = {50}></ActivityIndicator>
          </View>
        )
      }
      else{
  
          let pcomp = <View style = {{flex : 1, justifyContent:'center', alignItems:'center' , backgroundColor : 'black'}}>
          <Text style = {{color :'white', paddingTop : 40 , color : 'white' }}>Cases reported in India since March 2020</Text>
          <LineChart
          data = {this.state.histdata}
          svg = {{ stroke: '#4EFF00' ,strokeWidth : 5}}
          contentInset = {{ top: 20, bottom: 20 }}
          style  = {{flex : 1,height : 320, backgroundColor : 'black',width : 0.95 * swidth}}
          animate = {true}
          animationDuration = {1000}
        >
        <Grid direction = {Grid.Direction.HORIZONTAL} svg = {{stroke : '#2D3AFF' }}/>
        </LineChart>
        <Text style = {{color : 'white', paddingBottom : 30}}>14/03  15/03  16/03  19/03  21/03  23/03  24/03  25/03</Text>
        </View>
  
        // console.log(this.state.countdata.length - 1)
        let k = this.state.countdata.length - 1
        let maincomp = <View style = {{flex : 1,flexDirection : 'column',height : 300, justifyContent : 'center' , alignItems : 'center' , backgroundColor : 'black' ,  borderBottomColor : 'white' ,borderBottomWidth : 2}}>
        <View style = {{flex : 0.5 ,flexDirection : 'row',  marginTop : 40 ,alignItems : 'center' , justifyContent : 'center'}}>
        <Headline style = {{fontWeight : 'bold' , color : "#4EFF00" ,fontSize : 30}}>COVID-19 INDIA</Headline>
        </View>
        <View style = {{flex : 0.5,flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center' , backgroundColor : 'grey' , width : "90%" , borderRadius : 40 ,marginBottom : 30}}>
        <Headline style = {{fontWeight : 'bold' ,color : 'white',fontSize : 30 , marginBottom : 20}}>{this.state.countdata[k]['total_cases']}    {this.state.countdata[k]['new_cases']}</Headline>
        <Headline style = {{fontWeight : 'bold' ,color : 'white', opacity : 0.7,fontSize : 20}}>Total Cases     New Cases</Headline>
        </View>
        </View>
       
       let keys= []
       let states = []
       let i = 0
       for(var key in this.state.stateresponse){
         keys.push(key)
         states.push(this.state.stateresponse[key])
        }
  
       let statecomp =  keys.map((key,value) =>{
         return(
           <View key = {key} style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center' ,height : 80 , backgroundColor : 'white' , borderColor : 'black' ,margin : 20}}>
             <Text style = {{color : 'black', fontWeight : 'bold' ,fontSize : 30}}>{states[value]}</Text>
             <Headline style= {{color : 'black' , fontWeight : 'bold' , height : 60}}> {key}</Headline>
             
           </View>
         )
       })
  
    
          
          return(
            <ScrollView scrollEnabled = {true} onContentSizeChange = {this.change}  contentContainerStyle = {{flexGrow : 1 }}>
              
              {maincomp}
              {pcomp}
              <View style = {{ alignItems : 'center',backgroundColor : 'white',borderTopWidth : 2 , borderTopColor : 'white',paddingBottom : 30 , justifyContent : 'center' }}>
              <Headline style = {{color : 'black' ,fontWeight : 'bold', fontSize : 30, paddingTop : 40}}> STATS BY STATES</Headline>
              </View>
              {statecomp}
            </ScrollView>
          )
        }
      }
  }

  export default TrackRoute